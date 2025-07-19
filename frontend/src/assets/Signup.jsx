import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  let navigate= useNavigate()

  function adduser(e) {
    e.preventDefault()
    let user={name,email,password,address,phone,answer}
    fetch("https://onlineshoppingbackend-u7pl.onrender.com/auth/register",{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(user)
    }).then((res1)=>{
        res1.json().then((res2)=>{
            (res2);
           navigate('/signin')
        })
    })
  }
  return (
    <div>
      <Container className="text-center">
        <h2 className="text-center my-4">Sign Up Form</h2>
        <Form onSubmit={adduser} className="w-25 mx-auto d-block">
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formGroupAddress">
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupAnswer">
            <Form.Control
              type="text"
              placeholder="What is your favourite sport? "
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="my-4">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Signup;