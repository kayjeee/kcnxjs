import Header from "./header"
import Footer from "./footer"
import type { ReactChildren } from "react"
import {Cards} from './cards'
import React, { useState, useEffect,forwardRef } from "react";
import ReactPaginate from "react-paginate";
import Link from 'next/link'
import Pager from "../components/pager";

import { Skeleton } from 'skeleton-loading-react'

import axios from "axios";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import EpiSearch from "../components/epiSearch";

import Epi from "../components/epi";

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

export default function Layout({ children }: Props) {

  
  const initialState = () => 1;
  const [value, setValue] = useState(initialState);
    var [active, setActive] = useState(1);
    var [epi, setEpi] = useState([]);
    const [numbersofEpiperPage, setNumbersofEpiperPage] = useState([]);
    const [loading ,setLoading]= useState(false);
    
    const totalEpis = [];
    var pages = [];
    const numOfEpisPerPage = 3;

  
   
        return (
      <>
 
     
       <EpiSearch />

      <div
      className="App"
      style={{
        margin: "4rem auto"
      }}
    >
      <Epi/>
    </div>
        <Footer />
      </>
    )
  }