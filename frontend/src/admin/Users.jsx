import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Adminmenu from '../assets/Adminmenu';

function Users() {
  const [allusers,setAllusers]=useState([])
  function getusers(){
    fetch("https://onlineshoppingbackend-u7pl.onrender.com/auth/allusers").then((res1)=>{
      res1.json().then((res2)=>{
        (res2.allusers);
        setAllusers(res2.allusers)
        
      })
    })
  }

  useEffect(()=>{
    getusers()
  },[])
  return (
    <div>
      <Container>
        <Row className='m-4'>
          <Col md={3} className='my-4'>
          <Adminmenu/>
          </Col>
          <Col md={9}>
          <h2 className='text-center my-3'>All Users</h2>
          <table className='table ms-4'>
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL ADDRESS</th>
                <th>ADDRESS</th>
                <th>PHONE NUMBER</th>
              </tr>
            </thead>
            <tbody>
              {
                allusers.map((u,i)=>{
                  return(
                    <tr key={i}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.address}</td>
                        <td>{u.phone}</td>
                    </tr>
                  )
                })
              }
            </tbody>
            </table>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Users