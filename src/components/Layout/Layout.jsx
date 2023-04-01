import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData , setuserData}) {
  let navigate = useNavigate()
  function Logout()
  {
   localStorage.removeItem('userToken')
   setuserData(null)
   navigate('/Login')
  }
  
  return <>




  <Navbar Logout={Logout} userData={userData}/>
 
 <Outlet></Outlet>
  
  <Footer/>
  </>
}
