'use client'
import {useEffect, useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {CheckCircleIcon, ScaleIcon, TrashIcon, TruckIcon} from "@heroicons/react/20/solid";
import {ProductQuantity} from "@/components/product/ProductQuantity";
import {useCart} from "@/lib/providers/cart-provider";
import {parseNumber} from "@/lib/helpers/parser";
import CustomDropdown from "@/lib/form/CustomDropdown";
import PaymentDeliveryInfo from "@/components/payment/payment-delivery-info";
import {Input, Textarea} from "@nextui-org/input";
import {Checkbox} from "@nextui-org/react";
import {useShopContext} from "@/lib/providers/shop-provider";
import {useLocation} from "@/lib/providers/location-provider";
import {CustomerLoginDialog} from "@/components/auth/CustomerLoginDialog";
import {PaymentConfirmationInfoDialog} from "@/components/payment/payment-confirmation-info-dialog";
import {PaymentProvider, usePaymentContext} from "@/lib/providers/payment-provider";

const deliveryMethods = [
    {
        id: 1,
        title: 'COD',
        image: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/ship-cod-la-gi-0.jpg',
        turnaround: '4–10 business days',
        price: '$5.00'
    },
    // {
    //     id: 2,
    //     title: 'VNPay',
    //     image: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png',
    //     turnaround: '2–5 business days',
    //     price: '$16.00'
    // },
]
const paymentMethods = [
    {id: 'credit-card', title: 'Credit card'},
    {id: 'paypal', title: 'PayPal'},
    {id: 'etransfer', title: 'eTransfer'},
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
    const {shop, customer, logoutCustomer, shopCode, setOpenLoginDialog} = useShopContext();
    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)
    const {openLocation, userLocation} = useLocation();
    const {orderInput, setOrderInput} = usePaymentContext();
    const createOrder = async () => {

    }
    useEffect(() => {
        if (userLocation) {
            setOrderInput({
                ...orderInput,
                buyerFullAddress: userLocation.fullAddress,
                latitude: userLocation.lat,
                longitude: userLocation.lng,
            });
        }
    }, [userLocation]);
    const openConfirmDialog = () => {
        console.log('confirm thanh toan')
        setIsOpenConfirmDialog(true)
    }
    return (
            <div className="bg-gray-50">
                <div className="container mx-auto pt-16 pb-24 px-4 ">
                    <h2 className="sr-only">Checkout</h2>
                    <form  className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                        <div>
                            <div className=" border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Thông tin đơn hàng</h2>
                                <div
                                    className="mt-4 grid grid-cols-1 bg-white p-4 rounded gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <Input
                                            isRequired
                                            isReadOnly
                                            type="email"
                                            label="Họ tên"
                                            defaultValue={customer?.name}
                                            labelPlacement={"outside"}
                                            placeholder={'Họ tên'}
                                        />
                                    </div>
                                    {/*<div>*/}
                                    {/*    <label htmlFor="city" className="block text-sm font-medium text-gray-700">*/}
                                    {/*        Tỉnh/Thành phố*/}
                                    {/*    </label>*/}
                                    {/*    <div className="mt-1">*/}
                                    {/*       <CustomDropdown />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    <label htmlFor="region" className="block text-sm font-medium text-gray-700">*/}
                                    {/*        Quận/Huyện*/}
                                    {/*    </label>*/}
                                    {/*    <div className="mt-1">*/}
                                    {/*        <CustomDropdown />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div>*/}
                                    {/*    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">*/}
                                    {/*        Xã/Phường*/}
                                    {/*    </label>*/}
                                    {/*    <div className="mt-1">*/}
                                    {/*        <CustomDropdown />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div>
                                        <Input
                                            isRequired
                                            isReadOnly
                                            type="text"
                                            label="Số điện thoai"
                                            defaultValue={customer?.phone}
                                            labelPlacement={"outside"}
                                            placeholder={'Số điện thoại'}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Textarea
                                            label="Địa chỉ"
                                            onClick={() => {
                                                console.log(' mo popup location')
                                                openLocation()
                                            }
                                            }
                                            isReadOnly
                                            labelPlacement="outside"
                                            defaultValue={userLocation?.fullAddress}
                                            placeholder="Địa chỉ chi tiết : Số nhà, ghi chú thêm ..."
                                        />
                                    </div>
                                    <div className="sm:col-span-2 flex gap-x-2 items-center">
                                        <Checkbox defaultSelected>Lưu thông tin cho lần tiếp theo</Checkbox>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                                    <RadioGroup.Label className="text-lg font-medium text-gray-900">Hình thức thanh toán
                                        - Nhận hàng</RadioGroup.Label>
                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        {deliveryMethods.map((deliveryMethod) => (
                                            <RadioGroup.Option
                                                key={deliveryMethod.id}
                                                value={deliveryMethod}
                                                className={({checked, active}) =>
                                                    classNames(
                                                        checked ? 'border-transparent' : 'border-gray-300',
                                                        active ? 'ring-2 ring-green-500' : '',
                                                        'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                    )
                                                }
                                            >
                                                {({checked, active}) => (
                                                    <>
                                                        <div className="w-full">
                                                            <div className="flex h-full flex-col">
                                                                <RadioGroup.Label as="span"
                                                                                  className="block grow text-sm font-medium text-gray-900">
                                                                    <div
                                                                        className={`flex  justify-between items-center`}>
                                                                        <h4 className={`flex gap-x-2`}> {deliveryMethod.title}
                                                                            {checked ? <CheckCircleIcon
                                                                                className="h-5 w-5 text-green-500"
                                                                                aria-hidden="true"/> : null}
                                                                        </h4>
                                                                        <img
                                                                            className={`w-24 max-h-12 object-cover object-center`}
                                                                            src={deliveryMethod.image} alt=""/>
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
                                                <img src={product?.product?.image} alt={'imageAlt'}
                                                     className="w-20 rounded-md"/>
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
                                                            <TrashIcon className="h-5 w-5" aria-hidden="true"/>
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
                                        <dd className="text-sm font-medium text-gray-900">     {parseNumber(totalAmount, true)}</dd>
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
                                        <dd className="text-base font-medium text-gray-900"> {parseNumber(totalAmount, true)}</dd>
                                    </div>
                                </dl>

                                <div className="border-t text-center border-gray-200 py-6 px-4 sm:px-6">
                                    <button
                                        onClick={(event) => {
                                            openConfirmDialog()
                                            event.preventDefault()
                                        }
                                        }
                                        className="w-1/2 bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none "
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {isOpenConfirmDialog && (
                    <PaymentConfirmationInfoDialog
                        isOpen={isOpenConfirmDialog}
                        name={customer?.name}
                        phone={customer.phone}
                        address={userLocation?.fullAddress}
                        confirmOrder={() => createOrder()}
                        onClose={() => setIsOpenConfirmDialog(false)}/>
                )}
            </div>
    )
}
