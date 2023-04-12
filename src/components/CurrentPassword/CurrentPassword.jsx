import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../CounterContext/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
 
export default function CurrentPassword({setuserData}) {
    
   let nav = useNavigate()
    let {currentPasswordContext , currentPasswordErr , setcurrentPasswordErr , setisLoading , isLoading} = useContext(CartContext)

      const [message, setmessage] = useState(null)
   async function currentPass(values)
    {
        console.log(values);
         let response = await currentPasswordContext(values)
         console.log(response);
         if(response.data.message == "success")
         {
            setmessage(response.data.message)
            setcurrentPasswordErr(null)
            localStorage.removeItem('userToken')
            setuserData(null)
            nav('/Login')
            toast('Success')
            setisLoading(false)
         }
    }
   let formik = useFormik({
    initialValues:{
        currentPassword:'',
        password:'',
        rePassword:''
    },
    onSubmit:currentPass
   })
  return <>
    <div className='vh-100'>
      <div className="w-75 mx-auto">
        {currentPasswordErr? <div><h4>{currentPasswordErr}</h4></div> :null }
        {message? <div><h4>{message}</h4></div> :null }
        <form  onSubmit={formik.handleSubmit}>
            <label htmlFor="currentPassword">Current Password:</label>
            <input className='form-control' value={formik.values.currentPassword} name='currentPassword' id='currentPassword' onChange={formik.handleChange} type="tel" />

            <label htmlFor="password">Password:</label>
            <input className='form-control' value={formik.values.password} name='password' id='password' onChange={formik.handleChange} type="password" />

            <label htmlFor="rePassword">rePassword:</label>
            <input className='form-control' value={formik.values.rePassword} name='rePassword' id='rePassword' onChange={formik.handleChange} type="password" />
            {isLoading == true ? <button className='btn btn-success'><i className='fas fa-spin fa-spinner'></i></button> : <button type='submit' className='  mt-3 btn btn-success'>Submit</button>}
            
        </form>
      </div>
    </div>
    </> 
}
