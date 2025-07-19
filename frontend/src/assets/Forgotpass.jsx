import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';

function Forgotpass() {
    const [email,setEmail]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [answer,setAnswer]=useState("")
    let navigate=useNavigate()
            function loginuser(e)
            {
                e.preventDefault()
                let u={email,newPassword,answer}
                fetch("https://onlineshoppingbackend-u7pl.onrender.com/auth/forgotpass",{
                    method:"post",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(u)
                }).then((res1)=>{
                    res1.json().then((res2)=>{
                        (res2)
                        alert("Password reset successfully")                        
                        navigate('/signin')
                    })
                })
            }
  return (
    <div>
        <Container className='text-center'>
                <h2 className='text-center my-4'>Change Password</h2>
            <Form onSubmit={loginuser} className='w-25 mx-auto d-block'>                
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" placeholder="Enter email address" 
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupAnswer">
                    <Form.Control type="text" placeholder="What is your favourite sport?" 
                    value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Enter Password" 
                    value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                </Form.Group>                
                <Button variant="primary" type="submit" className='my-4'>
                    Submit
                </Button>
            </Form>
            </Container>
    </div>
  )
}

export default Forgotpass