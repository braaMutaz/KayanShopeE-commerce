import logo from './logo.svg';
import './App.css';
import  { Toaster } from 'react-hot-toast';
import { createBrowserRouter,  Navigate,  RouterProvider   } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Product from './components/product/product';
import Details from './components/Details/Details';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Categories from './components/Categories/Categories';
import About from './components/About/About';
import CounterContextProvider from './CounterContext/CounterContext';
import CartContextProvider from './CounterContext/CartContext';
import CheckOut from './components/CheckOut/CheckOut';




function App() {


const [userData, setuserData] = useState(null)


useEffect(() => {
  
  if(localStorage.getItem('userToken')!== null)
  {
    saveUserData()
  }
 
}, [])

function saveUserData()
{
 let encodedToken = localStorage.getItem('userToken')
 let decodedToken = jwtDecode(encodedToken)
 setuserData(decodedToken )
}


  let x = createBrowserRouter([
    {path:'/' , element:<Layout setuserData={setuserData}  userData={userData} /> , children:[
    {index:true ,element:<Home/>},
    {path:'Register' ,element:<Register/>},
    {path:'Cart' ,element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'Login' ,element:<Login saveUserData={saveUserData} />},
    {path:'Product' ,element: <ProtectedRoute><Product/></ProtectedRoute> },
    {path:'Details/:id' ,element: <ProtectedRoute><Details/></ProtectedRoute>},
    {path:'Categories' ,element:  <ProtectedRoute><Categories/></ProtectedRoute> },
    {path:'About' ,element:<ProtectedRoute><About/></ProtectedRoute>},
    {path:'CheckOut' ,element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'*' ,element:<Login saveUserData={saveUserData} />},
    ]}
    ])


  return <CartContextProvider>
   <CounterContextProvider>
   <Toaster/>
    <RouterProvider router={x}></RouterProvider>
   
  </CounterContextProvider>

  </CartContextProvider>

  
  


  
}

export default App;
