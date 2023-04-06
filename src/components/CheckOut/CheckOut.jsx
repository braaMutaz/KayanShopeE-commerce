import {  useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../CounterContext/CartContext';

export default function CheckOut() {
     let {onlinePayment , cartId} = useContext(CartContext)
    async function CheckOut(values)
    {
        let response = await onlinePayment(cartId , values)
        
        if(response?.data?.status === "success")
        {
            window.location.href =response.data.session.url 
          
        }
    console.log(response);
    }

    let formik = useFormik({
        initialValues:{
             details:'',
             phone:'',
             city:''
        },
        onSubmit:CheckOut
    })


  return <>
  <div className="w-50 py-5 mx-auto vh-100">
    <form onSubmit={formik.handleSubmit}>
     <label htmlFor="details">Details:</label>
     <input className='form-control mb-3' id='details' name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />

     <label htmlFor="phone">Phone:</label>
     <input className='form-control mb-3' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" />

     <label htmlFor="city">City:</label>
     <input className='form-control mb-3' id='city' name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" />

     <button type='submit' className='btn btn-outline-success w-100 '>Pay</button>
    </form>
  </div>
  </>
}
