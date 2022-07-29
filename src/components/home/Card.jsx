import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

function Card({ productDetail, id }) {
  // console.log(productDetail);
  // console.log(userAdress);
  return (
    <div className="card">
      <div className="card__body">
        <img src={productDetail.image} className="card__image" />
        <h2 className="card__title">{productDetail.name}</h2>
        <p className="card__description"><b>product Address: </b>{productDetail.address}</p>
        <p className="card__description"><b>user Address: </b>{productDetail.user.address}</p>
        <p className="card__description"><b>user: </b>{productDetail.user.firstName} {productDetail.user.lastName}</p>
        <p className="card__description"><b>Price: </b>{productDetail.price}</p>
      </div>
      
      <button className="card__btn"
        onClick={(e) => {
          e.preventDefault();
          // console.log(title, price);
        }}>
          <Link to={`/product/${id}`} state= {{id, productDetail}} >
          View Details
          </Link>
      </button>
      
      
    </div>
  );
}

export default Card;
