import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let CartContext = createContext(0)


 export default function CartContextProvider (props)
 {
        

    const [cartId, setcartId] = useState(0)
    const [numberOfCartItems, setnumberOfCartItems] = useState(0)
    const [ErrEmail, setErrEmail] = useState(null)
    const [ErrCode, setErrCode] = useState(null)
    const [EnterPass, setEnterPass] = useState(null)
    const [currentPasswordErr, setcurrentPasswordErr] = useState(null)
    const [updateUserContext, setupdateUserContext] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    async function getCard()
    {
            let response = await displayCart()
           
            if(response?.data?.status === 'success')
            {
                setnumberOfCartItems(response.data.numOfCartItems)
                setcartId(response.data.data._id)
               
            }
           
    }


    useEffect(()=>{
        getCard()
    } , [])

    let userToken = localStorage.getItem('userToken')
    let headers = {token:userToken}
function addToCart(productId)
{
 return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, 
{productId: productId } ,
{headers: headers})
.then((response)=> response)
.catch((err)=> err )
}

function displayCart()
{
 return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{headers: headers})
.then((response)=> response)
.catch((err)=> err )
}
function UpdateCart(productId , prodCount)
{
 return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{count:prodCount},{headers: headers})
.then((response)=> response)
.catch((err)=> err )
}
function RemoveCart(productId )
{
 return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{headers: headers})
.then((response)=> response)
.catch((err)=> err )
}
function ClearCart()
{
 return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,{headers: headers})
.then((response)=> response)
.catch((err)=> err )
}
function onlinePayment(cartId , shippingAddress)
{
 return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
 {shippingAddress:shippingAddress},
 {headers: headers})
.then((response)=> response)
.catch((err)=> err )
}

function SendEmailContext(values)
{
    setisLoading(true)
 return axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`, values)
.then((response)=> response)
.catch((err)=> {
    console.log(err);
    setErrEmail(err.response.data.message)
    setisLoading(false)
} )
}

function VerifyCodeContext(values)
{
    setisLoading(true)
 return axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`, values)
.then((response)=> response)
.catch((err)=> {
    console.log(err);
    setErrCode(err.response.data.message)
    setisLoading(false)
} )
}

function EnterPasswordContext(values)
{
    setisLoading(true)
 return axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`, values)
.then((response)=> response)
.catch((err)=> {

     console.log(err.response.data.message);
     setEnterPass(err.response.data.message)
     setisLoading(false)
} )
}



function currentPasswordContext(values)
{
    setisLoading(true)
 return axios.put(`https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword` , 
 values,
 {headers:headers}
 )
.then((response)=> response)
.catch((err)=> {
    console.log(err);
    setcurrentPasswordErr(err.response.data.errors.msg)
    setisLoading(false)
} )
}

function UpdateData(values)
{

    setisLoading(true)
 return axios.put(`https://route-ecommerce.onrender.com/api/v1/users/updateMe` , 
 values,
 {headers:headers}
 )
.then((response)=> response)
.catch((err)=> {
  console.log(err);
  setupdateUserContext(err.response.data.errors.msg)
  console.log(err.response.data.errors.msg);
  setisLoading(false)
} )
}




  return <CartContext.Provider value={{ isLoading ,  setisLoading , setupdateUserContext , updateUserContext ,  UpdateData , setcurrentPasswordErr ,  currentPasswordErr , currentPasswordContext ,  EnterPass ,  ErrCode , setErrEmail , ErrEmail , EnterPasswordContext ,VerifyCodeContext  , SendEmailContext , getCard , setnumberOfCartItems , addToCart , cartId ,numberOfCartItems, displayCart , UpdateCart , RemoveCart , ClearCart , onlinePayment}}>
      {props.children}
  </CartContext.Provider>
 }