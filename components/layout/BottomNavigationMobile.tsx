import {HomeIcon, Squares2X2Icon} from "@heroicons/react/20/solid";

export default function BottomNavigationMobile(){
    return (

        <div
            className="block lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 ">
            <div className="grid h-full  grid-cols-4 mx-auto font-medium">
                <button type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                   <HomeIcon className={`w-6 h-6 text-gray-500`} />
                    <span
                        className="text-sm text-gray-500  group-hover:text-blue-600 ">Trang chủ</span>
                </button>
                <button type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                   <Squares2X2Icon className={`w-6 h-6 text-gray-500`}/>
                    <span
                        className="text-sm text-gray-500  group-hover:text-blue-600 ">Danh mục</span>
                </button>
                <button type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg
                        className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
                    </svg>
                    <span
                        className="text-sm text-gray-500  group-hover:text-blue-600 ">Settings</span>
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
                        className="text-sm text-gray-500  group-hover:text-blue-600 ">Profile</span>
                </button>
            </div>
        </div>

    )
}
