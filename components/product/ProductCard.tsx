import React, {useState} from "react";
import {Product} from "@/lib/repo/product.repo";
import {useRouter} from "next/navigation";
import {StarIcon} from "@heroicons/react/20/solid";
import ProductDetailPopup from "@/components/product/ProductDetailPopup";

export default function ProductCard({product, clickViewModal = false}: { product: Product, clickViewModal?: boolean }) {
    const router = useRouter()
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const formatPrice = (price : number) => {
        let priceFormat = new Intl.NumberFormat('en-DE').format(price)
        return priceFormat
    }
    const handleNavigate = () => {
        console.log(1111111111)
      if (clickViewModal){
          console.log('view')
          setIsOpenModal(true)
      } else {
          router.push(`/san-pham/${product?.id}`)
      }
    }
    return (
       <>
           <div onClick={handleNavigate} className={`hover:-translate-y-2 cursor-pointer border rounded flex flex-col h-full duration-200`} >
               <img className={`rounded  h-[150px] object-cover object-center`}
                    src={product?.image ?? 'https://southswellsurfshop.com/cdn/shop/products/rayban-eagle-eye-default-rayban-827002.jpg?v=1684338670'}
                    alt=""/>
               <div className={`px-2 py-2 flex grow flex-col justify-between`}>
                   <h3 className={`text-gray-500 text-[12px] break-words`}>{product?.name}</h3>
                   <div>
                       <div className={`flex gap-x-1 mt-3 text-[12px]`}>
                        <span className={` border-r-2 flex`}>{product?.rating}
                            <StarIcon className={`w-4 h-4 text-yellow-300`} />
                        </span>
                           <span>Đã bán 500+</span>
                       </div>
                       <div className={`text-[18px] mt-2  font-semibold text-red-500`}>{formatPrice(product?.basePrice ?? 0)}đ</div>
                   </div>
               </div>
           </div>
           {isOpenModal && (
               <ProductDetailPopup productInfo={product} close={() => setIsOpenModal(false)} />
           )}
       </>
    )
}
