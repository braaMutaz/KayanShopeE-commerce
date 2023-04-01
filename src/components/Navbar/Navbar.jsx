import React from 'react'
import { Link } from 'react-router-dom'
import image from'../img/pngtree-shopping-mall-logo-png-image_5406131.png'
export default function Navbar({userData , Logout}) {
  return <>
  
  <nav className="navbar navbar-expand-lg bg-body-tertiary  p-3 ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img className=' imga' src={image} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">


    {userData !== null ?       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="Product">Product</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="Cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="Categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="About">About</Link>
        </li>

      </ul> :null }

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          
        </li>
        {userData === null ?     <>
    
    <li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="Login">Login</Link>
</li>
<li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="Register">Register</Link>
</li>
</> :   <li className="nav-item">
  <span onClick={Logout} className=" pointer   nav-link active" aria-current="page" >Logout</span>
</li> }  


      </ul>

    </div>
  </div>
</nav>
  
  </>
}
