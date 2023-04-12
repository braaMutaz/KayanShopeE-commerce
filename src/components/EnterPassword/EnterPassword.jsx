import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../../CounterContext/CartContext';
import { useNavigate } from 'react-router-dom';

export default function EnterPassword() {
  
          let {EnterPasswordContext , EnterPass , setisLoading , isLoading} = useContext(CartContext)
         const [Success, setSuccess] = useState(null)
  let nav = useNavigate()
    async function enterCode(values)
     {
       let response = await EnterPasswordContext(values)
       console.log(response);
       if(response.status == 200)
       {
        setSuccess('Success')
        nav('/Login')
        setisLoading(false)
       }
     }



     let validation = Yup.object({
        newPassword:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with uppercase ... '), 
     })

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
         validationSchema:validation
        ,
        onSubmit:enterCode
    })
    return <>
        <div className='vh-100'>

            <div className="w-75 mx-auto">
                   
                  {EnterPass? <div><h3>{EnterPass}</h3></div>:null }
                <form onSubmit={formik.handleSubmit} >
                    <label htmlFor="email">Email:</label>
                    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />

                    <label htmlFor="newPassword">New Password:</label>
                    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.newPassword} type="password" name='newPassword' id='newPassword' />
                    {formik.errors.newPassword && formik.touched.newPassword ?  <div className='alert alert-danger'>{formik.errors.newPassword}</div> :null }


                    {isLoading == true ? <button className='btn btn-success'><i className='fas fa-spin fa-spinner'></i></button> :    <button disabled={!(formik.isValid && formik.dirty)  } type='submit' className='mt-3 btn btn-success'>Send</button>}
                 
                </form>
            </div>
        </div>
    </>
}
