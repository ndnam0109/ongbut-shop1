import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link
} from "@nextui-org/react";
import {MailIcon} from "@nextui-org/shared-icons";
import {LockClosedIcon} from "@heroicons/react/20/solid";
import {useShopContext} from "@/lib/providers/shop-provider";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";

interface IFormInputs {
    phone: string
    name: string
}

export function CustomerLoginDialog(props) {
    const {shop, shopCode, loginCustomerOTP, loginCustomer, customer} = useShopContext();
    const {handleSubmit, control, reset, formState: {errors},} = useForm<IFormInputs>({
        defaultValues: {
            phone: '',
            name: ''
        },
    })

    const onSubmitForm = async () => {
        try {

                await loginCustomer('0347800555', 'Tung');
            props.onClose();
        } catch (error) {
            toast.error("Đăng nhập thất bại. " + error.message);
        }
    };
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <Modal
            isOpen={props.isOpen}
            onOpenChange={() => {
                onOpenChange()
                props.onClose()
            }
            }
            placement="top-center"
            backdrop={"blur"}
            isDismissable={false}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Đăng nhập</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmitForm)}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <Input
                                            autoFocus
                                            classNames={{
                                                inputWrapper: "bg-default-100  focus:outline-none ",
                                                input: "text-sm focus:outline-none",
                                            }}
                                            endContent={
                                                <MailIcon
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                            }
                                            label="Email"
                                            labelPlacement={"outside"}
                                            placeholder="Enter your email"
                                            variant="bordered"
                                        />
                                    )}
                                    name="name"
                                />
                                {errors.name && <p>This is required.</p>}
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <Input
                                            endContent={
                                                <LockClosedIcon
                                                    className="w-5 h-4 text-default-400 pointer-events-none flex-shrink-0"/>
                                            }
                                            label="Password"
                                            classNames={{
                                                inputWrapper: "bg-default-100  focus:outline-none ",
                                                input: "text-sm focus:outline-none",
                                            }}
                                            placeholder="Enter your password"
                                            type="password"
                                            variant="bordered"
                                            labelPlacement={"outside"}
                                        />
                                    )}
                                    name="phone"
                                />
                                {errors.phone && <p>This is required.</p>}
                                <div className="flex py-2 px-1 justify-between">
                                    <Checkbox
                                        classNames={{
                                            label: "text-small",
                                        }}
                                    >
                                        Ghi nhớ
                                    </Checkbox>
                                    <Link color="primary" href="#" size="sm">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onClick={onClose}>
                                Đóng
                            </Button>
                            <Button color="primary" onPress={() => {
                                console.log(111111111)
                                console.log(errors)
                               onSubmitForm()
                            }
                            }>
                                Đăng nhập
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
