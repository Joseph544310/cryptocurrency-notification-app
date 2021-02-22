import React from 'react'
import { Navbar, Nav, NavLink, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {logout} from '../actions/auth'
import {connect} from 'react-redux'
import '../css/UserNav.css'

const UserNav:React.FC<any> = (props) => {

  return (
    <div>
        <Navbar collapseOnSelect bg='light' expand="lg">
          <Navbar.Brand href="/">CoinAPI</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to='/'>Home</Nav.Link>
                <Nav.Link as={Link} to='/account'>Account</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
                <NavLink>{props.auth.user.username}</NavLink>             
                <Button variant="danger" onClick={() => props.logout()}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(UserNav);