'use client'
import ProductCard from "@/components/product/ProductCard";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {StarIcon} from "@heroicons/react/20/solid";
import {Product, ProductService} from "@/lib/repo/product.repo";
import {ProductsContext, ProductsProvider} from "@/lib/providers/products-provider";
import {CustomInput} from "@/components/shared/utilities/form/input";
import {Card, Skeleton} from "@nextui-org/react";

const TAB_CATEGORY = [
    {name: 'Bán chạy', value: 1},
    {name: 'Phổ biến', value: 2},
    {name: 'Hàng mới', value: 3},
    {name: 'Thấp đến cao', value: 4},
    {name: 'Cao đến thấp', value: 5}
]
export default function CategoryPage({params}: { params: { slug: string } }) {
    const [products, setProducts] = useState<Product[]>([])
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({});
    const [queryNumber, setQueryNumber] = useState<number>(0);
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
    const [currentOrder, setCurrentOrder] = useState<{ property: string; type: "asc" | "desc" }>({} as { property: string; type: "asc" | "desc" });
    const [cateSelected, setCateSelected] = useState(1)
    //Get danh sách sản phẩm

    const getProducts = async () => {
        setIsLoadingProducts(true)
        let query = {
            filter: {...filter, categoryId: params.slug},
            search,
            limit: 10,
        };
        await ProductService
            .getAll({
                query,
            })
            .then((res) => {
                setProducts(
                    res.data
                );
                console.log(res.data)
                setIsLoadingProducts(false);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });
    }

    useEffect(() => {
        void getProducts()
    }, [search, filter, params.slug])

    return (
        <ProductsProvider>
            <ProductsContext.Consumer>
                {({loadCategories, filter, onFilterChange, categories}) => (
                    <div className={`py-4 container bg-gray-100 flex gap-x-4`}>
                        <div className="w-1/4 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
                            <div className="divide-y divide-gray-200 space-y-5 py-5">
                                <div>
                                    <h4 className={`text-[16px] font-semibold`}>Danh mục</h4>
                                    <ul className=" text-sm text-[12px] text-gray-900 bg-white mt-2">
                                        {categories?.map((x, index) => (
                                            <div key={index}>
                                                <Link href={`/danh-muc/${x.id}`}>
                                                    <li className={`w-full py-1 px-1 mt-0.5 rounded-xl flex gap-x-2 items-center hover:bg-green-500 hover:text-white ${x.id == params.slug ? 'bg-green-500 text-white' : ''}`}>
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

                                {/*<div className="pt-4">*/}
                                {/*    <h3 className={`text-[16px] font-semibold`}>Thương hiệu</h3>*/}
                                {/*    <div className="space-y-2">*/}
                                {/*        <div className="flex items-center">*/}
                                {/*            <input type="checkbox" name="brand-1" id="brand-1"*/}
                                {/*                   className="text-primary focus:ring-0 rounded-sm cursor-pointer"/>*/}
                                {/*            <label htmlFor="brand-1" className="text-gray-600 ml-3 cusror-pointer">Cooking*/}
                                {/*                Color</label>*/}
                                {/*            <div className="ml-auto text-gray-600 text-sm">(15)</div>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex items-center">*/}
                                {/*            <input type="checkbox" name="brand-2" id="brand-2"*/}
                                {/*                   className="text-primary focus:ring-0 rounded-sm cursor-pointer"/>*/}
                                {/*            <label htmlFor="brand-2"*/}
                                {/*                   className="text-gray-600 ml-3 cusror-pointer">Magniflex</label>*/}
                                {/*            <div className="ml-auto text-gray-600 text-sm">(9)</div>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex items-center">*/}
                                {/*            <input type="checkbox" name="brand-3" id="brand-3"*/}
                                {/*                   className="text-primary focus:ring-0 rounded-sm cursor-pointer"/>*/}
                                {/*            <label htmlFor="brand-3"*/}
                                {/*                   className="text-gray-600 ml-3 cusror-pointer">Ashley</label>*/}
                                {/*            <div className="ml-auto text-gray-600 text-sm">(21)</div>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex items-center">*/}
                                {/*            <input type="checkbox" name="brand-4" id="brand-4"*/}
                                {/*                   className="text-primary focus:ring-0 rounded-sm cursor-pointer"/>*/}
                                {/*            <label htmlFor="brand-4"*/}
                                {/*                   className="text-gray-600 ml-3 cusror-pointer">M&D</label>*/}
                                {/*            <div className="ml-auto text-gray-600 text-sm">(10)</div>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex items-center">*/}
                                {/*            <input type="checkbox" name="brand-5" id="brand-5"*/}
                                {/*                   className="text-primary focus:ring-0 rounded-sm cursor-pointer"/>*/}
                                {/*            <label htmlFor="brand-5"*/}
                                {/*                   className="text-gray-600 ml-3 cusror-pointer">Olympic</label>*/}
                                {/*            <div className="ml-auto text-gray-600 text-sm">(10)</div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="pt-4">*/}
                                {/*    <h3 className={`text-[16px] font-semibold`}>Giá</h3>*/}
                                {/*    <div className="mt-4 flex items-center">*/}
                                {/*        <input type="text" name="min" id="min"*/}
                                {/*               className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"*/}
                                {/*               placeholder="min"/>*/}
                                {/*        <span className="mx-3 text-gray-500">-</span>*/}
                                {/*        <input type="text" name="max" id="max"*/}
                                {/*               className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"*/}
                                {/*               placeholder="max"/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="pt-4">*/}
                                {/*    <h3 className={`text-[16px] font-semibold`}>Kích cỡ</h3>*/}
                                {/*    <div className="flex items-center gap-2">*/}
                                {/*        <div className="size-selector">*/}
                                {/*            <input type="radio" name="size" id="size-xs" className="hidden"/>*/}
                                {/*            <label htmlFor="size-xs"*/}
                                {/*                   className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XS</label>*/}
                                {/*        </div>*/}
                                {/*        <div className="size-selector">*/}
                                {/*            <input type="radio" name="size" id="size-sm" className="hidden"/>*/}
                                {/*            <label htmlFor="size-sm"*/}
                                {/*                   className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">S</label>*/}
                                {/*        </div>*/}
                                {/*        <div className="size-selector">*/}
                                {/*            <input type="radio" name="size" id="size-m" className="hidden"/>*/}
                                {/*            <label htmlFor="size-m"*/}
                                {/*                   className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">M</label>*/}
                                {/*        </div>*/}
                                {/*        <div className="size-selector">*/}
                                {/*            <input type="radio" name="size" id="size-l" className="hidden"/>*/}
                                {/*            <label htmlFor="size-l"*/}
                                {/*                   className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">L</label>*/}
                                {/*        </div>*/}
                                {/*        <div className="size-selector">*/}
                                {/*            <input type="radio" name="size" id="size-xl" className="hidden"/>*/}
                                {/*            <label htmlFor="size-xl"*/}
                                {/*                   className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XL</label>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div className="pt-4">*/}
                                {/*    <h3 className={`text-[16px] font-semibold`}>Màu sắc</h3>*/}
                                {/*    <div className="flex items-center gap-2">*/}
                                {/*        <div className="color-selector">*/}
                                {/*            <input type="radio" name="color" id="red" className="hidden"/>*/}
                                {/*            <label htmlFor="red"*/}
                                {/*                   className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"*/}
                                {/*                   style={{backgroundColor: '#fc3d57'}}></label>*/}
                                {/*        </div>*/}
                                {/*        <div className="color-selector">*/}
                                {/*            <input type="radio" name="color" id="black" className="hidden"/>*/}
                                {/*            <label htmlFor="black"*/}
                                {/*                   className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"*/}
                                {/*                   style={{backgroundColor: '#fc3d57'}}></label>*/}
                                {/*        </div>*/}
                                {/*        <div className="color-selector">*/}
                                {/*            <input type="radio" name="color" id="white" className="hidden"/>*/}
                                {/*            <label htmlFor="white"*/}
                                {/*                   className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"*/}
                                {/*                   style={{backgroundColor: '#fc3d57'}}></label>*/}
                                {/*        </div>*/}

                                {/*    </div>*/}
                                {/*</div>*/}
                                <div
                                    className="mt-10 bg-white w-full rounded border border-gray-100 flex items-center p-2"
                                    style={{border: '1px solid #e7ebe5'}}>
                                    <CustomInput
                                        type={'text'}
                                        placeholder={`Tìm kiếm`}
                                        debounce={1500}
                                        inputClassName={` w-full`}
                                        className={`grow`}
                                        onChange={(e) => {
                                            console.log(e)
                                            setSearch(e)
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="">
                            <div className={`grid grid-cols-2 gap-x-4`}>
                                <div className={`col-span-2 rounded border bg-white p-5`}>
                                    <div className={`flex justify-between mb-4 `}>
                                        <h2 className={`font-semibold`}>{categories.find(x => x.id == params.slug)?.name}</h2>
                                    </div>
                                    <div className={`grid grid-cols-2 gap-x-4 mb-4`}>
                                        <div className={`rounded flex border border-gray-200`}>
                                            <div className={`p-2 bg-gray-300`}>
                                                <img className={`w-24 h-24 object-cover`}
                                                     src="https://salt.tikicdn.com/ts/tka/39/d4/f0/d2704a09622bbe14ea1fe7183c72bd3f.png"
                                                     alt=""/>
                                            </div>
                                            <div className={`p-4`}>
                                                <h3 className={`text-xl font-medium`}>Maxken - Mua 3 tặng 1</h3>
                                                <div className={`flex items-center gap-x-2 mt-2`}>
                                                    <div
                                                        className={`flex gap-x-1 items-center px-2 border-gray-300 border-r`}>
                                                        4.5
                                                        <StarIcon className={`text-yellow-500 w-4 h-4`}/>
                                                    </div>
                                                    <span className={`text-sm text-gray-500`}>500+ đã bán</span>
                                                </div>
                                                <div className={`flex gap-x-1 mt-3`}>
                                                    <img className={`w-16 h-16 rounded border border-gray-300`}
                                                         src="https://salt.tikicdn.com/cache/280x280/ts/product/62/41/cf/7e324969e892c3a6ecda0ddd34985747.jpg"
                                                         alt=""/>
                                                    <img className={`w-16 h-16 rounded border border-gray-300`}
                                                         src="https://salt.tikicdn.com/cache/280x280/ts/product/d5/df/8e/5fc4cd76914ac3d9127df5812308815f.jpg"
                                                         alt=""/>
                                                    <img className={`w-16 h-16 rounded border border-gray-300`}
                                                         src="https://salt.tikicdn.com/cache/280x280/ts/product/62/41/cf/7e324969e892c3a6ecda0ddd34985747.jpg"
                                                         alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`rounded flex border border-gray-200`}>
                                            <div className={`p-2 bg-gray-300`}>
                                                <img className={`w-24 h-24 object-cover`}
                                                     src="https://salt.tikicdn.com/ts/tka/39/d4/f0/d2704a09622bbe14ea1fe7183c72bd3f.png"
                                                     alt=""/>
                                            </div>
                                            <div className={`p-4`}>
                                                <h3 className={`text-xl font-medium`}>Maxken - Mua 3 tặng 1</h3>
                                                <div className={`flex items-center gap-x-2 mt-2`}>
                                                    <div
                                                        className={`flex gap-x-1 items-center px-2 border-gray-300 border-r`}>
                                                        4.5
                                                        <StarIcon className={`text-yellow-500 w-4 h-4`}/>
                                                    </div>
                                                    <span className={`text-sm text-gray-500`}>500+ đã bán</span>
                                                </div>
                                                <div className={`flex gap-x-1 mt-3`}>
                                                    <img className={`w-16 h-16 rounded border border-gray-300`}
                                                         src="https://salt.tikicdn.com/cache/280x280/ts/product/62/41/cf/7e324969e892c3a6ecda0ddd34985747.jpg"
                                                         alt=""/>
                                                    <img className={`w-16 h-16 rounded border border-gray-300`}
                                                         src="https://salt.tikicdn.com/cache/280x280/ts/product/d5/df/8e/5fc4cd76914ac3d9127df5812308815f.jpg"
                                                         alt=""/>
                                                    <img className={`w-16 h-16 rounded border border-gray-300`}
                                                         src="https://salt.tikicdn.com/cache/280x280/ts/product/62/41/cf/7e324969e892c3a6ecda0ddd34985747.jpg"
                                                         alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`bg-white rounded`}>
                                <div
                                    className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mt-4">
                                    <ul className="flex flex-wrap -mb-px">
                                        {TAB_CATEGORY.map((tab) => (
                                            <li key={tab.value} className="mr-2 cursor-pointer"
                                                onClick={() => setCateSelected(tab.value)}>
                                                <div
                                                    className={`inline-block p-4  rounded-t-lg ${cateSelected == tab.value ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                                                    aria-current="page">{tab.name}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`p-4`}>
                                    {isLoadingProducts ? (
                                        <div className={`grid grid-cols-5 gap-x-3 gap-y-4`}>
                                            {[1, 1, 1, 1, 1].map((x, index) => (
                                                <Card key={index} className="w-[200px] space-y-5 p-4" >
                                                    <Skeleton className="rounded-lg">
                                                        <div className="h-24 rounded-lg bg-default-300"></div>
                                                    </Skeleton>
                                                    <div className="space-y-3">
                                                        <Skeleton className="w-3/5 rounded-lg">
                                                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                                        </Skeleton>
                                                        <Skeleton className="w-4/5 rounded-lg">
                                                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                                        </Skeleton>
                                                        <Skeleton className="w-2/5 rounded-lg">
                                                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                                        </Skeleton>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            {products.length > 0 ? (
                                                <div className={`grid grid-cols-5 gap-x-3 gap-y-4`}>
                                                    {products.map((product, index) => (
                                                        <div key={index} className={`col-span-1`}>
                                                            <ProductCard product={product}
                                                                         clickViewModal={true}></ProductCard>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className={`text-center`}>
                                                    <p>Không có sản phẩm</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    )}
            </ProductsContext.Consumer>
        </ProductsProvider>
    )
}
