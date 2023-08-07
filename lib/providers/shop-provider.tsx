'use client'
import jwt_decode from "jwt-decode";
import { orderBy } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { createContext, useContext, useEffect, useState } from "react";
import {
    ClearAnonymousToken,
    ClearCustomerToken,
    GetAnonymousToken,
    GetCustomerToken,
    SetCustomerToken,
} from "../graphql/auth.link";
import { Customer, CustomerService } from "../repo/customer.repo";
import { ShopBranch, ShopBranchService } from "../repo/shop-branch.repo";
import { Shop, ShopService } from "../repo/shop.repo";
import Geocode from "react-geocode";
import { AnalyticConfig } from "../repo/shop-config.repo";
import { GOOGLE_MAPS_API_KEY } from "../constants/google.const";
import { NotificationService } from "../repo/notification.repo";
import { useQuery } from "../hooks/useQuery";
import { ShopTable, ShopTableService } from "../repo/shop/shop-table.repo";

import {toast} from "react-toastify";
import {usePathname, useRouter} from "next/navigation";
import {CustomerLoginDialog} from "@/components/auth/CustomerLoginDialog";

export const CUSTOMER_LOGIN_PATHNAME = "customer-login-pathname";
export const ShopContext = createContext<
    Partial<{
        shopCode: string;
        shop: Shop;
        customer: Customer;
        shopTable: ShopTable;
        setCustomer: (val: Customer) => any;
        loginCustomer: (phone: string, name: string) => any;
        loginCustomerOTP: (phone: string, name: string, otp: string) => any;
        logoutCustomer: Function;
        shopBranches: ShopBranch[];
        selectedBranch: ShopBranch;
        setSelectedBranch: Function;
        getCustomer: Function;
        notificationCount: number;
        loadNotificationCount: () => Promise<any>;
        redirectToCustomerLogin: Function;
        analyticConfig: AnalyticConfig;
        openLoginDialog: boolean;
        setOpenLoginDialog: (val: boolean) => void;
        isOpenShop: boolean;
    }>
>({});

export function ShopProvider({ code, ...props }: { code: string } & ReactProps) {
    const router = useRouter();
    const pathname = usePathname()
    const [shop, setShop] = useState<Shop>();
    const [customer, setCustomer] = useState<Customer>();
    const [shopBranches, setShopBranches] = useState<ShopBranch[]>([]);
    let [selectedBranch, setSelectedBranch] = useState<ShopBranch>();
    const [notificationCount, setNotificationCount] = useState(0);
    const tableCode = useQuery("table");
    const [shopTable, setShopTable] = useState<ShopTable>(null);
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
    const [isOpenShop, setIsOpenShop] = useState<boolean>(false);

    const loadNotificationCount = async () => {
        await NotificationService.getAll({
            query: {
                limit: 0,
                filter: {
                    seen: false,
                },
            },
            fragment: "id",
        }).then((res) => {
            setNotificationCount(res.data.length);
        });
    };


    const [analyticConfig] = useState<AnalyticConfig>();

    async function loadShop() {
        await checkTokens();

        try {
            await ShopService.clearStore();
            await ShopService.getShopData().then((res) => {
                if (res.activated) {
                    setShop(res);
                } else {
                    toast.warn("Cửa hàng đang tạm đóng cửa");
                    router.replace("/");
                }
            });
        } catch (err) {
            ClearCustomerToken(code);
            ClearAnonymousToken(code);

            await checkTokens();
            await ShopService.getShopData()
                .then((res) => {
                    if (res.activated) {
                        setShop(res);
                    } else {
                        toast.warn("Cửa hàng đang tạm đóng cửa");
                        router.replace("/");
                    }
                })
                .catch((err) => {
                    toast.warn("Không thể lấy thông tin cửa hàng. " + err.message);
                    router.replace("/");
                });
        }
    }

    const checkTokens = async () => {
        let customerTokenValid = false;
        const customerToken = GetCustomerToken(code);
        if (customerToken) {
            const decodedToken = jwt_decode(customerToken) as {
                exp: number;
                role: string;
            };
            console.log(decodedToken);
            if (Date.now() >= decodedToken.exp * 1000) {
                ClearCustomerToken(code);
                setCustomer(null);
            } else {
                customerTokenValid = true;
            }
        }
        if (!customerTokenValid) {
            const anonymousToken = GetAnonymousToken(code);
            if (anonymousToken) {
                const decodedToken = jwt_decode(anonymousToken) as {
                    exp: number;
                    role: string;
                };
                if (Date.now() >= decodedToken.exp * 1000) {
                    ClearAnonymousToken(code);
                    await ShopService.loginAnonymous(code);
                }
            } else {
                await ShopService.loginAnonymous(code);
            }
        }
    };

    async function loadCustomer() {
        const customerToken = GetCustomerToken(code);
        const pathname = location.pathname;
        if (!customerToken) {
            if (pathname !== "/shop" && !pathname.startsWith("/shop/")) {
                const userPhone = localStorage.getItem("userPhone");
                const customerName = localStorage.getItem("customerName");
                if (userPhone && customerName && !shop.config.smsOtp) {
                    const customerData = await CustomerService.loginCustomerByPhone(userPhone, customerName);
                    if (customerData) {
                        console.log(customerData)
                        SetCustomerToken(customerData.token, code);
                        setCustomer(customerData.customer);
                    } else {
                        setCustomer(null);
                    }
                } else {
                    setCustomer(null);
                }
            }
        } else {
            const decodedToken = jwt_decode(customerToken) as {
                exp: number;
                role: string;
                customer: Customer;
            };
            if (Date.now() >= decodedToken.exp * 1000) {
                ClearCustomerToken(code);
                setCustomer(null);
                return false;
            } else {
                const pathname = location.pathname;
                if (pathname !== "/shop" && !pathname.startsWith("/shop/")) {
                    await getCustomer();
                }
            }
        }
    }

    async function getCustomer() {
        const res = await CustomerService.getCustomer();
        if (res) {
            setCustomer(res);
        } else {
            setCustomer(null);
        }
    }

    function loadBrand(coords?: { fullAddress: string; lng: number; lat: number }) {
        ShopBranchService.getAll({
            fragment: `${ShopBranchService.fullFragment} ${
                coords ? `distance(lat:${coords.lat}, lng:${coords.lng})` : ""
            } `,
            cache: false,
        }).then((res) => {
            const branches = orderBy(res.data, (o) => o.distance);
            setShopBranches(branches);
            const nearest = branches.findIndex((item) => item.isOpen);
            if (nearest) {
                selectedBranch = branches[nearest];
            } else {
                selectedBranch = branches[0];
            }
            setSelectedBranch(selectedBranch);
        });
    }

    async function loginCustomer(phone: string, name: string) {
        if (phone) {
            const pathname = location.pathname;
            if (pathname !== "/shop" && !pathname.startsWith("/shop/")) {
                localStorage.setItem("customerName", name);
                const customerData = await CustomerService.loginCustomerByPhone(phone, name);
                if (customerData) {
                    SetCustomerToken(customerData.token, code);
                    setCustomer(cloneDeep(customerData.customer));
                    toast.success("Đăng nhập thành công!");
                    // closeLogin();
                    localStorage.setItem("userPhone", customerData.customer.phone);
                    return true;
                }
            } else {
                setCustomer(null);
                return false;
            }
        } else {
            setCustomer(null);
            return false;
        }
    }

    function logoutCustomer() {
        ClearCustomerToken(code);
        localStorage.removeItem("userPhone");
        localStorage.removeItem("customerName");
        setCustomer(null);
        if (pathname !== "/") {
            router.push(`/${code}`);
        }
    }

    useEffect(() => {
        Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
        Geocode.setLanguage("vi");
        Geocode.setRegion("vn");
    }, []);

    useEffect(() => {
        if (code) {
            loadShop();
        }
        return () => {
            setShop(null);
        };
    }, [code]);

    useEffect(() => {
        if (shop) {
            loadCustomer();
        }
    }, [shop]);

    useEffect(() => {
        if (customer) {
            loadNotificationCount();
            updateCustomerAll();
        } else {
            setNotificationCount(0);
        }
    }, [customer]);


    useEffect(() => {
        if (tableCode && shopBranches.length > 0) {
            ShopTableService.getOneByCode(tableCode).then((res) => {
                if (res) {
                    const branch = shopBranches.find((item) => item.id === res.branchId);
                    if (branch) {
                        setShopTable(res);
                        setSelectedBranch(branch);
                    }
                } else {
                    setShopTable(null);
                }
            });
        } else {
            setShopTable(null);
        }
    }, [tableCode, shopBranches]);

    useEffect(() => {
        if (shopBranches.length > 0) {
            setIsOpenShop(shopBranches.some((item) => item.isOpen === true));
        }
    }, [shopBranches]);

    async function updatePresenter() {
        const colCode = sessionStorage.getItem(code + "colCode");
        if (colCode) {
            const res = await CustomerService.updatePresenter(colCode);
            sessionStorage.removeItem(code + "colCode");
        }
    }

    async function updateCustomerPSID() {
        const psid = sessionStorage.getItem(code + "psid");
        if (psid) {
            await CustomerService.updateCustomerPSID(psid);
            sessionStorage.removeItem(code + "psid");
        }
    }

    async function updateCustomerAll() {
        const tasks = [];
        tasks.push(updatePresenter());
        tasks.push(updateCustomerPSID());
        await Promise.all(tasks);
    }

    // const { login } = router.query;

    // function closeLogin() {
    //   let path = sessionStorage.getItem(CUSTOMER_LOGIN_PATHNAME);
    //   sessionStorage.removeItem(CUSTOMER_LOGIN_PATHNAME);
    //   router.push(path);

    //   if (path && path.includes(`${code}/collaborator`) && !shop.config.collaborator)
    //     path = `${code}`;
    //   if (path && path.includes(`${code}/order`)) path = `${code}/order`;
    //   if (path) {
    //     router.push(path);
    //     // router.push(`/${path}`);
    //   } else {
    //     // router.push(`${code}`);
    //     router.push(`/${code}`);
    //   }
    // }

    const redirectToCustomerLogin = () => {
        sessionStorage.setItem(CUSTOMER_LOGIN_PATHNAME, location.pathname);
        // router.replace(`/${code}/?login=true`);
        setOpenLoginDialog(true);
    };
    useEffect(() => {
        if (tableCode) {
            // router.replace({ pathname: `/${code}/table`, query: { table: tableCode } });
            sessionStorage.setItem(code + "-tableCode", tableCode);
        }
    }, [tableCode]);

    return (
        <ShopContext.Provider
            value={{
                shopCode: code,
                shop,
                customer,
                shopTable,
                setCustomer,
                loginCustomer,
                logoutCustomer,
                shopBranches,
                selectedBranch,
                setSelectedBranch,
                getCustomer,
                redirectToCustomerLogin,
                analyticConfig,
                notificationCount,
                loadNotificationCount,
                setOpenLoginDialog,
                isOpenShop,
            }}
        >
            {props.children}
            {openLoginDialog && (
                <CustomerLoginDialog isOpen={openLoginDialog} onClose={() => setOpenLoginDialog(false)} />
            )}
        </ShopContext.Provider>
    );
}

export const useShopContext = () => useContext(ShopContext);
