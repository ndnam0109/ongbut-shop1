'use client';

import {Dialog, Transition} from '@headlessui/react';
import {ShoppingCartIcon} from '@heroicons/react/24/outline';
import {Fragment, useEffect, useRef, useState} from 'react';
import {useCart} from "@/lib/providers/cart-provider";
import {XCircleIcon} from "@heroicons/react/20/solid";
import {parseNumber} from "@/lib/helpers/parser";
import {ProductQuantity} from "@/components/product/ProductQuantity";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {CardProductItem} from "@/components/cart/ProductInCart";
import {useShopContext} from "@/lib/providers/shop-provider";
import React from "react";
import {Badge} from "@nextui-org/react";


export default function CartModal() {
    const {
        cartProducts,
        totalAmount,
        changeProductQuantity,
        totalQty,
        clearCartProducts,
    } = useCart();
    const [isInvisible, setIsInvisible] = React.useState(false);
    console.log(totalAmount)
    console.log(cartProducts)
    console.log(totalQty)
    const {customer, shopCode, shop, setOpenLoginDialog} = useShopContext()
    const cart = {}
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const router = useRouter()

    const checkRedirectToPayment = () => {
        console.log(customer)
        console.log('payyyyyyyyyyyy')
      if (customer){
          setIsOpen(false)
          router.push(`/thanh-toan`)
      } else {
          console.log('open  modal')
          setOpenLoginDialog(true)
      }
    }

    return (
        <>
            <button aria-label="Open cart" onClick={openCart}>
                <div
                    className="relative flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors ">
                    <ShoppingCartIcon
                        className={'h-6 transition-all ease-in-out hover:scale-110 '}
                    />
                    {cartProducts?.length != 0 && (
                        <div
                            className="absolute right-1 top-1  h-4 w-4 rounded bg-white text-[12px] font-medium text-green-500">
                            {cartProducts?.length}
                        </div>
                    )}
                </div>
            </button>
            <Transition show={isOpen}>
                <Dialog onClose={closeCart} className="relative z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="opacity-0 backdrop-blur-none"
                        enterTo="opacity-100 backdrop-blur-[.5px]"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="opacity-100 backdrop-blur-[.5px]"
                        leaveTo="opacity-0 backdrop-blur-none"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel
                            className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white p-6 text-black backdrop-blur-xl md:w-[500px]">
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold">Giỏ hàng của bạn</p>

                                <button aria-label="Close cart" onClick={closeCart}>
                                    <XCircleIcon className={`w-5 h-5`}/>
                                </button>
                            </div>

                            {cartProducts?.length == 0 ? (
                                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                                    <ShoppingCartIcon className="h-12 text-gray-500"/>
                                    <p className="mt-6 text-center text-xl font-semibold">Chưa có sản phẩm.</p>
                                </div>
                            ) : (
                                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                                    <ul className="flex-grow overflow-auto py-4">
                                        {cartProducts?.map((item, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex w-full flex-col border-b border-neutral-300"
                                                >
                                                    <CardProductItem cartProduct={item} index={i}/>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    {/*<div className="py-4 text-sm text-neutral-400 dark:text-neutral-500">*/}
                                    {/*    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">*/}
                                    {/*        <p>Taxes</p>*/}
                                    {/*        <Price*/}
                                    {/*            className="text-right text-base text-black dark:text-white"*/}
                                    {/*            amount={cart.cost.totalTaxAmount.amount}*/}
                                    {/*            currencyCode={cart.cost.totalTaxAmount.currencyCode}*/}
                                    {/*        />*/}
                                    {/*    </div>*/}
                                    {/*    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">*/}
                                    {/*        <p>Shipping</p>*/}
                                    {/*        <p className="text-right">Calculated at checkout</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">*/}
                                    {/*        <p>Total</p>*/}
                                    {/*        <Price*/}
                                    {/*            className="text-right text-base text-black dark:text-white"*/}
                                    {/*            amount={cart.cost.totalAmount.amount}*/}
                                    {/*            currencyCode={cart.cost.totalAmount.currencyCode}*/}
                                    {/*        />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                        <button onClick={checkRedirectToPayment}
                                            className="block w-full rounded bg-green-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                                        >
                                            Thanh toán -   {parseNumber(totalAmount, true)}
                                        </button>
                                </div>
                            )}
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
}
