import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../CounterContext/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';



export default function Cart() {

let {displayCart , UpdateCart , RemoveCart  , ClearCart , setnumberOfCartItems} =  useContext(CartContext)
  let [cartdisp, setcartdisp] = useState(null)
   
let nav = useNavigate()



async function Remove(productId)
{
  let remove = await RemoveCart(productId)
  console.log(remove);
  setcartdisp(remove)
  setnumberOfCartItems(remove.data.numOfCartItems)
  if(remove.data.numOfCartItems == 0 )
  {
    nav('/')
    toast('Shopping carts are empty')
  }
}
async function Clear()
{
  let remove = await ClearCart()

  setcartdisp(remove)
  setnumberOfCartItems(remove.data.numOfCartItems)
  console.log(remove);
  if(remove.data.message == "success" )
  {
    nav('/')
    toast('Shopping carts are empty')
  }
}
  
  async function update(productId , prodCount)
  {
    let up = await UpdateCart(productId , prodCount )
    console.log(up);
    setcartdisp(up)
  }
async function getData()
{
  let y  = await displayCart()
  console.log(y);
  setcartdisp(y)
  if(y.name=="AxiosError"  )
  {
    nav('/')
    toast('Shopping carts are empty')

  }
 
  console.log(cartdisp);


}
useEffect(() => {
 
  getData()


}, [])


  return <>

  <div id='remove' className=' p-4 my-4 main '>
    <h5>Shop Cart</h5> 
    <h4  className='text-success'>totalCartPrice: {cartdisp?.data.data.totalCartPrice} EGP </h4>
   <button onClick={Clear}  className='btn clearBtn btn-outline-danger'><i className="fa-solid clear text-danger fa-broom"></i> Clear Cart</button>
    {cartdisp?.data.data.products.map((prod , index)=> <div key={index} className='row border-bottom py-2 my-2 align-items-center'>
      <div className='col-md-1'>
        <img className='w-100' src={prod.product.imageCover} alt="" />
      </div>
      <div className='col-md-11 d-flex justify-content-between p-3'>
        <div >
          <h6>{prod.product.title}</h6>
          <h6 className='text-success'>{prod.price} EGP </h6>
          <button onClick={()=>Remove(prod.product._id )} className='btnRemove'><i className="fa-regular h6 text-danger fa-trash-can"></i> Remove</button>
        </div >
        <div  >
        <button onClick={()=> update(prod.product._id  , prod.count+1)} className='btn btn-outline-success'>+1</button>
        <span className=' mx-3'>{prod.count}</span>      
       <button onClick={()=> update(prod.product._id  , prod.count-1)} className='btn btn-outline-danger'>-1</button>
     
        </div >
      </div>
    </div>)}
    <hr />
    <button className='btn mt-3 bg-success '>
      <Link className=' text-white link3' to={'/checkOut'}>
      Check Out
       </Link>
    </button>

  </div> 

  
  </>
}
