import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Adminmenu from '../assets/Adminmenu';
import Categoryform from '../assets/Categoryform';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';


function CreateCategory() {
  const [name,setName]=useState("")
  const [categories,setCategories]=useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [auth]=useAuth()
  const [selected,setSelected]=useState(null)
  const [updatedName,setUpdatedName]=useState("")
 

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

  function handleSubmit(e){
    e.preventDefault()
    let data={name}
    fetch("https://onlineshoppingbackend-u7pl.onrender.com/category/create-category",{
      method:"post",
      headers:{
        "content-type":"application/json",
        "authorization":auth?.token
      },
      body:JSON.stringify(data)
    }).then((res1)=>{
      res1.json().then((res2)=>{
        (res2);
        
        getcategories()
      })
    })
  }

  function handleUpdate(e){
    e.preventDefault()
    let data={name:updatedName}
    fetch(`https://onlineshoppingbackend-u7pl.onrender.com/category/update-category/${selected._id}`,{
      method:"put",
      headers:{
        "content-type":"application/json",
        "authorization":auth?.token
      },
      body:JSON.stringify(data)
    }).then((res1)=>{
      res1.json().then((res2)=>{
        (res2);
        setSelected(null)
        setUpdatedName("")
        setShow(false)
        getcategories()
      })
    })
  }

  function handleDelete(id){
fetch(`https://onlineshoppingbackend-u7pl.onrender.com/category/delete-category/${id}`,{
      method:"delete",
    headers:{
      "content-type":"application/json",
      "authorization":auth?.token
    },
  }).then((res1)=>{
    res1.json().then((res2)=>{
      (res2);
      getcategories()
    })
  })
  }
  return (
    <div>
      <Container>
                <Row className="m-4">
          <Col md={3}>
            <Adminmenu/>
          </Col>
          <Col md={9}>
            <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName}/>
            <div className="text-center mt-4">
              <h3>All Categories</h3>

              <table className='table'>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th></th>
                    
                  </tr>
                </thead>
                <tbody>
                 {
                categories.map((c,i)=>{
                  return(
                    <tr key={i}>
                        <td>{c.name}</td>
                        <td>
 <Button variant="primary" onClick={()=>{handleShow();setUpdatedName(c.name);setSelected(c)}}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Categoryform value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
      <Button variant='danger' className='ms-3' onClick={()=>handleDelete(c._id)}>Delete</Button>
                        </td>
                    </tr>
                  )
                })
              }
                </tbody>
              </table>
            </div>
          </Col>
          </Row>
      </Container>
    </div>
  )
}

export default CreateCategory