
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import { Container } from "react-bootstrap";
import EpiSearch from "../components/epiSearch";
import  LoadingScreen  from "../components/LoadingScreen";
import { SocialShimmer } from 'react-content-shimmer';
import { ShimmerFeaturedGallery } from "react-shimmer-effects";

import { ShimmerSimpleGallery } from "react-shimmer-effects";

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
    var [epil, setEpil] = useState([]);
    const [numbersofEpiperPage, setNumbersofEpiperPage] = useState([]);
    const [isLoading, setLoading] = useState(false)
  const initialState = () => "";
  const [value, setValue] = useState(initialState);
  var [epilength, setEpilength] = useState([]);
    const totalEpis = [];
    
    var pages = [];
    const numOfEpisPerPage = 3;

    for (let number = 1; number <= 20; number++) {
      totalEpis.push(number);
    }
    var indOfLastEpi = active * numOfEpisPerPage;
    var indOfFirstEpi =  indOfLastEpi - numOfEpisPerPage;

    const fetchDataCall = async () => {
      setLoading(true)
    let data  = await axios
    .get(
      "https://rickandmortyapi.com/api/episode/" +
      totalEpis.slice(indOfFirstEpi, indOfLastEpi)
    )
    .then(async function(data) {
      setEpi(data.data);
   
      setLoading(false)
      console.log("get tata" )
    })
      .catch(function(error) {
        console.log(error);
      });
    return { data };
  };

  
 
  //if (isLoading){ return <p>Loading...</p>}



  console.log("first", totalEpis.slice(indOfFirstEpi, indOfLastEpi));

    if (active => 0 ) 
      {
      
       let tata = value;
       console.log("totalEpiS"+totalEpis);
       let totalepilength = totalEpis.length;
  
       useEffect(() =>
          {
          const fetchData = async api =>
            {
             let  datad = await fetchDataCall();
         
           
       
            }        
           fetchData();
          }
      
         ,[active])
      }

      var indOfLastEpi = active * numOfEpisPerPage;
      var indOfFirstEpi =  indOfLastEpi - numOfEpisPerPage;
    
     for (let number = 1; number <= 5; number++) {
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
            {
      (isLoading)
      ?
      <div>
<h1>loading</h1>
     
    <ShimmerFeaturedGallery row={2} col={2} card frameHeight={600} />;
      <SocialShimmer/>
      <ShimmerSimpleGallery imageType="circular" imageHeight={200} caption />
      <ShimmerSimpleGallery card imageHeight={300} />
      <ShimmerSimpleGallery card imageHeight={300} caption />
      </div>
      :
      

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
              if (active < 100) {
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
}
</>
       )
}


export default Epi;