import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, ProductService } from "../repo/product.repo";
import { OrderItemToppingInput } from "../repo/product-topping.repo";
import { useScreen } from "../hooks/useScreen";
import { useShopContext } from "./shop-provider";
import router, { useRouter } from "next/router";
import { Order, OrderInput, OrderItem, OrderService } from "../repo/order.repo";
import { ShopTable } from "../repo/shop/shop-table.repo";
import cloneDeep from "lodash/cloneDeep";
import { ProductDetailsDialogDesktop } from "../../components/shared/product-details-desktop/product-details-dialog-desktop";
import { ProductDetailsDialog } from "../../components/shared/product-details/product-details-dialog";
import { ProductDetailsProvider } from "../../components/shared/product-details/product-details-provider";
import { ShopTableForm } from "../../components/shop/staff-order/components/shop-table-form";
import { useToast } from "./toast-provider";

export const CartTableContext = createContext<
  Partial<{
    reOrderInput?: OrderInput;
    clearCartProducts: () => void;
    totalQty: number;
    totalAmount: number;
    cartProducts: CartProduct[];
    addProductToCartTable: (product: Product, qty: number, note: string) => any;
    changeProductQuantity: (productIndex: number, qty: number) => any;
    removeProductFromCart: (productIndex: number) => any;
    reOrder: (items: OrderItem[], reOderInput: OrderInput) => any;
    upsaleProducts: Product[];
    addToCartNoTopping: (product: Product, qty: number) => any;
    updateCartTableProduct: (product: Product, qty: number, note: string, index: number) => any;
    loadCart: () => void;
    editProductIndex: number;
    openShopTable: ShopTable;
    setOpenShopTable: (shopTable: ShopTable) => any,
    orderList: Order[],
    isSubmitting: boolean;
    isSubmittingDraft: boolean;
    generateOrder: () => void,
    chooseOrd: Order,
    setChooseOrd: Function,
  }>
  >({});

export interface CartProduct {
  productId: string;
  product?: Product;
  note?: string;
  qty: number;
  price?: number;
  amount?: number;
  topping?: OrderItemToppingInput[];
}

export function CartTableProvider(props) {
  const screenLg = useScreen("lg");
  const { shopCode, selectedBranch } = useShopContext();
  const [openShopTable, setOpenShopTable] = useState<ShopTable>(undefined);
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [upsaleProducts, setUpsaleProducts] = useState<Product[]>([]);
  const toast = useToast();

  const [isSubmittingDraft, setIsSubmittingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderList, setOrderList] = useState<Order[]>([]);
  const [chooseOrd, setChooseOrd] = useState<Order>(null)

  const [draftOrder, setDraftOrder] = useState<{
    invalid: boolean;
    invalidReason: string;
    order: Order;
  }>({
    invalid: true,
    invalidReason: "",
    order: null,
  });

  useEffect(() => {
    if (chooseOrd) {
      setCartProducts(chooseOrd.items.map(x => {
        return {
          amount: x.amount,
          note: x.note,
          price: x.amount,
          productId: x.productId,
          qty: x.qty,
          product: {
            ...x.product,
            selectedToppings: x.toppings
          }
        } as CartProduct
      }))
    } else  {
      setOrderInput({
        buyerName: "",
        buyerPhone: "",
        pickupMethod: "TABLE",
        shopBranchId: '',
        pickupTime: "",
        buyerFullAddress: "",
        buyerAddressNote: "",
        latitude: 0,
        longitude: 0,
        useRewardPoint: false,
        paymentMethod: "CASH",
        note: "",
        promotionCode: "",
        customerVoucherId: "",
        offerGroupIndex: 0,
      })
      loadCart()
    }
  }, [chooseOrd])

  useEffect(() => {

  }, [selectedBranch])

  let [orderInput, setOrderInput] = useState<OrderInput>({
    buyerName: "",
    buyerPhone: "",
    pickupMethod: "TABLE",
    shopBranchId: '',
    pickupTime: "",
    buyerFullAddress: "",
    buyerAddressNote: "",
    latitude: 0,
    longitude: 0,
    useRewardPoint: false,
    paymentMethod: "CASH",
    note: "",
    promotionCode: "",
    customerVoucherId: "",
    offerGroupIndex: 0,
  });

  const totalQty = useMemo(() => {
    return cartProducts?.reduce((count, item) => (count += item.qty), 0) || 0;
  }, [cartProducts]);
  const totalAmount = useMemo(() => {
    return cartProducts?.reduce((count, item) => (count += item.amount), 0) || 0;
  }, [cartProducts]);

  const [reOrderInput, setReOrderInput] = useState<OrderInput>();

  function loadCart() {
    if (!openShopTable) return;
    const storageCartProducts: CartProduct[] = JSON.parse(
      localStorage.getItem(shopCode + "-cart-table-products-" + openShopTable.code)
    );
    if (storageCartProducts) {
      ProductService.getAll({
        query: {
          limit: 0,
          filter: {
            _id: { __in: storageCartProducts.map((x) => x.productId) },
          },
        },
        cache: false,
      })
        .then((res) => {
          const cartProducts = [];
          if (res.data) {
            storageCartProducts.forEach((cartProduct) => {
              const product = res.data.find((x) => x.id === cartProduct.productId);
              if (product) {
                let isValid = true;
                for (const cartProductTopping of cartProduct.product
                  .selectedToppings as OrderItemToppingInput[]) {
                  const topping = product.toppings.find(
                    (x) => x.id == cartProductTopping.toppingId
                  );
                  if (!topping) {
                    isValid = false;
                    break;
                  } else {
                    const option = topping.options.find(
                      (x) => x.name == cartProductTopping.optionName
                    );
                    if (!option || option.price != cartProductTopping.price) {
                      isValid = false;
                      break;
                    }
                  }
                }
                if (isValid) {
                  const price =
                    product.basePrice +
                    cartProduct.product.selectedToppings.reduce(
                      (total, topping) => total + topping.price,
                      0
                    );
                  cartProducts.push({
                    ...cartProduct,
                    price: price,
                    amount: price * cartProduct.qty,
                    product: {
                      ...product,
                      selectedToppings: cartProduct.product.selectedToppings,
                      toppings: cartProduct.product.toppings,
                    },
                  });
                }
              }
            });
          }
          setCartProducts(cartProducts);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setCartProducts([]);
    }
  }

  useEffect(() => {
    if (openShopTable) {
      OrderService.getAll({query:
          {filter: {tableCode: openShopTable.code, status: {$in: ["PENDING", "CONFIRMED"]}}}
      })
        .then(value =>  {
          setOrderList(value.data)
        })

      setOrderInput({...orderInput, shopBranchId: openShopTable.branchId})
      loadCart();
    }
  }, [openShopTable]);

  useEffect(() => {
    if (openShopTable && !chooseOrd) {
      console.log(openShopTable);
      setOrderInput({...orderInput, shopBranchId: openShopTable.branchId, tableCode: openShopTable.code})
      generateDraftOrder()
    }
  }, [cartProducts])


  const generateOrder = async () => {
    if (draftOrder?.invalidReason) {
      toast.error(draftOrder.invalidReason);
      return;
    }

    if (!cartProducts?.length) {
      toast.error("Chưa có sản phẩm trong giỏ hàng");
      return;
    }
    if (!orderInput.shopBranchId) {
      toast.error("Chưa chọn cửa hàng");
      return;
    }



    try {
      setIsSubmitting(true);
      const res = await OrderService.generateOrder(getOrderInput());
      setOpenShopTable(undefined)
      localStorage.removeItem(shopCode + "-cart-table-products-" + openShopTable?.code);
      toast.success("Đặt hàng thành công")
      // setOrder(res);
    } catch (err) {
      // console.error(err);
      toast.error("Đặt hàng không thành công. " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProductToCartTable = (product: Product, qty: number, note: string): boolean => {
    if (!qty) return false;
    const productIndex = cartProducts.findIndex(
      (x) =>
        x.productId == product.id &&
        JSON.stringify(x.product.selectedToppings) == JSON.stringify(product.selectedToppings)
    );
    if (productIndex >= 0) {
      changeProductQuantity(productIndex, cartProducts[productIndex].qty + qty, note);
    } else {
      const price =
        product.basePrice +
        product.selectedToppings.reduce((total, topping) => total + topping.price, 0);
      cartProducts.push({
        productId: product.id,
        product: product,
        qty,
        price: price,
        amount: price * qty,
        note: note,
      });
    }
    setCartProducts([...cartProducts]);
    return true;
  };

  const addToCartNoTopping = (product: Product, qty: number) => {
    cartProducts.push({
      productId: product.id,
      product: { ...product, selectedToppings: [] },
      qty,
      price: product.basePrice,
      amount: product.basePrice * qty,
    });
    setCartProducts([...cartProducts]);
  };

  const changeProductQuantity = (productIndex: number, qty: number, note?: string) => {
    if (productIndex < 0 || productIndex >= cartProducts.length) return;

    if (qty) {
      cartProducts[productIndex].qty = qty;
      cartProducts[productIndex].amount = cartProducts[productIndex].price * qty;
      if (note) {
        cartProducts[productIndex].note = note;
      }
      setCartProducts([...cartProducts]);
    } else {
      removeProductFromCart(productIndex);
    }
  };

  function updateCartTableProduct(product: Product, qty: number, note: string, index: number) {
    const price =
      product.basePrice +
      product.selectedToppings.reduce((total, topping) => total + topping.price, 0);
    cartProducts[index] = {
      productId: product.id,
      product: product,
      qty: qty,
      price: price,
      amount: price * qty,
      note: note,
    };
    setCartProducts(cloneDeep(cartProducts));
  }

  const removeProductFromCart = (productIndex: number) => {
    if (productIndex >= 0) {
      cartProducts.splice(productIndex, 1);
      setCartProducts([...cartProducts]);
    }
  };


  const getOrderInput = () => {
    const newOrderInput = { ...orderInput };
    newOrderInput.items = [];

    cartProducts?.forEach((cartProduct) => {
      newOrderInput.items.push({
        productId: cartProduct.productId,
        quantity: cartProduct.qty,
        note: cartProduct.note,
        toppings: cartProduct.product.selectedToppings,
      });
    });

    return newOrderInput;
  };

  const generateDraftOrder = () => {
    setIsSubmittingDraft(true);
    OrderService.generateDraftOrder(getOrderInput())
      .then((res) => {
        setDraftOrder(cloneDeep(res));
        console.log(`----DRAFT ORDER----`);
        console.log(res);
      })
      .catch((err) => {}).finally(() => setIsSubmittingDraft(false));
  };


  const reOrder = (items: OrderItem[], reOderInput: OrderInput) => {
    const resCartProducts = [...items];
    setReOrderInput(cloneDeep(reOderInput));
    if (resCartProducts) {
      // lấy danh sách product mua lại
      ProductService.getAll({
        query: {
          limit: 0,
          filter: {
            _id: { __in: resCartProducts.map((x) => x.productId) },
          },
        },
      }).then((res) => {
        let listCartNew = cartProducts;

        resCartProducts.forEach((reCartProduct) => {
          const { __typename, ...product } = res.data.find((x) => x.id == reCartProduct.productId);
          if (product) {
            const index = listCartNew.findIndex((x) => x.productId == product.id);
            if (index !== -1) {
              listCartNew.splice(index, 1);
            }
            let price = product.basePrice;
            if (reCartProduct.toppings) {
              price += reCartProduct.toppings.reduce((total, topping) => total + topping.price, 0);
              product.selectedToppings = reCartProduct.toppings.map(
                (item: OrderItemToppingInput) => {
                  return {
                    toppingId: item.toppingId,
                    toppingName: item.toppingName,
                    optionName: item.optionName,
                    price: item.price,
                  };
                }
              );
            }
            listCartNew = [
              {
                productId: product.id,
                product: product,
                qty: reCartProduct.qty,
                price: price,
                amount: price * reCartProduct.qty,
                note: reCartProduct.note,
                topping: reCartProduct.toppings,
              },
              ...listCartNew,
            ];
          }
        });
        setCartProducts([...listCartNew]);
      });

      router.push(`/${shopCode}/payment`);
    }
  };

  function clearCartProducts() {
    setCartProducts([]);
  }

  useEffect(() => {
    if (!!chooseOrd) return;
    if (cartProducts) {
      localStorage.setItem(shopCode + "-cart-table-products-" + openShopTable?.code, JSON.stringify(cartProducts));
      loadUpsaleProducts();
    } else {
      localStorage.removeItem(shopCode + "-cart-table-products-" + openShopTable?.code);
      setUpsaleProducts([]);
    }
  }, [cartProducts]);

  const loadUpsaleProducts = () => {
    let productIds = [];
    cartProducts.forEach((cartProduct) => {
      if (cartProduct.product?.upsaleProductIds?.length > 0) {
        cartProduct.product.upsaleProductIds.forEach((id) => {
          productIds.push(id);
        });
      }
    });
    productIds = productIds.filter((x) => !cartProducts.find((y) => y.productId == x));
    if (productIds.length) {
      ProductService.getAll({
        query: {
          limit: 0,
          filter: {
            _id: { __in: productIds },
          },
        },
      }).then((res) => setUpsaleProducts(res.data));
    }
  };

  const onClose = () => {
    const url = new URL(location.href);
    url.searchParams.delete("t");
    router.replace(url.toString(), null, { shallow: true });
    setOpenShopTable(undefined);
  }

  return (
    <CartTableContext.Provider
      value={{
        clearCartProducts,
        reOrder,
        reOrderInput,
        totalQty,
        totalAmount,
        cartProducts,
        addProductToCartTable,
        removeProductFromCart,
        changeProductQuantity,
        upsaleProducts,
        addToCartNoTopping,
        loadCart,
        updateCartTableProduct,
        openShopTable,
        setOpenShopTable,
        orderList,
        isSubmitting,
        isSubmittingDraft,
        generateOrder,
        chooseOrd,
        setChooseOrd
      }}
    >
      {props.children}

      <ShopTableForm
        id={openShopTable ? openShopTable.id : openShopTable === null ? null : undefined}
        shopTable={openShopTable}
        isOpen={openShopTable !== undefined}
        onClose={onClose}
      />

      <ProductDetailsProvider>
        {screenLg ? <ProductDetailsDialogDesktop /> : <ProductDetailsDialog />}
      </ProductDetailsProvider>
    </CartTableContext.Provider>
  )
}

export const useCartTable = () => useContext(CartTableContext)
