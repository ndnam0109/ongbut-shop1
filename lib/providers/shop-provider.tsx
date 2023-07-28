'use client'
import { createContext, useContext, useEffect, useState } from "react";
import {cloneDeep} from "lodash";
import {Shop, ShopService} from "@/lib/repo/shop.repo";

export const ShopContext = createContext<
    Partial<{
        shop: Shop;
        shopCode: string,
    }>
>({shop: undefined, shopCode: 'OngButShop'});
export function ShopProvider(props: any) {
    const [shopInfo, setShopInfo] = useState<Shop>({} as Shop);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        loadShopInfo();
    }, []);

    const loadShopInfo = async () => {
        ShopService.getShopData().then((res) => {
            console.log(res)
            setShopInfo(cloneDeep(res));
        });
    };

    return (
        <ShopContext.Provider
            value={{
              shop: shopInfo,
                shopCode: shopInfo.code,
            }}
        >
            {props.children}
        </ShopContext.Provider>
    );
}

export const useShopContext = () => useContext(ShopContext);
