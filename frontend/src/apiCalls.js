import axios from "axios"
const BASE_URL = 'http://localhost:3000'

export const newUser = async(user) => {
try {
    const res = await axios.post(BASE_URL+"/users/newUser",user)
    console.log(res);
    return res.data
   
} catch (error) {
    console.log(error);
}
}

export const existUser=async(user)=>{
    try{
    const res=await axios.post(BASE_URL+'/users/existUser',user)
    console.log(res)
    return res.data
    }catch (error) {
    console.log(error);
    }
    
}