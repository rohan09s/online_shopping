import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSearch } from '../context/search';
import { useNavigate } from 'react-router-dom';

function Searchinput() {
    const [values,setValues]=useSearch()
    const navigate= useNavigate()
    
   function handleSearch(e){
    e.preventDefault()
    fetch(`https://onlineshoppingbackend-u7pl.onrender.com/product/search-product/${values.keyword}`).then((res1)=>{
        res1.json().then((res2)=>{
            (res2);
            setValues({...values,result:res2})
            navigate('/search')
        })
    })
   }
  return (
    <div>
      <Form inline className='ms-5 ps-5' onSubmit={handleSearch}>
        <Row class>
          <Col xs="auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className=" mr-sm-2"
              onChange={(e)=>setValues({...values,keyword:e.target.value})}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>

    </div>
  )
}

export default Searchinput
