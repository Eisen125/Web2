import { createContext, useReducer } from 'react';
import {CreateNewOrder} from "../apiCalls.js"



export function changeState(id) {
    
  if(id !== ''){
    localStorage.setItem('logged', true);
    localStorage.setItem('userId', id);
  } else {
    localStorage.clear();
  }
}

export async function handleCartClick(cartItem){
    if(!localStorage.getItem('logged') && localStorage.getItem('userId') !== null && localStorage.getItem('userId') !== ''){
      let userId = localStorage.getItem('userId');
      await CreateNewOrder(userId,cartItem);
    }
    else {
      console.log("u are not logged in");
    }
    
}


