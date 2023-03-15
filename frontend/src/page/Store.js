import { createContext, useReducer } from 'react';
import {CreateNewOrder} from "../apiCalls.js"



  export function changeState() {
  const curState=localStorage.getItem("userState");
  if(curState===null){
    localStorage.setItem('userState',true)
    return;
  }
  const newLogin=curState===true?false:true
  localStorage.setItem('userState',newLogin);

}

export async function handleCartClick(e){
    if(localStorage.getItem('userState')){
      let cartItem=await CreateNewOrder();
      
    }
}


