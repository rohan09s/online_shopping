import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Adminmenu from '../assets/Adminmenu';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useAuth} from '../context/auth'
import { useNavigate } from 'react-router-dom';
function CreateProduct() {
    const [ categories,setCategories]=useState([])
    const [ category,setCategory] =useState("")
    const [ name,setName]=useState("")
    const [ price,setPrice]=useState("")
    const [ quantity,setQuantity]=useState("")
    const [ description,setDescription]=useState("")
    const [ photo,setPhoto]=useState("")
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

      function addProduct(e){
        e.preventDefault()
        let prod = new FormData()
        prod.append("name",name)
        prod.append("price",price)
        prod.append("quantity",quantity)
        prod.append("description",description)
        prod.append("category",category)
        prod.append("photo",photo)
        console.log(prod);
        
        fetch("https://onlineshoppingbackend-u7pl.onrender.com/product/create-product",{
          method:"post",
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
  return (
    <div>
      <Container>
        <Row className=''>
            <Col md={3} className='my-4'>
            <Adminmenu/>
            </Col>
            <Col md={9}>
            <form onSubmit={addProduct} className='w-50 mx-auto d-block my-4' >
                <h3 className='text-center my-3'>Create New Product</h3>
                 <Form.Select aria-label="Default select example" className='mb-3' value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option>---select category--</option>
                    {
                        categories.map((c,i)=>{
                            return (
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
                 <Form.Group className='mb-3' controlId='exampleForm.ControlInput5'>
                    <Form.Control type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}/>
                 </Form.Group>
                 <Button type="submit" className="my-3">Add Product</Button>
            </form>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CreateProduct