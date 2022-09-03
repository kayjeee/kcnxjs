import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { signIn, signOut, useSession } from "next-auth/react";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "./header.module.css";

import Form from 'react-bootstrap/Form';

import Navbar from 'react-bootstrap/Navbar';

export default function EpiSearch() {
  var [episer, setEpiSearch] = useState();
  var [epiname, setEpiName] = useState("");
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
  function epiSearch() {
    axios
      .get("https://rickandmortyapi.com/api/episode/?name=" + epiname)
      .then(data => {
        // console.log(data.data.results[0]);
        setEpiSearch(data.data.results[0]);
      });
  }

  return (
    <>
    <header>
     
     
     
    <Container fluid>
     <Navbar bg="light" expand="lg">

        <Navbar.Brand href="#">mxapp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',margin:"100px" }}
            
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
  
  <input
        placeholder="Enter episode name"
        onChange={e => setEpiName(e.target.value)}
      />{" "}
      <button onClick={epiSearch}>Search</button>
         
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

   
    </Navbar>
     
    </Container>
      
          
 
  
      <br />
     
      <Container
        style={{
          margin: "0 auto",
          padding: "3rem 7.5%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        {episer ? (
          <Card
            key={episer.id}
            style={{ width: "25rem", margin: "1rem", textAlign: "center" }}
          >
            <Card.Body>
              <Card.Title>
                {" "}
                <span style={{ fontWeight: "bold" }}>Episode:</span>{" "}
                {episer.name}
              </Card.Title>
              <Card.Text>
                <span style={{ fontWeight: "bold" }}>Ep. Code:</span>{" "}
                {episer.episode}
              </Card.Text>
              <Card.Text>
                <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
                {episer.air_date}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}
      </Container>
      </header>
    </>
  );
}
