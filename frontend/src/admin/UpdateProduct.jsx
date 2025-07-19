import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Adminmenu from '../assets/Adminmenu';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useAuth} from '../context/auth'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const [ categories,setCategories]=useState([])
        const [ category,setCategory] =useState("")
        const [ name,setName]=useState("")
        const [ price,setPrice]=useState("")
        const [ quantity,setQuantity]=useState("")
        const [ description,setDescription]=useState("")
        const [ photo,setPhoto]=useState("")
        const [id,setId]=useState("")
        const params= useParams()
        
        const [auth]=useAuth()
        const navigate = useNavigate()
    
          function getcategories(){
            fetch("https://onlineshoppingbackend-u7pl.onrender.com/category/all-categories").then((res1)=>{
              res1.json().then((res2)=>{
                (res2);
                setCategories(res2.categories)
              })
            })
          }
        
          useEffect(()=>{
            getcategories()
          },[])
    
          function getSingleprod(){
            fetch(`https://onlineshoppingbackend-u7pl.onrender.com/product/single-product/${params.slug}`).then((res1)=>{
                res1.json().then((res2)=>{
                    ("res2",res2);
                    setName(res2.products.name)
                    setPrice(res2.products.price)
                    setQuantity(res2.products.quantity)
                    setCategory(res2.products.category._id)
                    setDescription(res2.products.description)
                    setId(res2.products._id)
                    
                })
            })
          }
          useEffect(()=>{
            getSingleprod()
          },[])

          function updateProduct(e){
            e.preventDefault()
            let prod = new FormData()
            prod.append("name",name)
            prod.append("price",price)
            prod.append("quantity",quantity)
            prod.append("description",description)
            prod.append("category",category)
            prod.append("photo",photo)
            (prod);
            
            fetch(`https://onlineshoppingbackend-u7pl.onrender.com/product/update-product/${id}`,{
              method:"put",
              headers:{
                "authorization":auth?.token
              },
              body:prod
            }).then((res1)=>{
              res1.json().then((res2)=>{
                (res2);
                navigate('/dashboard/admin/products')
                
              })
            })
          }

          function deleteProduct(id){
            fetch(`https://onlineshoppingbackend-u7pl.onrender.com/product/delete-product/${id}`,{
                method:"delete",
                headers:{
                    "authorization":auth?.token
                }
            }).then((res1)=>{
                res1.json().then((res2)=>{
                    (res2);
                    navigate("/dashboard/admin/products")
                    
                })
            })
          }
  return (
    <div>
      <Container>
        <Row >
            <Col md={3} className='my-4'>
            <Adminmenu/>
            </Col>
            <Col md={9}>
            <form onSubmit={updateProduct} className='w-50 mx-auto d-block my-4' >
                <h3 className='text-center my-3'>Update Product</h3>
                 <Form.Select aria-label="Default select example" className='mb-3' value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option>---select category--</option>
                    {
                        categories.map((c,i)=>{
                            return(
                                <option key={i} value={c._id}>{c.name}</option>
                            )
                        })
                    }
                 </Form.Select>
                 <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                    <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                 </Form.Group>
                 <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                    <Form.Control type='text' placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
                 </Form.Group>
                 <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
                    <Form.Control type='text' placeholder='Enter Quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                 </Form.Group>
                 <Form.Group className='mb-3' controlId='exampleForm.ControlInput4'>
                    <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                 </Form.Group>
                 <Form.Group className='mb-3' controlId='exampleForm.ControlInput4'>
                    <Form.Control type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}/>
                 </Form.Group>
                 <Button type="submit" className="my-3">Update Product</Button>
                 <Button  className="my-3 ms-3" variant="danger" onClick={()=>deleteProduct(id)}>Delete Product</Button>
            </form>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default UpdateProduct