'use client'
import React from "react";
import StoreProfile from "@/components/store/StoreProfile";
import {ShopContext, ShopProvider} from "@/lib/providers/shop-provider";
import { ProductsProvider} from "@/lib/providers/products-provider";

export default function StorePage(){
    return (
        <ShopProvider>
            <ShopContext.Consumer>
                {({shop}) => (
                    <div className={`bg-gray-100`}>
                        <ProductsProvider>
                            <StoreProfile shop={shop}></StoreProfile>
                        </ProductsProvider>

                    </div>
                    )}
            </ShopContext.Consumer>
       </ShopProvider>
    )
}
