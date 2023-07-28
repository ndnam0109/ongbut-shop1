'use client'
import Link from "next/link";
import React from "react";
import CartModal from "@/components/cart";
import {useCart} from "@/lib/providers/cart-provider";
import {HomeIcon, UserIcon} from "@heroicons/react/20/solid";

export default function Header(){
    return (
        <nav className=" bg-green-500">
            <div className="container flex">
                <div className="flex items-center justify-between flex-grow  py-2">
                    <Link className={`hidden md:block`} href={'/'}>
                        <div className={`text-white text-2xl font-semibold`}>TAKA</div>
                    </Link>
                    <form className={`w-2/3 md:w-1/2 grow`}>
                        <div className="flex">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search"
                                       className="block p-2.5 pl-10 w-full z-20 text-sm text-gray-900 bg-gray-50 focus:outline-none rounded-lg border-l-gray-100 border-l-2 border border-gray-300 "
                                       placeholder="Taka - Tha hồ mua sắm" />
                                    <button type="submit"
                                            className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-gray-500 border-l border-l-gray-300 hover:text-green-600 rounded-r-lg  hover:bg-green-200  focus:outline-none ">
                                        Tìm kiếm
                                    </button>
                            </div>
                        </div>
                    </form>
                    <div className="flex items-center space-x-4 text-white">
                        <div className={`hidden lg:flex  items-center gap-x-1`}>
                            <HomeIcon className={`w-5 h-5`} />
                            Trang chủ
                        </div>
                        <div className={`hidden lg:flex  items-center gap-x-1`}>
                            <UserIcon className={`w-5 h-5`} />
                            Tài khoản
                        </div>
                        <CartModal />
                    </div>
                </div>
            </div>
        </nav>
    )
}
