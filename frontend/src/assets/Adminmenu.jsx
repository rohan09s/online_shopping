import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
function Adminmenu() {
  return (
    <div>
        <ListGroup defaultActiveKey="#link1">
        <NavLink to="/dashboard/admin/categories" className='list-group-item'>Categories</NavLink>
        <NavLink to="/dashboard/admin/create-product" className='list-group-item'>Create Product</NavLink>
        <NavLink to="/dashboard/admin/products" className='list-group-item'>Products</NavLink>
        <NavLink to="/dashboard/admin/users" className='list-group-item'>Users</NavLink>


        </ListGroup>
    </div>
  )
}

export default Adminmenu