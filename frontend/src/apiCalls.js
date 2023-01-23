import axios from "axios"
const BASE_URL = 'http://localhost:3000'

export const test = async(user) => {
try {
    const res = await axios.post(BASE_URL+"/users/newUser",user)
    console.log(res);
    return res.data
   
} catch (error) {
    console.log(error);
}
}