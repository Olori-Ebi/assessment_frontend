import React from 'react'
import { useLocation, Link, useParams } from "react-router-dom";
import CardComponent from '../components/card/Card'

function Single() {
  const {id} = useParams();
  const location = useLocation();
  return (
    <CardComponent id={id} location={location.state} />
  )
}

export default Single