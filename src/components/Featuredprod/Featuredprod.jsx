import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Featuredprod() {
  

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
    },[])
  return <>
    

   <div  className="row g-3">
    {isLoading?<div><i className='fas fa-spinner fa-spin fa-3x'></i></div>:<>
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
 <button className='btn bg-success mt-4 pointer addbtn text-white w-100'>+ Add</button>
 </Link>
 </div>
</div>



)}
    
    </>}


   </div>
  </>
}
