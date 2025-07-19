import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

function Signin() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [auth,setAuth]=useAuth()
      const navigate= useNavigate()

      function loginUser(e){
        e.preventDefault()
         let user={email,password}
    fetch("https://onlineshoppingbackend-u7pl.onrender.com/auth/login",{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(user)
    }).then((res1)=>{
        res1.json().then((res2)=>{
            (res2)
            if(res2.Error){
              alert(res2.Error)
            }else{
              alert(res2.message)
            setAuth({
              user:res2.user,
              token:res2.token
            })
            localStorage.setItem("auth",JSON.stringify(res2))
           navigate('/')}
        })
    })
      }
  return (
    <div>
      <Container className="text-center">
        <h2 className="text-center my-4">Sign In</h2>
        <Form onSubmit={loginUser} className="w-25 mx-auto d-block">
          
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              type="text"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          
          
         

          <Button variant="primary" type="submit" className="my-4">
            Submit
          </Button>
          <Link to='/forgotpass' className="ms-4 text-secondary  text-decoration-none">Forgot Password?</Link>
        </Form>
      </Container>
    </div>
  )
}

export default Signin