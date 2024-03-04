// MyNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function MyNavbar() {
    const linkStyle = {
        color: 'white', // Set the text color to white
        textDecoration: 'none', // Remove underline
        marginRight: '15px', // Add some right margin for spacing
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className="nav-link" style={linkStyle}>
                            Contacts
                        </Link>
                        <Link to="/marketing" className="nav-link" style={linkStyle}>
                            Marketing
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
