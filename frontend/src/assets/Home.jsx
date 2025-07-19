import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useCart } from '../context/cart'
import Form from 'react-bootstrap/Form'

function Home() {
   const [products, setProducts] = useState([]);
   const [categories,setCategories]=useState([]);
   const [cart,setCart]=useCart()
   const [checked,setChecked]=useState([])
     
    function getallprods() {
      fetch("https://onlineshoppingbackend-u7pl.onrender.com/product/all-products").then((res1) => {
        res1.json().then((res2) => {
          (res2);
          setProducts(res2.products);
        });
      });
    }
    useEffect(() => {
      getallprods();
    }, []);

      function getcategories(){
        fetch("https://onlineshoppingbackend-u7pl.onrender.com/category/all-categories").then((res1)=>{
          res1.json().then((res2)=>{
            ("category",res2);
            setCategories(res2.categories)
          })
        })
      }
    
      useEffect(()=>{
        getcategories()
      },[])


      function addtocart(prod){
          let e=cart.find(f=>f._id===prod._id)

          setCart([...cart,prod])
          localStorage.setItem("cart",JSON.stringify([...cart,prod]))
          
        //   if(e)
        //   {
        //     alert("Product already added in cart")
        //   }else{
        //   setCart([...cart,prod])
        //   localStorage.setItem("cart",JSON.stringify([...cart,prod]))  
        // }
  }

  function handleFilter(value,id){
    (value,id);
    
    let all=[...checked]
    if(value){
      all.push(id)
    }else{
      all=all.filter(c=>c!==id)
    } 
    setChecked(all)

  }

  function filterproduct(){
    let data= {checked}
     fetch("https://onlineshoppingbackend-u7pl.onrender.com/product/filter-product",{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
     }).then((res1)=>{
          res1.json().then((res2)=>{
            (res2);
            setProducts(res2.products)
          })
        })
  }
   useEffect(()=>{
    if(checked.length)
      filterproduct()  
  },[checked])

  return (
    <div>
       <Container>
        <Row class>
          <Col md={3} className='my-4'>
          <h3 className='mb-'>Filter By Category</h3>
            {
              categories.map((c,i)=>{
                return(
                  <Form.Check
                  type='checkbox'
                  label={c.name}
                  key={c._id} className='mt-5 fs-5'
                  onChange={(e)=>handleFilter(e.target.checked,c._id)}/>
                )
              })
            }
            <Button variant='secondary' className='px-3 my-5' onClick={()=>window.location.reload()}>Clear Filters</Button>
          </Col>
          <Col md={9}>
            <h2 className="text-center my-3">All Products</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4 my-4">
              {
              products.map((p, i) => {
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
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home