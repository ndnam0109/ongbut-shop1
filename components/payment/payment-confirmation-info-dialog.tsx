import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import {usePaymentContext} from "@/lib/providers/payment-provider";
import {Spinner} from "@nextui-org/spinner";

export function PaymentConfirmationInfoDialog(props: any) {
    const { generateOrder, orderInput, setOrderInput, isSubmitting } = usePaymentContext();
    const {name, phone, address, confirmOrder} = props
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const confirm = async () => {
        confirmOrder()
  }
  return (
      <Modal
          isOpen={props.isOpen}
          onOpenChange={() => {
            onOpenChange()
            props.onClose()
          }
          }
          placement="top-center"
          backdrop={"opaque"}
          isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"> Xác nhận thông tin và địa chỉ giao hàng </ModalHeader>
                <ModalBody>

                    <div className="mb-3">
                      <label className="block mb-2 text-sm font-semibold text-gray-900 ">Họ tên:</label>
                      <p className={`text-gray-500`}>{name}</p>
                    </div>
                    <div className="mb-3">
                      <label
                             className="block mb-2 text-sm font-semibold text-gray-900"> Số điện thoại:</label>
                        <p className={`text-gray-500`}>{phone}</p>
                    </div>
                    <div className="mb-3">
                        <label
                            className="block mb-2 text-sm font-semibold text-gray-900">Địa chỉ:</label>
                        <p className={`text-gray-500`}>{address}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {isSubmitting ? (
                        <Button color="primary" variant="flat" isDisabled>
                            Đang đặt hàng
                            <Spinner />
                        </Button>
                    ) : (
                        <>
                            <Button color="danger" variant="flat" onClick={onClose}>
                                Thay đổi
                            </Button>
                            <Button color="primary" onClick={ async () => {
                                await generateOrder()
                            }
                            }>
                                Xác nhận
                            </Button></>
                    )}

                </ModalFooter>
              </>
          )}
        </ModalContent>
      </Modal>
  );
}
