import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../CounterContext/CartContext'

export default function Wishlist() {

  let {displaywishlist ,Removewish} = useContext(CartContext)
  const [response, setresponse] = useState(null)

  async function dispwish()
  {
    let response = await displaywishlist()
    console.log(response);
    setresponse(response)
  }

  

 async  function remove(productId)
  {
    let response = await Removewish(productId)
console.log(response);
    dispwish()
  }

  useEffect(() => {
    dispwish()
  }, [])
  
     
  return <>
   
   <div className=' '>
      <div className="container">
         <h2>Wishlist</h2>
         <hr />
      {response?.data?.data?.map((wish)=> <div className='row'>

       <div className='col-md-2'><img className='w-100' src={wish.imageCover} alt="" /></div>
       <div className="col-md-10">
        <h3>Title:{wish.title.split(' ').splice(0,2).join(' ')}</h3>
        <h3>price:{wish.price}</h3>
     

        <h4  >  ratingsAverage:  {wish.ratingsAverage}<i className='fas fa-star star'></i></h4>

        <h5>description : {wish.description}</h5>
    

        <button onClick={()=> remove(wish.id)}  className='btnRemove '><i className="fa-regular fa-1x h6 text-danger fa-trash-can"></i> Remove</button>
       </div>
         <hr />
      </div> )}
          
        </div>
       </div>
  
  
  </>
}
