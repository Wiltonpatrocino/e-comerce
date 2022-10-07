import React from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CartSideBar from './CartSideBar';


const MyNav = () => {

  const [show, setShow] = useState(false);

  const navigate = useNavigate()

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/login")
  }



  return (

    <div>

      <Navbar bg="primary" variant="dark">
        <Container className='cont'>
          <Navbar.Brand to='./' as={Link}>Store</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to='./login' as={Link}>Login</Nav.Link>
            <Nav.Link to='./purchases' as={Link}>Purchases</Nav.Link>
            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <CartSideBar 
      show={show} 
      handleClose={handleClose}
      />
    </div>
  );
};

export default MyNav;