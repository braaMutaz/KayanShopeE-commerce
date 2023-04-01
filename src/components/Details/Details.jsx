import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

export default function Details() {
  let param = useParams()


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true ,
    autoplaySpeed: 2000 ,
  };


  const [isLoading, setisLoading] = useState(false)
  const [proddetails, setproddetails] = useState(null)
 async function prodid(id)
  {
    setisLoading(true)
   let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
   setproddetails(data.data)
   setisLoading(false)
  }

  useEffect(() => {
    prodid(param.id)
  }, [])
  
  return <>

  
  <div className="row align-items-center w-100 p-1  m-auto  ">
    {isLoading? <div className='text-center '><i className='fas fa-spinner fa-spin fa-3x text-success  '></i></div>: <>
    <div className="col-md-4 ">
       
       <Slider className='text-center' {...settings}>
        {proddetails?.images.map((img)=> <img className='w-100' src={img} alt="" /> )}
       </Slider>

    </div>
    <div className="col-md-8">
     <h2>{proddetails?.title}</h2>
     <p className='text-muted p-2 fs-6'>{proddetails?.description}</p>

     <div className='d-flex justify-content-between px-4 '>
       <span className='text-muted fs-4'>{proddetails?.price} EGP</span>
       <span >
         <i className='fas fa-star star'></i>
         {proddetails?.ratingsAverage}
       </span>
     </div>
     <button className='btn bg-success mt-4 pointer  text-white w-100'>+Add</button>
    </div>
    
    </>}

  </div>
  </>
}
