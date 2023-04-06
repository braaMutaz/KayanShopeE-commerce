import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Login({saveUserData}) {

let navi = useNavigate() ;

  const [massageError, setmassageError] = useState('')
const [isloading, setisloading] = useState(false)
 async function handleLogin(values)
  {
    setisloading(true)
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin` , values).catch((err)=>{
      
    setisloading(false)  
    
    setmassageError(` ${err.response.data.message}`)
    })
    
    if(data.message === 'success')
    {
      localStorage.setItem('userToken' , data.token)
      saveUserData()
       console.log(data);
      setisloading(false)
       navi('/')

    }
  }

    


  let validation = Yup.object({
 
    email:Yup.string().required('email is required').email('email is invalid'), 
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with uppercase ... '), 

  })
  

  let formik = useFormik({
    initialValues:{
 
      email:'',
      password:'',
  

    },
     validationSchema:validation
    ,
    onSubmit:handleLogin
  })
  return <>
    <div className='w-75 mx-auto py-4 vh-100'>
    <h3>LoginNow:</h3>
       
       {massageError? <div className="alert-danger alert">{massageError}</div> :null } 
       

        <form  onSubmit={formik.handleSubmit}>

        


         <label htmlFor="email">Email:</label>
         <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
         {formik.errors.email && formik.touched.email ?  <div className='alert alert-danger'>{formik.errors.email}</div> :null }

         <label htmlFor="password">password:</label>
         <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
         {formik.errors.password && formik.touched.password ?  <div className='alert alert-danger'>{formik.errors.password}</div> :null }


          
          <br /> 
          {isloading?<button  type='button' className='btn bg-success text-white'><i className='fas fa-spinner fa-spin '></i></button>: 
          <button disabled={!(formik.isValid && formik.dirty)  } type='submit' className='btn bg-success text-white'>Login</button>
          }

        
        </form>

    </div>
    </>
}
