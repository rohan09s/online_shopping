import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Adminmenu from "../assets/Adminmenu";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from "react-router-dom";


function Products() {
  const [products, setProducts] = useState([]);
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
  return (
    <div>
      <Container>
        <Row class>
          <Col md={3} className='my-4'>
            <Adminmenu />
          </Col>
          <Col md={9}>
            <h2 className="text-center my-3">All Products</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4 my-4">
              {
              products.map((p, i) => {
                return (
                  <Link  className='product-link' to ={`/dashboard/admin/update-product/${p.slug}`}>
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
                        <Button variant="success">Add To Cart</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  </Link>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Products;