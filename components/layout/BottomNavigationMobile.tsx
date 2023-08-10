'use client'
import {HomeIcon, Squares2X2Icon} from "@heroicons/react/20/solid";
import {CartIcon} from "@nextui-org/shared-icons";
import {useRouter} from "next/navigation";

export default function BottomNavigationMobile(){
    const router = useRouter()
    return (

        <div
            className="block lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 ">
            <div className="grid h-full  grid-cols-3 mx-auto font-medium">
                <button type="button"
                        onClick={() => router.push('/')}
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                   <HomeIcon className={`w-5 h-5 text-gray-500`} />
                    <span
                        className="text-sm text-gray-500  ">Trang chủ</span>
                </button>
                <button type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                   <Squares2X2Icon className={`w-5 h-5 text-gray-500`}/>
                    <span
                        className="text-sm text-gray-500">Danh mục</span>
                </button>
                <button type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <svg
                        className="w-5 h-5 mb-2 text-gray-500  group-hover:text-blue-600 "
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <span
                        className="text-sm text-gray-500">Tài khoản</span>
                </button>
            </div>
        </div>

    )
}
