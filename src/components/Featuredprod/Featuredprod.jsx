import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../CounterContext/CartContext'
import { toast } from 'react-hot-toast'

export default function Featuredprod() {
  


  let { getCard ,  addToCart , setnumberOfCartItems} = useContext(CartContext)


    async function addToCartid(productId)
    {
      let response = await addToCart(productId)
      if(response.data.status == 'success')
      {
        setnumberOfCartItems(response.data.numOfCartItems)
        toast.success(response.data.message);
        console.log(response ,response.data.message );
      }
      else
      {
        toast.error(response.data.message);
      }

      
    }

    const [apidata, setapidata] = useState([])
    const [isLoading, setisLoading] = useState(false)
   async function getapi() {
    setisLoading(true)
      let  {data} = await axios('https://route-ecommerce.onrender.com/api/v1/products')
             
              setapidata(data.data)
              console.log(data.data);
              setisLoading(false)
    }

    useEffect(()=>{
        getapi()
        getCard()
    },[])
  return <>
    

   <div  className="row g-3">
    {isLoading?<div className='bg-dark d-flex justify-content-center align-items-center  spin w-100 vh-100  '><div><i className='fas  fa-spinner text-white fa-spin fa-3x'></i></div></div>:<>
    {apidata.map((categ )=> 


<div key={categ._id}   className="col-md-3 linkss p-4"  >
<div  >
<Link className='link2'  to={`/Details/${categ._id}`}>
 <img   className='w-100' src={categ.imageCover} alt="" />
 <span className='text-success fw-bold'>{categ.category.name}</span>
 <h3 className='h6 fw-bolder'>{categ.title.split(' ').slice(0,2).join(' ')}</h3>
 <div className='d-flex justify-content-between '>
   <span className='text-muted'>{categ.price} EGP</span>
   <span >
     <i className='fas fa-star star'></i>
     {categ.ratingsAverage}
   </span>
 </div>

 </Link>
 <button onClick={()=>addToCartid(categ._id)} className='btn bg-success mt-4 pointer addbtn text-white w-100'>+ Add</button>
 </div>
</div>



)}
    
    </>}


   </div>
  </>
}
