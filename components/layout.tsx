import Header from "./header"
import Footer from "./footer"
//import type { ReactChildren } from "react"
//import React, { useState, useEffect } from "react";
//import axios from "axios";
import Container from "react-bootstrap/Container";
//import Card from "react-bootstrap/Card";
//import { signIn, signOut, useSession } from "next-auth/react";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useEffect,forwardRef } from "react";
//import ReactPaginate from "react-paginate";
import Link from 'next/link'
import Epitwo from '../components/epitwo'
import Pokemon from '../components/pokemon';
import { useSession,getSession, signIn, signOut } from "next-auth/react"

import Form from 'react-bootstrap/Form';

import Navbar from 'react-bootstrap/Navbar';
import { getAllEpis } from '../components/api';
import FilterResults from 'react-filter-search';
import axios from "axios";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import EpiSearch from "../components/epiSearch";
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Epi from "../components/epi";
import ListEpi from "../components/listepi";
import type { Episode } from '../types/epi'


interface Props {
  children: React.ReactNode
}
interface SchoolProps {
  schools: Array<Episode>;
}

export default function Layout({ children }: Props,schools:SchoolProps) {

  const { data: session, status } = useSession()

  const initialState = () => 1;
  const [value, setValue] = useState(initialState);
    var [active, setActive] = useState(1);
    var [epi, setEpi] = useState([]);

    const [numbersofEpiperPage, setNumbersofEpiperPage] = useState([]);
   
  var [episer, setEpiSearch] = useState("");
  var [epiname, setEpiName] = useState("");
    
    const totalEpis = [];
    var pages = [];
    const numOfEpisPerPage = 3;
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };


  
  return (
      <>
 
        <header>
     
     
            <Container>
              

            <Navbar bg="light" expand="lg">

                <Navbar.Brand href="#">mxapp</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
 					<Nav
   								className="me-auto my-2 my-lg-0"
   							 	style={{ maxHeight: '100px',margin:"100px" }}
    
  					>
      					<Nav.Link >
						 	<Link href="/">
      						<a>Home</a>
   						 	</Link>
						</Nav.Link>
    
   						 <Nav.Link>
						<Link href="/client">
      						<a>Client</a>
    						</Link>
						</Nav.Link>
    					<Nav.Link>
							<Link href="/protected">
     						 <a>Protected</a>
   							</Link>
						</Nav.Link>
    					<Nav.Link>
						 	 <Link href="/me">
    					  	<a>Me</a>
    						</Link>
						</Nav.Link>

    					<Nav.Link> 
							<Link href="/api-example">
      						<a>API</a>
    						</Link>
						</Nav.Link>
    					<Nav.Link> 
						 	<Link href="/admin">
     							 <a>Admin</a>
    						</Link>
						</Nav.Link>
    						<NavDropdown title="Link" id="navbarScrollingDropdown">
      							<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
     							<NavDropdown.Item href="#action4">
       											 Another action
    				 	  		</NavDropdown.Item>
      							<NavDropdown.Divider />
      							<NavDropdown.Item href="#action5">

    					   		</NavDropdown.Item>
   					 		</NavDropdown>
				    	<Nav.Link href="#" disabled>
      											Link
    					</Nav.Link>
  					</Nav>
  

          
<pr>{session?.user.name}</pr>
          
          {!session && (
            <>
  

              <input
                 placeholder="Enter episode name"
                  onChange={e => inputHandler(e)}
                 />
                  <button >Search</button>
                <Button
                type="button"
             
                onClick={(e) => {
                  e.preventDefault()
                  signIn("keycloak")
                }}
                 >
                <h1>{epiname}</h1>>
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
          
 
  </header>
     <ListEpi input={inputText}/>
     
  
 
        <Footer />
      </>
    )
  }
