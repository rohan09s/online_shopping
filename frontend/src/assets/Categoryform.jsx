import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Categoryform({handleSubmit,value,setValue}) {
  return (
    <div className='text-center'>
      <Form onSubmit={handleSubmit} className='w-50 mx-auto d-block'>
        <h2 className='text-center my-3'>Handle Category</h2>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control type="text" placeholder="Enter category name"
        value={value} onChange={(e)=>setValue(e.target.value)} />
        
      </Form.Group>

      <Button variant="primary"  type="submit">
        Submit
      </Button>
    </Form>

    </div>
  )
}

export default Categoryform