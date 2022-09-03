
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import { Container } from "react-bootstrap";

import React, { useState, useEffect,forwardRef,FunctionComponent, FC }from "react";
import axios from "axios";

type EpiProps = {
    id?: number;
    name: string;
    episode:string;
    lastname?:string;
    avatar?: string;
}


export const Epi: FunctionComponent<EpiProps> =({name, lastname }: EpiProps) => {

    var [active, setActive] = useState(1);
    var [epi, setEpi] = useState([]);
    const [numbersofEpiperPage, setNumbersofEpiperPage] = useState([]);
    const [loading ,setLoading]= useState(false);
    
    const totalEpis = [];
    var pages = [];
    const numOfEpisPerPage = 3;

    for (let number = 1; number <= 36; number++) {
      totalEpis.push(number);
    }
    var indOfLastEpi = active * numOfEpisPerPage;
    var indOfFirstEpi =  indOfLastEpi - numOfEpisPerPage;

    const fetchDataCall = async () => {
    let data  = await axios
    .get(
      "https://rickandmortyapi.com/api/episode/" +
      totalEpis.slice(indOfFirstEpi, indOfLastEpi)
    )
      .then(async function(data) {
        setEpi(data.data);
        console.log("datis being set from async function here" )
      })
      .catch(function(error) {
        console.log(error);
      });
    return { data };
  };
  

  console.log("first", totalEpis.slice(indOfFirstEpi, indOfLastEpi));
  
  for (let number = 1; number => 5; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
    if (active === 1 ) 
    {
      useEffect(() =>
      {
        const fetchData = async api =>
         {
           let  datad = await fetchDataCall();
         
       

         }        
     fetchData();
      }
      
      ,[active])
    };

  
      var indOfLastEpi = active * numOfEpisPerPage;
      var indOfFirstEpi =  indOfLastEpi - numOfEpisPerPage;
    
    
     
        console.log("data" + active)
        function pagination(number) {
          indOfLastEpi = number * numOfEpisPerPage;
          console.log("yolastepi",indOfLastEpi)
          indOfFirstEpi = indOfLastEpi - numOfEpisPerPage;
          console.log("yofirstepi",indOfFirstEpi)
          setActive(number);
         
        }
  
          return (
            <>
            <Container>
         <div>

<div className="container d-flex flex-wrap justify-content-center">
      
<div className="container d-flex justify-content-center">
        <Pagination size="lg">
          <Pagination.Prev
            onClick={() => {
              if (active > 1) {
                pagination(active - 1);
              }
            }}
          />
          {pages}
          <Pagination.Next
            onClick={() => {
              if (active < 5) {
                pagination(active + 1);
              }
            }}
          />
        </Pagination>
      </div>
  {epi.map((ep) => (
    <Card
      key={ep.id}
      style={{ width: "25rem", margin: "2rem", textAlign: "center" }}
    >
      <Card.Body>
        <Card.Title>
          {" "}
          <span style={{ fontWeight: "bold" }}>Episode:</span> {ep.name}
        </Card.Title>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Ep. Code:</span>{" "}
          {ep.episode}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Date:</span> {ep.air_date}
        </Card.Text>
      </Card.Body>
    </Card>
  ))}

     </div>
 
    </div>
   </Container>
</>
       )
}


export default Epi;