import {useEffect} from "react"
import Link from "next/link";
import {Accordion, AccordionItem} from "@nextui-org/react";

export function CategoryList(props) {
    const {list} = props
    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal  text-medium",
        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
    };
    return (
        <div
            className=" text-[15px] text-gray-900 bg-white mt-2 "
        >
            {list.map((x, index) => (
                <div key={index}>
                    {x.categories.length > 0 ? (
                        <Accordion  showDivider={false}
                                    className="p-2 flex flex-col gap-1  text-[12px] text-gray-900  w-full max-w-[300px]"
                                
                                    itemClasses={itemClasses}>
                            <AccordionItem startContent={  <img className={`w-8 h-8 object-contain`}
                                                                src={x.image}
                                                                alt=""/>} hideIndicator={true} key="1" aria-label="Accordion 1" title={x.name}>
                                {x.categories.map((child, index) => (
                                       <div key={child.name} >
                                           <Link href={`/danh-muc/${x.id}`}>
                                               <li className="w-full py-1 px-1 rounded-xl flex gap-x-2 items-center hover:bg-green-500 hover:text-white">
                                                   <div className={`rounded-xl p-1 bg-white`}>
                                                       <img className={`w-8 h-8 object-contain`}
                                                            src={child.image}
                                                            alt=""/>
                                                   </div>
                                                   <span>{child.name}</span>
                                               </li>
                                           </Link>
                                       </div>
                                ))}
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <Link href={`/danh-muc/${x.id}`}>
                            <li className="w-full py-1 px-1 rounded-xl flex gap-x-2 items-center hover:bg-green-500 hover:text-white">
                                <div className={`rounded-xl p-1 bg-white`}>
                                    <img className={`w-8 h-8 object-contain`}
                                         src={x.image}
                                         alt=""/>
                                </div>
                                <span>{x.name}</span>
                            </li>
                        </Link>
                    )}
                </div>
            ))}
        </div>
    )
}
