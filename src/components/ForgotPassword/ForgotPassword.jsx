import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../CounterContext/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    let nav = useNavigate()

        let {SendEmailContext , VerifyCodeContext , ErrEmail , setErrEmail , ErrCode ,setisLoading , isLoading } = useContext(CartContext)
        const [Msg, setMsg] = useState(null)
        const [Codes, setCodes] = useState(null)
     async function SendEmail(values)
      {
          let response = await SendEmailContext(values)
        //   setMsg(response?.response.data.message)
          if(response.data.statusMsg == "success")
          {
            setMsg(response.data.message)
            setCodes(response.data.message)
            setErrEmail(null)
            setisLoading(false)
          }
          
        
      }
    let formik = useFormik({
        initialValues:{
            email:''
        },
        onSubmit:SendEmail
    })


  //////////////////////////////////////////////////////////////////////////////////////

   async function VerifyCode(values)
    {
        console.log(values);
       let response = await VerifyCodeContext(values)
       console.log(response);
       if(response.data.status == "Success" )
       {
        nav('/EnterPassword')
        setisLoading(false)
       }
    }

  let formikCode = useFormik({
    initialValues:{
        resetCode:''
    },
    onSubmit:VerifyCode
})

  return <>
  
  
     <div className='vh-100'>
        
        <div className="w-75 mx-auto">
            
            {Msg? <div><h4>{Msg}</h4></div> :null }
            {ErrEmail? <div ><h4>{ErrEmail}</h4></div> :null }

            <form onSubmit={formik.handleSubmit} >
            <label htmlFor="email">Email:</label>
         <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
                
         {isLoading == true ? <button className='btn btn-success'><i className='fas fa-spin fa-spinner'></i></button> : <button type='submit' className='mt-3 btn btn-success'>Send</button>}  

                
            </form>
             
             {ErrCode? <div><h4>{ErrCode}</h4></div> :null }

            {Codes?             <form onSubmit={formikCode.handleSubmit} >
            <label htmlFor="resetCode">Enter Code:</label>
         <input onBlur={formikCode.handleBlur} className='form-control mb-2' onChange={formikCode.handleChange} value={formikCode.values.resetCode} type="tel" name='resetCode' id='resetCode' />
                
             {isLoading == true ? <button className='btn btn-success'><i className='fas fa-spin fa-spinner'></i></button> : <button type='submit' className='mt-3 btn btn-success'>Send</button>}   
            </form> :null }
             


        </div>
     </div>
  </>
}
