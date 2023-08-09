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
    username: string
    password: string
}

export function CustomerLoginDialog(props) {
    const {shop, shopCode, loginCustomerByOb, loginCustomer, customer} = useShopContext();
    const {handleSubmit, control, reset, formState: {errors},} = useForm<IFormInputs>({
        defaultValues: {
            username: '',
            password: ''
        },
    })

    const onSubmitForm = async (data) => {
        const {username, password} = data
        console.log(data)
        try {
            await loginCustomerByOb(username, password);
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
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <ModalBody>

                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            autoFocus
                                            classNames={{
                                                inputWrapper: "bg-default-100  focus:outline-none ",
                                                input: "text-sm focus:outline-none",
                                            }}
                                            endContent={
                                                <MailIcon
                                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                            }
                                            label="Tên đăng nhập"
                                            labelPlacement={"outside"}
                                            placeholder="Nhập tên"
                                            variant="bordered"
                                        />
                                    )}
                                    name="username"
                                />
                                {errors.username && <p className={`text-red-500 text-sm`}>Vui lòng nhập tên đăng nhập.</p>}
                                <div className={`mt-3`}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({field}) => (
                                            <Input
                                                {...field}
                                                endContent={
                                                    <LockClosedIcon
                                                        className="w-5 h-4 text-default-400 pointer-events-none flex-shrink-0"/>
                                                }
                                                label="Mật khẩu"
                                                classNames={{
                                                    inputWrapper: "bg-default-100  focus:outline-none ",
                                                    input: "text-sm mt-2 focus:outline-none",
                                                }}
                                                placeholder="Nhập mật khẩu "
                                                type="password"
                                                variant="bordered"
                                                labelPlacement={"outside"}
                                            />
                                        )}
                                        name="password"
                                    />
                                </div>
                                {errors.password && <p className={`text-red-500 text-sm`}>Vui lòng nhập mật khẩu.</p>}
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
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" type={"submit"}>
                                    Đăng nhập
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
