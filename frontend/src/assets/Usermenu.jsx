import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';

function Usermenu() {
  return (
    <div>
        <ListGroup defaultActiveKey="#link1">
        <NavLink to="/dashboard/user/profile" className='list-group-item'>Profile</NavLink>
        <NavLink to="/dashboard/user/orders" className='list-group-item'>Orders</NavLink>
        </ListGroup>
    </div>
  )
}

export default Usermenu