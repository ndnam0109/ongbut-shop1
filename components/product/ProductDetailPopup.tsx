import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import {Product} from "@/lib/repo/product.repo";
import ProductDetailQuantity from "@/components/product/ProductDetailQuantity";
import Link from "next/link";
import {parseNumber} from "@/lib/helpers/parser";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import {useCart} from "@/lib/providers/cart-provider";

export default function ProductDetailPopup({productInfo, close} : {productInfo: Product, close: any}) {
    const [qty, setQty] = useState<number>(1)
    let [isOpen, setIsOpen] = useState(true)
    const { cartProducts, changeProductQuantity, addToCartNoTopping } = useCart();
    function closeModal() {
       close()
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-2/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="container  grid grid-cols-2 gap-6 bg-white py-4">
                                        <div className={`p-5`}>
                                            <img
                                                src={productInfo?.image}
                                                alt="product" className="w-full  mx-auto"/>
                                        </div>
                                        <div className={`grid grid-cols-5`}>
                                            <div className={`col-span-3`}>
                                                <div>
                                                    <div className={`text-[12px] text-gray-500`}>Thương hiệu: <span
                                                        className={`text-green-500`}>ORM</span></div>
                                                    <h2 className="text-[24px] my-[4px]  uppercase mb-2">{productInfo?.name}</h2>
                                                    <div className="flex items-center mb-4">
                                                        <div className="flex gap-1 text-sm text-yellow-400">
                                                            <span><i className="fa-solid fa-star"></i></span>
                                                            <span><i className="fa-solid fa-star"></i></span>
                                                            <span><i className="fa-solid fa-star"></i></span>
                                                            <span><i className="fa-solid fa-star"></i></span>
                                                            <span><i className="fa-solid fa-star"></i></span>
                                                        </div>
                                                        <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-gray-800 font-semibold space-x-2">
                                                            <span>Availability: </span>
                                                            <span className="text-green-600">In Stock</span>
                                                        </p>
                                                        <p className="space-x-2">
                                                            <span className="text-gray-800 font-semibold">Brand: </span>
                                                            <span className="text-gray-600">Apex</span>
                                                        </p>
                                                        <p className="space-x-2">
                                                            <span className="text-gray-800 font-semibold">Category: </span>
                                                            <span className="text-gray-600">Kính</span>
                                                        </p>
                                                        <p className="space-x-2">
                                                            <span className="text-gray-800 font-semibold">Mã sản phẩm: </span>
                                                            <span className="text-gray-600">{productInfo?.code}</span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                                                        <p className="text-3xl text-primary font-semibold text-red-500">{parseNumber(productInfo?.basePrice ?? 0, true)} đ</p>
                                                        <p className="text-base text-gray-400 line-through">$55.00</p>
                                                        <p className="text-[12px] text-gray-400 text-white px-2 bg-red-500 rounded"> -50%</p>
                                                    </div>

                                                    {/*<p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.*/}
                                                    {/*    Eos eius*/}
                                                    {/*    eum*/}
                                                    {/*    reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit,*/}
                                                    {/*    velit*/}
                                                    {/*    consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro.</p>*/}

                                                    <div className="pt-4">
                                                        <h3 className="text-sm text-gray-800 uppercase mb-1">Size</h3>
                                                        <div className="flex items-center gap-2">
                                                            <div className="size-selector">
                                                                <input type="radio" name="size" id="size-xs" className="hidden"/>
                                                                <label htmlFor="size-xs"
                                                                       className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XS</label>
                                                            </div>
                                                            <div className="size-selector">
                                                                <input type="radio" name="size" id="size-sm" className="hidden"/>
                                                                <label htmlFor="size-sm"
                                                                       className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">S</label>
                                                            </div>
                                                            <div className="size-selector">
                                                                <input type="radio" name="size" id="size-m" className="hidden"/>
                                                                <label htmlFor="size-m"
                                                                       className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">M</label>
                                                            </div>
                                                            <div className="size-selector">
                                                                <input type="radio" name="size" id="size-l" className="hidden"/>
                                                                <label htmlFor="size-l"
                                                                       className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">L</label>
                                                            </div>
                                                            <div className="size-selector">
                                                                <input type="radio" name="size" id="size-xl" className="hidden"/>
                                                                <label htmlFor="size-xl"
                                                                       className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XL</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="pt-4">
                                                        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
                                                        <div className="flex items-center gap-2">
                                                            <div className="color-selector">
                                                                <input type="radio" name="color" id="red" className="hidden"/>
                                                                <label htmlFor="red"
                                                                       className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                                                       style={{backgroundColor: '#fc3d57'}}></label>
                                                            </div>
                                                            <div className="color-selector">
                                                                <input type="radio" name="color" id="black" className="hidden"/>
                                                                <label htmlFor="black"
                                                                       className="border border-gray-200 rounded-sm h-6 w-6 bg-green-500 cursor-pointer shadow-sm block"
                                                                ></label>
                                                            </div>
                                                            <div className="color-selector">
                                                                <input type="radio" name="color" id="white" className="hidden"/>
                                                                <label htmlFor="white"
                                                                       className="border border-gray-200 rounded-sm h-6 w-6 bg-indigo-500 cursor-pointer shadow-sm block"
                                                                ></label>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="mt-4">
                                                        <ProductDetailQuantity onChange={setQty} value={qty}></ProductDetailQuantity>
                                                    </div>
                                                    <div className="flex gap-3 mt-4">
                                                        <a href="#"
                                                           className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 className="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24"
                                                                 viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                                                 strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#"
                                                           className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 className="icon icon-tabler icon-tabler-brand-youtube" width="24" height="24"
                                                                 viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                                                 strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M3 5m0 4a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v6a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"></path>
                                                                <path d="M10 9l5 3l-5 3z"></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#"
                                                           className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 className="icon icon-tabler icon-tabler-brand-instagram" width="24" height="24"
                                                                 viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                                                 strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                                                <path d="M16.5 7.5l0 .01"></path>
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4  flex justify-end gap-x-2">
                                        <button onClick={() => {
                                            if (productInfo && addToCartNoTopping) {
                                                addToCartNoTopping(productInfo, qty)
                                            }
                                            closeModal()
                                        }}
                                                className="bg-red-500 border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-red-600 transition">
                                            <ShoppingCartIcon className={`w-5 h-5`} />
                                            Chọn mua
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
