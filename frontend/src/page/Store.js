import { createContext, useReducer } from 'react';



  export function changeState() {

  const curState=localStorage.getItem("userState");
  if(curState===null){
    localStorage.setItem('userState',true)
    return;
  }
  const newLogin=curState===true?false:true
  localStorage.setItem('userState',newLogin);

}


