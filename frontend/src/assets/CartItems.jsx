import React from 'react'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import Container from 'react-bootstrap/esm/Container'
import { MdDelete } from 'react-icons/md'
import { FaIndianRupeeSign } from 'react-icons/fa6'

function CartItems() {
  const [auth]=useAuth()
  const [cart,setCart]=useCart()
  const totalprice=()=>{
    let total =0
    cart.map(item=>{
      total=total+item.price
    })
    return total
  }

  function removeitem(cid){
    let myCart=[...cart]
    let index=myCart.findIndex(item=>item._id===cid)
    myCart.splice(index,1)
    setCart(myCart)
    localStorage.setItem("cart",JSON.stringify(myCart))
  }
  return (
    <div>
      <Container className='text-center p-4'>
        <h1>{auth.token?`Hello ${auth.user.name}`:"Please Login to check Products in cart"}</h1>
        <h3>{cart.length>1?`You have ${cart.length} products in cart`:"Please add products in the cart"}</h3>
        {
          auth.token?<>
          <table className='table'>
            <thead>
              <tr><th>Product</th> <th>Product Name</th> <th>Product Price</th> <th>Remove Product</th></tr>
            </thead>
            <tbody>
              {
                cart.map((c,i)=>{
                  return (
                    <tr key={i}>
                      <td><img src={`https://onlineshoppingbackend-u7pl.onrender.com/product/product-photo/${c._id}`} className="mx-auto d-block img-fluid pt-4"
                      height={100} width={100} /></td>
                      <td>{c.name}</td>
                      <td><FaIndianRupeeSign/>{c.price}</td>
                      <td><MdDelete className='text-danger fs-3' onClick={()=>removeitem(c._id)}/></td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
              <tr><td colSpan={2}>Total Amount: </td> <td colSpan={2}><FaIndianRupeeSign/>{totalprice()}</td></tr>
            </tfoot>
          </table>
          </>:null
        }
      </Container>
    </div>
  )
}

export default CartItems