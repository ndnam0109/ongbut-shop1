'use client'
import { Billed} from "@/components/order/component/bill";
import { OrderProvider, useOrderContext} from "@/lib/providers/order-provider";
import { Spinner, NotFound} from "@/components/shared/utilities/misc";
import { useShopContext} from "@/lib/providers/shop-provider";
import { useCart} from "@/lib/providers/cart-provider";
import { ORDER_STATUS} from "@/lib/repo/order.repo";
import { useEffect, useState } from "react";
export function OrderPage() {
    const { shopCode } = useShopContext();
    return (
        <OrderProvider>
            <div
                className={`${
                    true ? "main-container" : "w-full"
                } relative  min-h-screen py-4 text-gray-600 bg-gray-50`}
            >
                <ListOrder />
            </div>
        </OrderProvider>
    );
}

function ListOrder() {
    const { items, limit, setLimit, pagination, loadAll } = useOrderContext();
    const { reOrder } = useCart();
    const [loading, setLoading] = useState(false);
    const [curPos, setCurPos] = useState(null);
    function menuScrollEvent() {
        let scrollCheckInterval = null;
        let billeds = document.getElementsByClassName("billed");
        if (billeds && billeds.length > 0) {
            const { y } = billeds[0].getBoundingClientRect();
            if (!curPos || y < curPos) {
                setCurPos(y);
                setLimit(limit + 5);
                clearInterval(scrollCheckInterval);
            }
        }
    }
    async function load(limit) {
        setLoading(true);
        await loadAll({ limit: limit });
        setLoading(false);
    }
    useEffect(() => {
        load(limit);
    }, [limit]);
    useEffect(() => {
        if (loading) {
            document.removeEventListener("scroll", menuScrollEvent);
        } else {
            document.addEventListener("scroll", menuScrollEvent, {
                passive: true,
            });
        }
        return () => {
            document.removeEventListener("scroll", menuScrollEvent);
        };
    }, [loading]);
    if (!items) return <Spinner />;
    if (items.length == 0) return <NotFound text="Chưa có đơn hàng nào" />;
    return (
        <div className="">
            {items.map((order, index) => (
                <Billed
                    className="billed"
                    order={order}
                    key={index}
                    status={ORDER_STATUS.find((stus) => stus.value === order.status)}
                    reOrder={(items, infoPay) => reOrder(items, infoPay)}
                />
            ))}
            {loading && items && limit < pagination.total && (
                <>
                <p>loading</p>
                </>
            )}
            {/* <Pagination /> */}
        </div>
    );
}
