'use client'
import React, {useEffect, useState} from "react";
import ProductCard from "@/components/product/ProductCard";
import { useProductsContext} from "@/lib/providers/products-provider";
import {Product, ProductService} from "@/lib/repo/product.repo";

const TAB_CATEGORY = [
    {name: 'Bán chạy', value: 1},
    {name: 'Phổ biến', value: 2},
    {name: 'Hàng mới', value: 3}
]
export default function StoreProfile({shop}: any){
    const [cateSelected, setCateSelected] = useState(1)
    const [products, setProducts] = useState<Product[]>([])
    const {
        categories,
    } = useProductsContext();

    // Lấy danh sách sản phẩm theo danh mục
    const getProducts = async () => {
        let cateRes = await ProductService.getAll({query: {
                limit:10
            }})
        console.log(cateRes)
        setProducts(cateRes.data)
    }
    useEffect(() => {
       void getProducts()
    }, [])

    return (
        <div className={`bg-gray-100 pb-5 container`}>
            <div className={`h-[200px] p-4  bg-gray-200`}>
                <div className={`flex flex-wrap gap-2 items-center gap-x-10`}>
                    <img className={`w-16 h-16 rounded-full`} src={shop?.shopLogo} alt=""/>
                    <div className={`border-r`}>
                        <h3 className={`font-semibold text-gray-500`}>{shop?.shopName}</h3>
                        <div className={`grid grid-cols-3 gap-x-2`}>
                            <div className={``}>
                                <div className={`flex gap-x-1`}> 4.6 / 5
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-4 h-4 text-yellow-300">
                                        <path fill-rule="evenodd"
                                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                              clip-rule="evenodd"/>
                                    </svg></div>
                                <div className={`text-[12px] text-gray-400`}>10.9k+</div>
                            </div>
                            <div className={``}>
                                <p>3.5k+</p>
                                <p className={`text-[12px] text-gray-400`}>Theo dõi</p>
                            </div>
                            <div className={``}>
                                <p>91%</p>
                                <p className={`text-[12px] text-gray-400`}>Phản hồi</p>
                            </div>
                        </div>
                    </div>
                    <button type="button"
                            className="text-white w-fit h-fit border border-blue-500 bg-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center ">
                        Theo dõi
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </div>
          {/*<div className={`my-2`}>*/}
          {/*    <img className={`h-[300px] object-cover w-full rounded`} src={shop?.config.banners[0].image} alt=""/>*/}
          {/*</div>*/}
            <div className={`flex`}>
                <div className={`p-4 bg-white hidden lg:block border-r border-gray-300 shrink-0`}>
                    <h4 className={`text-[16px] font-semibold`}>Danh mục sản phẩm</h4>
                    <ul className=" text-sm text-[12px] text-gray-900 bg-white mt-2">
                        {categories?.map((x,index) => (
                            <li className="w-full py-2 hover:bg-green-400 hover:text-white cursor-pointer px-2 rounded" key={index}>{x?.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={`grow bg-white`}>
                    <div
                        className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px">
                            {TAB_CATEGORY.map((tab) => (
                                <li key={tab.value} className="mr-2 cursor-pointer" onClick={() => setCateSelected(tab.value)}>
                                    <div
                                       className={`inline-block p-4  rounded-t-lg ${cateSelected == tab.value ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                                       aria-current="page">{tab.name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`p-4`}>
                        <div className={`grid grid-cols-2 lg:grid-cols-6 gap-2`}>
                            {products.map((x, index) => (
                                <div key={index}>
                                    <ProductCard product={x}></ProductCard>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
