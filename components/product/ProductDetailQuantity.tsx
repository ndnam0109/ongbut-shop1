import {PlusIcon, MinusIcon} from "@heroicons/react/20/solid";


interface Props extends ReactProps {
    value: number;
    onChange: (number) => any;
    disabled?: boolean;
    maxValue?: number;
}
export default function ProductDetailQuantity({
                                                  value,
                                                  onChange,
                                                  disabled,
                                                  maxValue,
                                                  className = "",
                                              }: Props) {

    const handleClick = (offset) => {
        if (value + offset >= 1) {
            if (maxValue && value + offset > maxValue) {
                // toast.info(`Sản phẩm này được chọn tối đa ${maxValue} sản phẩm`);
            } else {
                onChange(value + offset);
            }
        }
    };

    return (
        <div
            className={`  w-fit flex items-center border rounded font-semibold ${className}`}
        >
            <i
                className={` border-r-2 h-full bg-gray-100  text-gray-500 cursor-pointer font-semibold  ${
                    value == 1 ? "opacity-50 pointer-events-none" : ""
                } ${disabled ? "pointer-events-none opacity-40" : ""}`}
                onClick={() => handleClick(-1)}
            >
                <MinusIcon className={`w-8 h-8`} />
            </i>
            <div className={`text-lg font-semibold px-3 text-gray-700`}>
                {value}
            </div>
            <i
                className={`border-l-2 h-full bg-gray-100  cursor-pointer font-semibold  ${
                    disabled ? "pointer-events-none opacity-40 text-gray-500" : "text-primary"
                }`}
                onClick={() => handleClick(1)}
            >
                <PlusIcon className={`w-8 h-8`}/>
            </i>
        </div>
    );
}
