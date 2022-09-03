import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import * as React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import NavDropdown from 'react-bootstrap/NavDropdown';


import Form from 'react-bootstrap/Form';

import Navbar from 'react-bootstrap/Navbar';

import styles from "./header.module.css"
// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const signedInStatus = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    height: "100%",
    width: "100%",
    position: "relative"
  };

  return (
    <header>
     
     
     
    
     <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',margin:"100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          {!session && (
            <>
  
          
         
      <Button
            type="button"
             
                onClick={(e) => {
                  e.preventDefault()
                  signIn("keycloak")
                }}
          >
           login
          </Button>
        </>
            
          )}
          
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                 
                />
              )}
          
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
          >
            Signout
          </button>

  
        </>
          )}

        </Navbar.Collapse>

      </Container>
    </Navbar>
     
      
      
          
    </header>
  )
}