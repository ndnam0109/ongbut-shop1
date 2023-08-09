import {OrderPage} from "@/components/order/order-page";


export default function Page(props) {
    return (
            <div className="bg-gray-50">
                <div className="container mx-auto pt-16 pb-24 px-4 ">
                    <div className="px-4 sm:px-0">
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-600 sm:text-3xl">Lịch sử mua hàng</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Kiểm tra trạng thái của các đơn đặt hàng gần đây, quản lý trả hàng và khám phá các sản phẩm tương tự.
                        </p>
                    </div>
                    <OrderPage/>
                </div>
            </div>
    );
}


