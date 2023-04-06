import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {



    const [isLoading, setisLoading] = useState(false)
    const [categ, setcateg] = useState([])

   async function getapi() {
    setisLoading(true)
      let  {data} = await axios('https://route-ecommerce.onrender.com/api/v1/categories')
             
      setcateg(data.data)
              console.log(data.data);
              setisLoading(false)
    }

    useEffect(()=>{
        getapi()
    },[])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true ,
        autoplaySpeed: 2000 ,
      };


  return <>
    {isLoading?null:<>
    
    <Slider {...settings}>
      {categ.map((catego)=>
      <div key={catego._id} className='p-2 categor'>
        <img className='w-100' height={200} src={catego.image} alt="" />
        <h2 className='h6 pt-2'>{catego.name}</h2>
      </div>
      )}
        </Slider>
    
    </>}

  </>
}
