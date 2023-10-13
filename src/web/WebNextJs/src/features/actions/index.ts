import {
  SIGNUP,
  SIGNIN,
  BANNERS,
  LISTPRODUCTSHIGHLIGHTS,
  LISTPRODUCTS,
  ADDITEM,
  CARTQUANTITY,
  CART,
  REMOVEITEM,
  PRODUCTDETAILS,
  UPDATEITEM,
  SENDORDER,
  GETLASTORDER,
  LISTORDERS,
  GETCEP,
  GETADDRESS,
  ADDADDRESS,
  EDITADDRESS,
} from "@/constants";
import { Address, OrderTransaction, Products } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export async function signUp(data: any) {
  const res = await fetch(SIGNUP || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function signIn(data: any) {
  const res = await fetch(SIGNIN || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function signInTwo(data: any) {
  const res = await fetch(SIGNIN || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();

  return response;
}

export async function highlightAction() {
  const res = await fetch(LISTPRODUCTSHIGHLIGHTS || "");

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function listCatalog(bearer: string | undefined) {
  const res = await fetch(LISTPRODUCTS || "", {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function bannerAction() {
  const res = await fetch(BANNERS || "");

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function addItem(bearer: string | undefined, product: Products) {
  const res = await fetch(ADDITEM || "", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) return Promise.reject(await res.json());

  return Promise.resolve();
}

export async function updateItem(bearer: string | undefined, id: string, product: Products) {
  const res = await fetch(UPDATEITEM(id) || "", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) return Promise.reject(await res.json());

  return Promise.resolve();
}

export async function getCart(bearer: string | undefined) {
  const res = await fetch(CART || "", {
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function getDetailItem(bearer: string | undefined, id: string) {
  const res = await fetch(PRODUCTDETAILS(id) || "", {
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function cartRemoveItem(bearer: string | undefined, guid: string) {
  const res = await fetch(REMOVEITEM(guid), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return Promise.reject(await res.json());

  return Promise.resolve();
}

export async function sendOrder(bearer: string | undefined, order: OrderTransaction) {
  const res = await fetch(SENDORDER, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) return Promise.reject(await res.json());

  return Promise.resolve();
}

export async function getLastOrder(bearer: string | undefined) {
  const res = await fetch(GETLASTORDER, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function listOrders(bearer: string | undefined) {
  const res = await fetch(LISTORDERS, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function getCep(bearer: string | undefined, cep: string) {
  const res = await fetch(GETCEP(cep), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
}

export async function getAddress(bearer: string | undefined) {
  const res = await fetch(GETADDRESS, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
  
}

export async function addAddress(bearer: string | undefined, address: Address) {
  const res = await fetch(ADDADDRESS, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });

  if (!res.ok) return Promise.reject(await res.json());

  return Promise.resolve();
}

export async function editAddress(bearer: string | undefined, address: Address) {
  const res = await fetch(EDITADDRESS, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });

  if (!res.ok) return Promise.reject(await res.json());

  return Promise.resolve();
}

export const getQuantityCart = createAsyncThunk("cart/getQuantity", async (bearer: string | undefined, thunkAPI) => {
  const res = await fetch(CARTQUANTITY || "", {
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) return Promise.reject(response);

  return response;
});
