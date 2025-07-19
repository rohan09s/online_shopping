import React, { useState } from 'react'
import { useSearch } from '../context/search'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useCart } from '../context/cart';

function Search() {
    const [values,setValues]=useSearch()
    const [cart,setCart]=useCart()
    function addtocart(prod){
          let e= cart.map(f=>f._id===prod._id)
          if(e)
          {
            alert("Product already added in cart")
          }else{
          setCart([...cart,prod])
          localStorage.setItem("cart",JSON.stringify([...cart,prod]))          
        }
  }
  return (
    <div>
      <h3 className='text-center p-4'>{values?.result.length<1?"Product Not Found":`${values.result.length} Products found`}</h3>

    <Container>
         <div className="row row-cols-1 row-cols-md-3 g-4 my-4">
              {
              values?.result.map((p, i) => {
                return (
                  <Col key={i}>
                    <Card style={{ width: "18rem" }} className="h-100 shadow">
                      <Card.Img
                        variant="top"
                        src={`https://onlineshoppingbackend-u7pl.onrender.com/product/product-photo/${p._id}`}
                        className="h-50 w-50 mx-auto d-block img-fluid pt-4"
                      />
                      <Card.Body className="text-center">
                        <Card.Title>{p.name}</Card.Title>
                        <Card.Text>
                          <p>{p.description}</p>
                          <h5><FaIndianRupeeSign/>{p.price}</h5>
                        </Card.Text>
                        <Button variant="success" onClick={()=>addtocart(p)}>Add To Cart</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </div>
    </Container>
    </div>
  )
}

export default Search