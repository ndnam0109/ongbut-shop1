'use client'
import Link from "next/link";
import React from "react";
import CartModal from "@/components/cart";
import {useCart} from "@/lib/providers/cart-provider";
import {HomeIcon, UserIcon} from "@heroicons/react/20/solid";
import {Input} from "@nextui-org/input";
import {Kbd} from "@nextui-org/kbd";
import {SearchIcon} from "@nextui-org/shared-icons";
import {Button, Tooltip} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import {useShopContext} from "@/lib/providers/shop-provider";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";

export default function Header() {
    const {shop, customer, logoutCustomer, shopCode, setOpenLoginDialog} = useShopContext();
    console.log(customer)
    return (
        <nav className=" bg-green-500">
            <div className="container flex">
                <div className="flex items-center justify-between flex-grow  py-2">
                    <Link className={`hidden md:block`} href={'/'}>
                        <div className={`text-white text-2xl font-semibold`}>TAKA</div>
                    </Link>
                    <form className={`w-2/3 md:w-1/2 grow lg:grow-0`}>
                        <div className="flex">
                            <div className="relative w-full">
                                <Input
                                    aria-label="Search"
                                    classNames={{
                                        inputWrapper: "bg-default-100 ",
                                        input: "text-sm focus:outline-none",
                                    }}
                                    endContent={
                                        <Button size="sm">
                                            Tìm kiếm
                                        </Button>
                                    }
                                    radius={"sm"}
                                    labelPlacement="outside"
                                    placeholder="Taka - Tha hồ mua sắm"
                                    startContent={
                                        <SearchIcon
                                            className="text-base text-default-400 pointer-events-none flex-shrink-0"/>
                                    }
                                    type="search"
                                />
                            </div>
                        </div>
                    </form>
                    <div className="flex items-center space-x-4 text-white">
                        <div className={`hidden lg:flex  items-center gap-x-1`}>
                            <Tooltip content="Trang chủ">
                                <HomeIcon className={`w-6 h-6 cursor-pointer`}/>
                            </Tooltip>
                        </div>
                            <CartModal/>
                        <div className={`hidden lg:flex  items-center gap-x-1`}>
                            {customer ? (
                                <Dropdown placement="bottom-end">
                                    <DropdownTrigger>
                                        <Avatar
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                                        <DropdownItem key="profile" className="h-14 gap-2">
                                            <p className="font-semibold">{customer?.name}</p>
                                            <p className="font-semibold">{customer?.phone}</p>
                                        </DropdownItem>
                                        <DropdownItem key="settings">
                                            Thông tin tài khoản
                                        </DropdownItem>
                                        <DropdownItem key="team_settings">Lịch sử đặt hàng</DropdownItem>
                                        <DropdownItem key="logout" color="danger">
                                            Đăng xuất
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
                                <Button color="primary">
                                    Đăng nhập
                                </Button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )
}
