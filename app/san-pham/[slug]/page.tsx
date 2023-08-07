'use client'
import React, {useEffect, useState} from "react";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import {usePathname, useRouter} from 'next/navigation'
import {Product, ProductService} from "@/lib/repo/product.repo";
import {ShopService} from "@/lib/repo/shop.repo";
import {useCart} from "@/lib/providers/cart-provider";
import {ArrowRightIcon, ChevronRightIcon, HomeIcon} from "@heroicons/react/20/solid";
import ProductDetailQuantity from "@/components/product/ProductDetailQuantity";
export default function Product({params}: { params: { slug: string } }) {
    const [productInfo, setProductInfo] = useState<Product>()
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
    const { cartProducts, changeProductQuantity, addToCartNoTopping } = useCart();
    const [qty, setQty]  = useState<number>(1);

    //Format giá tiền sản phẩm
    const formatPrice = (price: number) => {
        let priceFormat = new Intl.NumberFormat('en-DE').format(price)
        return priceFormat
    }

    // Lấy thông tin chi tiết sản phẩm
    const getProductInfo = async (id: string) => {
        const res = await ProductService.getOne({id: id})
        console.log(res)
        setProductInfo(res)
        void getRelatedProducts(res.categoryId)
        //Lấy thông tin chi tiết của shop bán sản phẩm
        // void getShopInfo(res?.member.id)
    }

    //Lấy thông tin chi tiết của shop bán sản phẩm
    const getShopInfo = async (shopId: string) => {
        let res = await ShopService.getOne({id: shopId})
        console.log(res)
    }

    // Lấy thong tin các sp liên quan
    const getRelatedProducts = async (categoryId: string) => {
        let cateRes = await ProductService.getAll({query: {
            limit:6,
                filter: { categoryId : categoryId }
            }})
        console.log(cateRes)
        setRelatedProducts(cateRes.data)
    }

    useEffect(() => {
        void getProductInfo(params.slug)
    }, [])

    return (
        <div className={`bg-gray-100 pb-5`}>
            <div className="container py-4 flex items-center gap-3">
               <HomeIcon className={`w-5 h-5`} />
               <ChevronRightIcon className={`w-5 h-5`} />
                <p className="text-gray-600 font-medium">Product</p>
            </div>
            <div className="container  grid grid-cols-2 gap-6 bg-white py-4">
                <div className={`p-5`}>
                    <img
                        src={productInfo?.image}
                        alt="product" className="w-full  mx-auto"/>
                    <div className="grid grid-cols-7 gap-4 mt-4">
                        {productInfo?.images.map((img, index) => (
                            <img key={index}
                                 src={img}
                                 alt="product2"
                                 className="w-full cursor-pointer border border-primary"/>
                        ))}
                    </div>
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
                                <p className="text-3xl text-primary font-semibold text-red-500">{formatPrice(productInfo?.basePrice ?? 0)} đ</p>
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

                            <div className="flex gap-3 border-b border-gray-200 pb-5 pt-5">
                                <button onClick={() => {
                                    if (productInfo && addToCartNoTopping) {
                                        addToCartNoTopping(productInfo, qty)
                                    }
                                }}
                                   className="bg-red-500 border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-red-600 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                    </svg>
                                    Chọn mua
                                </button>
                                <a href="#"
                                   className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                                    </svg>
                                    Yêu thích
                                </a>
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
                    <div className={`col-span-2`}>
                        <div className={`border border-gray-200 rounded p-4`}>
                            <h3 className={`mb-3 font-semibold`}>Ông Bụt Shop</h3>
                            <div className={`grid grid-cols-3 gap-x-2`}>
                                <div>
                                    <div className={`flex gap-x-1`}> 4.6 / 5
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-4 h-4 text-yellow-300">
                                            <path fillRule="evenodd"
                                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                  clipRule="evenodd"/>
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
                            <div className={`mt-3 flex gap-x-2`}>
                                <Link href={`/cua-hang/ong-but`}>
                                    <button type="button"
                                            className="text-green-500 w-full border border-green-500 focus:outline-none font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center mr-2 0">
                                        <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                            <path
                                                d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                        </svg>
                                        Xem Shop
                                    </button>
                                </Link>
                                <button type="button"
                                        className="text-green-500 w-1/2 border border-green-500 focus:outline-none  font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center ">
                                    Theo dõi
                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>
                            </div>
                            <div className={`mt-3`}>
                                <div className={`flex justify-between items-center mb-2`}>
                                    <span className={`text-[13px] text-gray-400`}>Thời gian bảo hành</span>
                                    <span className={`text-[13px]`}>1 tháng</span>
                                </div>
                                <div className={`flex justify-between items-center mb-2`}>
                                    <span className={`text-[13px] text-gray-400`}>Hình thức bảo hành</span>
                                    <span className={`text-[13px]`}>Hóa đơn</span>
                                </div>
                                <div className={`flex justify-between items-center flex-wrap mb-2`}>
                                    <span className={`text-[13px] text-gray-400`}>Nơi bảo hành</span>
                                    <span className={`text-[13px]`}>Bảo hành bởi nhà bán hàng thông qua Taka</span>
                                </div>
                                <div className={`flex justify-between items-center flex-wrap`}>
                                    <span className={`text-[13px] text-gray-400`}>Hướng dẫn bảo hành</span>
                                    <span className={`text-[13px] text-blue-400`}>Xem chi tiết</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pb-16 bg-white">
                <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">Chi tiết sản
                    phẩm</h3>
                <div className="w-3/5 pt-6">
                    <div className="text-gray-600" dangerouslySetInnerHTML={{__html: productInfo?.intro ?? ''}}>
                    </div>
                </div>
            </div>
            <div className="container pb-16 bg-white mb-4">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Sản phẩm tương tự</h2>
                <div className="grid grid-cols-6 gap-6">
                    {relatedProducts.map((x, index) => (
                        <div key={index}>
                            <ProductCard product={x}></ProductCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
