import { createContext, useReducer } from 'react';
import {CreateNewOrder} from "../apiCalls.js"



  export function changeState(id) {
  const curState=localStorage.getItem("userState");
  if(curState===null){
    localStorage.setItem('userState',{'logged':true,'userId':id})
    return;
  }
  const newLogin=curState.logged===true?{'logged':false,'userId':""}:{'logged':true,'userId':id}
  localStorage.setItem('userState',newLogin);

}

export async function handleCartClick(product){
    if(!localStorage.getItem('userState').logged){
      await CreateNewOrder(localStorage.getItem('userState').userId,product);
    }
    else{console.log("u are not login");}
    
}


