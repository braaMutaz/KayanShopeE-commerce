import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../CounterContext/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function UpdateUserData({setuserData }) {

    let nav = useNavigate()
         let {UpdateData , updateUserContext , setupdateUserContext , setisLoading , isLoading} = useContext(CartContext)
       const [message, setmessage] = useState(null)
    async  function updateLoggedUser(values)
      {
          let response = await UpdateData(values)
          console.log(response);
          if(response.data.message == "success")
          {
            setmessage(response.data.message)
            localStorage.removeItem('userToken')
            setuserData(null)
            nav('/Login')
            toast('Success')
            setupdateUserContext(null)
            setisLoading(false)
          }
      }
     
    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:''
        }
        ,
        onSubmit:updateLoggedUser
    })
      
  return <>
    <div className='vh-100'>

    <div className="w-75 mx-auto">
           {message? <div><h4>{message}</h4></div> :null }
           {updateUserContext? <div><h4>{updateUserContext}</h4></div> :null }
        <form  onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input className='form-control' value={formik.values.name} name='name' id='name' onChange={formik.handleChange} type="text" />

            <label htmlFor="email">Email:</label>
            <input className='form-control' value={formik.values.email} name='email' id='email' onChange={formik.handleChange} type="email" />

            <label htmlFor="phone">Phone:</label>
            <input className='form-control' value={formik.values.phone} name='phone' id='phone' onChange={formik.handleChange} type="tel" />
            {isLoading == true ? <button className='btn btn-success'><i className='fas fa-spin fa-spinner'></i></button> : <button type='submit' className='  mt-3 btn btn-success'>Submit</button>}
            
        </form>
      </div>

    </div>
    </>
}
