import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaCartShopping} from 'react-icons/fa6'
import { useAuth } from '../context/auth';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCart } from '../context/cart';
import Searchinput from './Searchinput';

function Header() {
  const [auth,setAuth]=useAuth()
  const [cart,setCart]=useCart()

  function handlelogout() {
    localStorage.removeItem("auth")
    setAuth({
      user:null,
      token:""
    })
  }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/" className='me-5 pe-5'>Online shopping</Navbar.Brand>
          <Searchinput />
          <Nav className="ms-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            {
              !auth.user?(<>
               <NavLink to='/signup'>Sign Up</NavLink>
            <NavLink to='/signin'>Sign In</NavLink>
            </>):(<>
            <NavDropdown title={`${auth?.user.name }`} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavLink to={`/dashboard/${auth.user.role===1?"admin":"user"}`} className='dropdown-item'>Dashboard</NavLink>
              
                <NavLink to='/signin' className='dropdown-item' onClick={handlelogout}>Sign Out</NavLink>
              </NavDropdown>
            </>)
            }
            <NavLink to="/cartitems"><FaCartShopping/><sup>{cart.length}</sup></NavLink>
           
          </Nav>
        </Container>
      </Navbar>
      <br />

    </div>
  )
}

export default Header