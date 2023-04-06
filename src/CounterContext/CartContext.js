import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let CartContext = createContext(0)


 export default function CartContextProvider (props)
 {
        

    const [cartId, setcartId] = useState(0)
    const [numberOfCartItems, setnumberOfCartItems] = useState(0)

    async function getCard()
    {
            let response = await displayCart()
            console.log(response);
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



  return <CartContext.Provider value={{ getCard , setnumberOfCartItems , addToCart , cartId ,numberOfCartItems, displayCart , UpdateCart , RemoveCart , ClearCart , onlinePayment}}>
      {props.children}
  </CartContext.Provider>
 }