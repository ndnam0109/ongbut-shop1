'use client'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon} from "@heroicons/react/20/solid";
import {ProductQuantity} from "@/components/product/ProductQuantity";
import {useCart} from "@/lib/providers/cart-provider";
import {parseNumber} from "@/lib/helpers/parser";

const deliveryMethods = [
    { id: 1, title: 'COD',image:'https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/ship-cod-la-gi-0.jpg', turnaround: '4–10 business days', price: '$5.00' },
    { id: 2, title: 'VNPay',image:'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [
    { id: 'credit-card', title: 'Credit card' },
    { id: 'paypal', title: 'PayPal' },
    { id: 'etransfer', title: 'eTransfer' },
]

// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
      const {
        cartProducts,
        totalAmount,
        changeProductQuantity,
        totalQty,
        clearCartProducts,
    } = useCart();

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto pt-16 pb-24 px-4 ">
                <h2 className="sr-only">Checkout</h2>
                <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <div className=" border-gray-200 ">
                            <h2 className="text-lg font-medium text-gray-900">Thông tin đơn hàng</h2>

                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        Họ
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="first-name"
                                            name="first-name"
                                            autoComplete="given-name"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                        Tên
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="last-name"
                                            name="last-name"
                                            autoComplete="family-name"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        Tỉnh/Thành phố
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                        Quận/Huyện
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        Xã/Phường
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        Số điện thoại
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            autoComplete="phone"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Địa chỉ
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            autoComplete="street-address"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 flex gap-x-2 items-center">
                                    <div className="mt-1">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            id="remember"
                                            autoComplete="street-address"
                                        />
                                    </div>
                                    <label htmlFor="remember" className="block text-sm font-medium text-gray-700">
                                        Lưu thông tin cho lần tiếp theo
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-10">
                            <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                                <RadioGroup.Label className="text-lg font-medium text-gray-900">Hình thức thanh toán</RadioGroup.Label>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {deliveryMethods.map((deliveryMethod) => (
                                        <RadioGroup.Option
                                            key={deliveryMethod.id}
                                            value={deliveryMethod}
                                            className={({ checked, active }) =>
                                                classNames(
                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                    active ? 'ring-2 ring-green-500' : '',
                                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                )
                                            }
                                        >
                                            {({ checked, active }) => (
                                                <>
                                                    <div className="w-full">
                                                        <div className="flex h-full flex-col">
                                                            <RadioGroup.Label as="span" className="block grow text-sm font-medium text-gray-900">
                                                               <div className={`flex  justify-between items-center`}>
                                                                   <h4 className={`flex gap-x-2`}> {deliveryMethod.title}
                                                                       {checked ? <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" /> : null}
                                                                   </h4>
                                                                   <img className={`w-24 max-h-12 object-cover object-center`} src={deliveryMethod.image} alt=""/>
                                                               </div>
                                                            </RadioGroup.Label>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={classNames(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-green-500' : 'border-transparent',
                                                            'absolute -inset-px rounded-lg pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Payment */}
                        <div className="mt-10 border-t border-gray-200 pt-10">
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900">Giỏ hàng</h2>

                        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="sr-only">Items in your cart</h3>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartProducts?.map((product, index) => (
                                    <li key={index} className="flex py-6 px-4 sm:px-6">
                                        <div className="flex-shrink-0">
                                            <img src={product?.product?.image} alt={'imageAlt'} className="w-20 rounded-md" />
                                        </div>

                                        <div className="ml-6 flex-1 flex flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm font-medium text-gray-700">
                                                            {product?.product?.name}
                                                    </h4>
                                                </div>

                                                <div className="ml-4 flex-shrink-0 flow-root">
                                                    <button
                                                        type="button"
                                                        className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex-1 pt-2 flex items-end justify-between">
                                                <p className="mt-1 text-sm font-medium text-red-500">  {parseNumber(product.amount, true)}</p>

                                                <div className="ml-4">
                                                    <ProductQuantity quantity={product.qty}
                                                                     setQuantity={(qty) => {
                                                                         changeProductQuantity(index, qty)
                                                                     }}></ProductQuantity>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Tạm tính</dt>
                                    <dd className="text-sm font-medium text-gray-900">     {parseNumber( totalAmount, true)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Phí giao hàng</dt>
                                    <dd className="text-sm font-medium text-gray-900">0</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Giảm giá khuyến mãi</dt>
                                    <dd className="text-sm font-medium text-gray-900">0</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base font-medium">Tổng</dt>
                                    <dd className="text-base font-medium text-gray-900"> {parseNumber( totalAmount, true)}</dd>
                                </div>
                            </dl>

                            <div className="border-t text-center border-gray-200 py-6 px-4 sm:px-6">
                                <button
                                    type="submit"
                                    className="w-1/2 bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none "
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
