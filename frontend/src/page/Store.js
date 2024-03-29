import react ,{ createContext, useReducer } from 'react';
import { CreateNewOrder, ReduceQuantity, RemoveOrderItem, DeleteOrder } from "../apiCalls.js";

export function changeState(id) {
  if(id !== ''){
    localStorage.setItem('logged', true);
    localStorage.setItem('userId', id);
  } else {
    localStorage.clear();
  }
}

export  const  MyContext = createContext({'id':0});
export async function addItemToCart(cartItem, target) {
  target.disabled = true;
  if (localStorage.getItem('logged') && localStorage.getItem('userId') !== null && localStorage.getItem('userId') !== '') {
    let userId = localStorage.getItem('userId');
    await CreateNewOrder(userId, cartItem);
  }
  else {
    alert("Please Signup To Create New Purchases");
  }
  target.disabled = false;
}

export async function reduceItemQuantity(cartItem, target) {
  target.disabled = true;
  await ReduceQuantity(localStorage.getItem('userId'), cartItem);
  target.disabled = false;
}

export async function removeItem(cartItem, target) {
  target.disabled = true;
  await RemoveOrderItem(localStorage.getItem('userId'), cartItem);
  target.disabled = false;
}

export async function clearCart(target) {
  target.disabled = true;
  await DeleteOrder(localStorage.getItem('userId'));
  target.disabled = false;
}