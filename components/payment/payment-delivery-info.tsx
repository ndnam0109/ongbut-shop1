import React from "react";
import {RadioGroup, Radio, cn} from "@nextui-org/react";
import {PICKUP_METHODS} from "@/lib/repo/order.repo";

export const CustomRadio = (props) => {
    const {children, ...otherProps} = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between ",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
};

export default function PaymentDeliveryInfo() {
    return (
        <RadioGroup  label="PHƯƠNG THỨC VẬN CHUYỂN - THANH TOÁN"  orientation={"horizontal"} defaultValue={'DELIVERY'}>
            {PICKUP_METHODS.map((x) => (
                <CustomRadio  key={x.value}  value={x.value}>
                    {x.label}
                </CustomRadio>
            ))}
        </RadioGroup>
    );
}
