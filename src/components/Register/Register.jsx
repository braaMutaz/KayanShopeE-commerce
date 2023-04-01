import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {

let navi = useNavigate() ;

  const [massageError, setmassageError] = useState('')
const [isloading, setisloading] = useState(false)
 async function handleRegister(values)
  {
    setisloading(true)
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup` , values).catch((err)=>{
      
    setisloading(false)  
    
    setmassageError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
    })
    
    if(data.message === 'success')
    {
       console.log(data);
      setisloading(false)
       navi('/Login')

    }
  }

    


  let validation = Yup.object({
    name:Yup.string().required( 'name is required').min(3 , 'name minlength is 3').max(10 , 'name maxlength is 3'),
    email:Yup.string().required('email is required').email('email is invalid'), 
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with uppercase ... '), 
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')] , 'password and rePassword doesnt match'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'phone must be valid ... '), 
  })
  

  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:'',

    },
     validationSchema:validation
    ,
    onSubmit:handleRegister
  })
  return <>
    <div className='w-75 mx-auto py-4'>
    <h3>registerNow:</h3>
       
       {massageError? <div className="alert-danger alert">{massageError}</div> :null } 
       

        <form  onSubmit={formik.handleSubmit}>
         <label htmlFor="name">Name:</label>
         <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name' />
          {formik.errors.name && formik.touched.name ?  <div className='alert alert-danger'>{formik.errors.name}</div> :null }
        


         <label htmlFor="email">Email:</label>
         <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
         {formik.errors.email && formik.touched.email ?  <div className='alert alert-danger'>{formik.errors.email}</div> :null }

         <label htmlFor="password">password:</label>
         <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
         {formik.errors.password && formik.touched.password ?  <div className='alert alert-danger'>{formik.errors.password}</div> :null }

         <label htmlFor="rePassword">rePassword:</label>
         <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' />
         {formik.errors.rePassword && formik.touched.rePassword ?  <div className='alert alert-danger'>{formik.errors.rePassword}</div> :null }
       
         <label htmlFor="phone">phone:</label>
         <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
         {formik.errors.phone && formik.touched.phone ?  <div className='alert alert-danger'>{formik.errors.phone}</div> :null }
          
          <br /> 
          {isloading?<button  type='button' className='btn bg-success text-white'><i className='fas fa-spinner fa-spin '></i></button>: 
          <button disabled={!(formik.isValid && formik.dirty)  } type='submit' className='btn bg-success text-white'>Register</button>
          }

        
        </form>

    </div>
    </>
}
