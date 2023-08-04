import { useEffect } from "react";
import { useShopContext} from "@/lib/providers/shop-provider";
import { DatePicker, Input } from "../../../shared/utilities/form";
import { usePaymentContext} from "@/lib/providers/payment-provider";

export function PaymentTimeSelector() {
  const { selectedBranch } = useShopContext();
  const { orderInput, setOrderInput } = usePaymentContext();

  useEffect(() => {
    if (!orderInput.pickupTime) {
      const date = new Date();
      date.setMinutes(0);
      date.setHours(date.getHours() + 1);
      setOrderInput({ ...orderInput, pickupTime: date.toISOString() });
    }
  }, [orderInput.pickupTime]);

  return (





    <>
      <div className="flex px-2 mt-2">
        <div className="mr-3 w-44">
          <DatePicker
            clearable={false}
            value={orderInput.pickupTime}
            onChange={(val) => {
              const date = val as Date;
              const newDate = new Date(orderInput.pickupTime);
              if (date) {
                newDate.setDate(date.getDate());
                newDate.setMonth(date.getMonth());
                newDate.setFullYear(date.getFullYear());
              }
              setOrderInput({ ...orderInput, pickupTime: newDate.toISOString() });
            }}
          />
        </div>
        <div className="w-32">
          <DatePicker
            clearable={false}
            timeOnly
            timeIntervals={15}
            value={orderInput.pickupTime}
            onChange={(val) => {
              const date = val as Date;
              const newDate = new Date(orderInput.pickupTime);
              if (date) {
                newDate.setHours(date.getHours());
                newDate.setMinutes(date.getMinutes());
                newDate.setSeconds(0);
              }
              setOrderInput({ ...orderInput, pickupTime: newDate.toISOString() });
            }}
          />
        </div>
      </div>
    </>
  );
}
