import router from "next/router";
import {parseNumber} from "@/lib/helpers/parser";
import {CartProduct, useCart} from "@/lib/providers/cart-provider";
// import { usePaymentContext } from "../../index/payment/providers/payment-provider";
import {ProductQuantity} from "@/components/product/ProductQuantity";
// import { useCartTable} from "@/lib/providers/cart-table-provider";
import {useScreen} from "@/lib/hooks/useScreen";

interface Props extends ReactProps {
    cartProduct: CartProduct;
    editable?: boolean;
    index: number;
    quantityEditable?: boolean;
    isDiscountProduct?: boolean;
}

export function CardProductItem({
                                    cartProduct,
                                    index,
                                    editable = false,
                                    quantityEditable = true,
                                    isDiscountProduct = false,
                                    ...props
                                }: Props) {
    const {changeProductQuantity} = useCart();
    // const { changeProductQuantity: changeProductQuantityTable } = useCartTable();
    // const { changeDiscountItemQuantity } = usePaymentContext();
    const screenLg = useScreen("lg");

    return (
        <div className={`flex gap-x-2 py-4`}>
            <img className={`w-16`}
                 src={cartProduct?.product?.image ?? 'https://southswellsurfshop.com/cdn/shop/products/rayban-eagle-eye-default-rayban-827002.jpg?v=1684338670'}
                 alt=""/>
            <div className={`grow`}>
                <div className={`flex justify-between`}>
                    <h3 className={`text-sm font-semibold`}>{cartProduct?.product?.name}</h3>
                </div>
                <div className={`flex justify-between items-center`}>
                    <div className={`text-red-500 text-md font-medium `}>
                        {parseNumber(cartProduct.amount, true)}
                    </div>
                    <ProductQuantity quantity={cartProduct.qty}
                                     setQuantity={(qty) => {
                                         changeProductQuantity(index, qty)
                                     }}>
                    </ProductQuantity>
                </div>
            </div>
        </div>
    );
}
