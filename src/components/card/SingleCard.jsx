import React from 'react'

function SingleCard({productDetail}) {
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
    </div>
  )
}

export default SingleCard