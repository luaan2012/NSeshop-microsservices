"use client";

import { addAddress, cartRemoveItem, editAddress, getAddress, getCart, getDetailItem, getQuantityCart, sendOrder, updateItem } from "@/features/actions";
import { useAppDispatch } from "@/features/store/store";
import { Address, Cart, OrderTransaction, Products } from "@/types";
import { ToastEmitter } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";

interface CartContextTypes {
  cart: Cart;
  product: Products;
  loading: boolean;
  showDetail: boolean;
  data: any;
  sendingOrder: boolean;
  address: Address
  setProduct: (product: Products) => void;
  setShowDetail: (val: boolean) => void;
  loadingCart: () => void;
  deleteItem: (guid: string) => void;
  getProduct?(id: string): void;
  addItemCart: () => void;
  sendOrderApi: (order: OrderTransaction) => void;
  addAddressApi: (order: OrderTransaction) => void;
  mapOrder: (order: any) => OrderTransaction;
  getAddressApi: () => void;
}

interface CartContextProvider {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextTypes);

export function CartContextProvider({ children }: CartContextProvider) {
  const { data } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart>({} as Cart);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [sendingOrder, setSendingOrder] = useState<boolean>(false);
  const [product, setProduct] = useState<Products>({} as Products);
  const [address, setAddress] = useState<Address>({} as Address)

  const getProduct = (id: string) => {
    setLoading(true);
    getDetailItem(data?.user.acessToken, id)
      .then((response) => {
        setLoading(false);
        setProduct(response);
        setShowDetail(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const loadingCart = () => {
    setLoading(true);
    getCart(data?.user.acessToken)
      .then((response) => {
        setLoading(false);
        setCart(response);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const deleteItem = (guid: string) => {
    cartRemoveItem(data?.user.acessToken, guid)
      .then(() => {
        const updateditems = cart?.items.filter((item) => item.productId !== guid);
        setCart({ ...cart, items: updateditems });
        dispatch(getQuantityCart(data?.user.acessToken));
      })
      .catch();
  };

  const addItemCart = () => {
    updateItem(data?.user.acessToken, product.productId, product)
      .then(() => {
        ToastEmitter({ title: `O produto ${product.name} foi adicionado ao seu carrinho.`, info: "success", position: "bottom-left" });
        dispatch(getQuantityCart(data?.user.acessToken));
        setShowDetail(false);
        loadingCart();
      })
      .catch((error) => {
        ToastEmitter({ title: error?.errors?.Messages?.join("; ") || "Aconteceu um erro ao tentar adicionar.", info: "error", position: "bottom-left" });
      });
  };

  const addAddressApi = (order: OrderTransaction) => {
    setSendingOrder(true);

    if(Object.keys(address).length === 0)
      addAddress(data?.user.acessToken, order.address)
        .then(() => {
          sendOrderApi(order);
        })
        .catch((error) => {
          ToastEmitter({ title: error?.errors?.Messages?.join("; ") || "Aconteceu um erro ao tentar cadastrar seu endereço.", info: "error", position: "bottom-left" });
          setSendingOrder(false);
        });
    else
      editAddress(data?.user.acessToken, order.address)
      .then(() => {
        sendOrderApi(order);
      })
      .catch((error) => {
        ToastEmitter({ title: error?.errors?.Messages?.join("; ") || "Aconteceu um erro ao tentar atualizar seu endereço.", info: "error", position: "bottom-left" });
        setSendingOrder(false);
      });
  };

  const getAddressApi = () => {
    getAddress(data?.user.acessToken).then(response => {
      setAddress(response)
    })
    .catch()
  }

  const sendOrderApi = (order: OrderTransaction) => {
    setSendingOrder(true);
    sendOrder(data?.user.acessToken, order)
      .then(() => {
        ToastEmitter({ title: "Seu pedido foi recebido, estamos analisando os dados e logo ele será enviado.", info: "success", position: "bottom-left" });
        dispatch(getQuantityCart(data?.user.acessToken));
        setSendingOrder(false);
        router.push("/checkoutSuccess");
      })
      .catch((error) => {
        ToastEmitter({ title: error?.errors?.Messages?.join("; ") || "Aconteceu um erro ao tentar enviar seu pedido.", info: "error", position: "bottom-left" });
        setSendingOrder(false);
      });
  };

  const mapOrder = (orderMap: any): OrderTransaction => {
    const orderUpdate = {
      valueTotal: cart?.valueTotal,
      items: cart?.items,
      discount: cart?.discount,
      voucherUsed: cart?.voucherUsed,
      voucherCode: cart?.voucher?.code,
      address: {
        email: orderMap?.email,
        city: orderMap?.city,
        complement: orderMap?.complement,
        neighborhood: orderMap?.neighborhood,
        number: orderMap?.number,
        publicPlace: orderMap?.publicPlace,
        state: orderMap?.state,
        cep: orderMap?.cep,
        id: address?.id
      },
      cardExpiration: orderMap.cardExpiration,
      cardName: orderMap.cardName,
      cvvCard: orderMap.cvvCard,
      cardNumber: orderMap.cardNumber,
    };
    return orderUpdate as OrderTransaction;
  };

  return (
    <CartContext.Provider
      value={{ address, getAddressApi, sendingOrder, mapOrder, addItemCart, cart, loadingCart, deleteItem, loading, data, showDetail, getProduct, product, setProduct, setShowDetail, sendOrderApi, addAddressApi }}
    >
      {children}
    </CartContext.Provider>
  );
}
