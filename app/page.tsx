'use client'
import React, {Fragment} from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import {ProductsContext, ProductsProvider} from "@/lib/providers/products-provider";
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Autoplay} from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {ShopContext, useShopContext} from "@/lib/providers/shop-provider";
import {Dialog, Transition} from "@headlessui/react";
import {Spinner} from "@nextui-org/spinner";

const categoriesConst = [
    {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg',
    },
    {
        name: 'Productivity',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg',
    },
    {
        name: 'Workspace',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg',
    },
    {
        name: 'Accessories',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg',
    },
    {name: 'Sale', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg'},
]


export default function Home() {
    SwiperCore.use([Autoplay])
    const {
        shop,
    } = useShopContext();
    console.log(shop)
    return (
        <ProductsProvider>
            <ProductsContext.Consumer>
                {({loadCategories, filter, onFilterChange, categories}) => (
                    <div className={`bg-gray-100 py-5`}>
                        <div className={`container flex gap-x-4`}>
                            <div className={`hidden lg:block w-1/6 shrink-0`}>
                                <div className={`p-4 bg-white rounded-xl border-gray-300`}>
                                    <h4 className={`text-[16px] font-semibold`}>Danh mục</h4>
                                    <ul className=" text-sm text-[12px] text-gray-900 bg-white mt-2">
                                        {categories?.map((x, index) => (
                                            <div key={index}>
                                                <Link href={`/danh-muc/${x.id}`}>
                                                    <li className="w-full py-1 px-1 rounded-xl flex gap-x-2 items-center hover:bg-green-500 hover:text-white">
                                                        <div className={`rounded-xl p-1 bg-white`}>
                                                            <img className={`w-8 h-8 object-contain`}
                                                                 src={x.image}
                                                                 alt=""/>
                                                        </div>
                                                        <span>{x.name}</span>
                                                    </li>
                                                </Link>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className="">
                                    <div className={`grid grid-cols-3 gap-x-2`}>
                                        <div className={`col-span-3 md:col-span-2`}>
                                            <Swiper
                                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                slidesPerView={1}
                                                loop={true}
                                                autoplay={{
                                                    delay: 3000,
                                                }}
                                                pagination={{clickable: true}}
                                            >
                                                <SwiperSlide><img
                                                    src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/6d/0e/41/c287aa5490f4c2f6941e4a8b773cb330.png.webp"
                                                    className={`rounded-xl h-[250px] w-full object-cover`}
                                                    alt=""/></SwiperSlide>
                                                <SwiperSlide><img
                                                    src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/92/7a/14/cf947d2ac4658235ffc2ac31aa21ceba.png.webp"
                                                    className={`rounded-xl h-[250px] w-full object-cover`}
                                                    alt=""/></SwiperSlide>
                                                <SwiperSlide><img
                                                    src="https://salt.tikicdn.com/cache/w1080/ts/tka/84/a0/d3/cf4acdc9c6d2ac68945e8ae03c70b884.jpg.webp"
                                                    className={`rounded-xl h-[250px] w-full object-cover`}
                                                    alt=""/></SwiperSlide>
                                            </Swiper>

                                        </div>
                                        <div className={`hidden md:block col-span-1 flex flex-col gap-y-4`}>
                                            <img
                                                src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/30/4f/e7/3fd44f47d60e8a45fbaa089f011fb396.png.webp"
                                                className={`rounded-xl h-[250px] w-full`} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded mt-4 bg-white">
                                    <div className=" xl:max-w-7xl xl:mx-auto ">
                                        <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between ">
                                            <h2 className="text-lg font-semibold tracking-tight text-gray-900">Danh mục
                                                nổi bật</h2>
                                            <a href="#"
                                               className="hidden text-sm font-semibold text-green-600 hover:text-green-500 sm:block">
                                                Chi tiết<span aria-hidden="true"> &rarr;</span>
                                            </a>
                                        </div>

                                        <div className="mt-4  flow-root">
                                            <div className="-my-2">
                                                <div
                                                    className="box-content py-2 relative h-40 overflow-x-auto xl:overflow-visible">
                                                    <div
                                                        className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                                                        {categoriesConst.map((category) => (
                                                            <a
                                                                key={category.name}
                                                                href={category.href}
                                                                className="relative w-56 h-40 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                                                            >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img src={category.imageSrc} alt="" className="w-full h-full object-center object-contain"/>
                    </span>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                                                                />
                                                                <span
                                                                    className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 px-4 sm:hidden">
                                            <a href="#"
                                               className="block text-sm font-semibold text-green-500 hover:text-green-600">
                                                Chi tiết<span aria-hidden="true"> &rarr;</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className=" py-4">
                                    <div className={`grid grid-cols-2 gap-x-4`}>
                                        {shop?.config?.productGroups.map((x, index) => (
                                            <div key={x.name}
                                                 className={`col-span-2 my-2 rounded-xl border bg-white p-5`}>
                                                <div className={`flex justify-between mb-4 `}>
                                                    <h3 className={`font-semibold`}>{x.name}</h3>
                                                    <a href="#"
                                                       className="hidden text-sm font-semibold text-green-600 hover:text-green-500 sm:block">
                                                        Xem thêm<span aria-hidden="true"> &rarr;</span>
                                                    </a>
                                                </div>
                                                <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2`}>
                                                    {x?.products.slice(0, 6).map((x, index) => (
                                                        <div key={index} className={`col-span-1`}>
                                                            <ProductCard product={x}></ProductCard>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ProductsContext.Consumer>
        </ProductsProvider>
    )
}
