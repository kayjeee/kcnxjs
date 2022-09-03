import Header from "./header"
import Footer from "./footer"
import type { ReactChildren } from "react"
import {Cards} from './cards'
import React, { useState, useEffect,forwardRef } from "react";
import ReactPaginate from "react-paginate";
import Link from 'next/link'
import Pager from "../components/pager";


import axios from "axios";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import EpiSearch from "../components/epiSearch";


interface Props {
  children: React.ReactNode
}
interface SchoolProps {
  schools: Array<School>;
}
const PER_PAGE = 10;
const generateData = (quantity = 5) => {
  return Array.from({ length: quantity }, (value, index) => ({
    id: index,
    name: `Item name ${index}`,
    price: 2100 + index,
    date: `August 29th 2018`,
    phone: `1-800-111-1117`
  }));
};

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true
  },
  {
    dataField: "name",
    text: "Name",
    sort: true
  },
  {
    dataField: "price",
    text: "Price",
    sort: true
  },
  {
    dataField: "date",
    text: "Date",
    sort: true
  },
  {
    dataField: "phone",
    text: "Phone",
    sort: true
  }
];
export default function Layout({ children }: Props) {

  

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
  
    console.log("first", totalEpis.slice(indOfFirstEpi, indOfLastEpi));
  
    for (let number = 1; number <= 7; number++) {
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
  
    useEffect(() => {
      if (active === 1) {
     
        axios
          .get(
            "https://rickandmortyapi.com/api/episode/" +
            totalEpis.slice(indOfFirstEpi, indOfLastEpi)
          )
         .then((data) => {

            setEpi(data.data);
            console.log("data" + data.data)
          });
      }
    }, [active]);
    console.log("data" + active)
    function pagination(number) {
      indOfLastEpi = number * numOfEpisPerPage;
      console.log("yolastepi",indOfLastEpi)
      indOfFirstEpi = indOfLastEpi - numOfEpisPerPage;
      console.log("yofirstepi",indOfFirstEpi)
      setActive(number);
      axios
        .get(
          "https://rickandmortyapi.com/api/episode/" +
            totalEpis.slice(indOfFirstEpi, indOfLastEpi)
        )
        .then((data) => {
          setEpi(data.data);
        });
    }
  
   
        return (
      <>
  
       <Header />
       <EpiSearch />

      <div
      className="App"
      style={{
        margin: "4rem auto"
      }}
    >
      <div className="container d-flex flex-wrap justify-content-center">
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
      <div className="container d-flex justify-content-center">
        <Pagination size="sm">
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
    </div>
        <Footer />
      </>
    )
  }