import React from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Usermenu from '../assets/Usermenu';
import { useAuth } from '../context/auth';
import Card from "react-bootstrap/Card";

function Dashboard() {
  const [auth]=useAuth()
  return (
    <div>
      <Container>
        <Row className="p-4">
          <Col md={3}>
            <Usermenu/>
          </Col>
           <Col md={9}>
            <Card style={{ width: "24rem" }} className="mx-5">
              <Card.Body>
                <Card.Title>User Name: {auth?.user.name}</Card.Title>
                <Card.Text>
                  <h5>Email Address: {auth?.user.email}</h5>
                  <h5>Address:  {auth?.user.address}</h5>
                  <h5>Contact Number: {auth?.user.phone}</h5>   
                  </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          </Row>
      </Container>
    </div>
  )
}

export default Dashboard