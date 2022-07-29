import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import Modal from "react-modal";

function HomeComponent() {
  const [products, setProducts] = useState([]);
  const [apiKey] = useState(process.env.REACT_APP_GOOGLE_API_KEY);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [radiusType, setRadiusType] = useState("");
  const [radius, setRadius] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [product_img, setProductImg] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const token = window.localStorage.getItem("token");

  const handleRadius = async (e) => {
    e.preventDefault();
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/products`,
      headers: {
        authorization: `${token}`,
      },
      params: {
        radius: radiusType,
      },
    });
    console.log(response.data.products);
    setProducts(response.data.products);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/products`,
        headers: {
          authorization: `${token}`,
        },
        params: {
          radius: +radiusType,
        },
      });
      setProducts(response.data.products);
      return response.data;
    };
    fetchProducts();
  }, [products, radiusType]);

  const getCoordinate = async (address) => {
    try {
      setAddress(address);
      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      let coordinate = result.data.results[0].geometry.location;
      setCoordinates(coordinate);
      console.log(result.data.results[0].geometry.location);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("product_img", product_img);
      formData.append("address", address);
      formData.append("price", price);
      formData.append("radius", radius);
      formData.append("long", coordinates.lng);
      formData.append("lat", coordinates.lat);

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/product`,
        data: formData,
        headers: {
          authorization: `${token}`,
        },
      });
      setModalIsOpen(false)
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      {products.length > 0 && (
        <div>
          <input
            type="text"
            name="radius"
            value={radiusType}
            onChange={(e) => setRadiusType(e.target.value)}
          />
          <button className="btn" onClick={handleRadius}>Set Radius</button>
        </div>
      )}
      <div className="wrapper">
        {products &&
          products.map((product) => (
            <Card
              key={product._id}
              productDetail={product}
              img={product.image}
              title={product.name}
              price={product.price}
              user={product.user.firstName}
              productAdress={product.address}
              userAddress={product.user}
              id={product._id}
            />
          ))}
      </div>
      <button className="btn mt" onClick={() => setModalIsOpen(true)}>Add Product</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="modal-wrapper">
          
        <div className="modal-input">
        <input
          className="form-field"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Product name"
          name="name"
          value={name}
        />
        <Autocomplete
          className="input"
          placeholder="Address"
          apiKey={apiKey}
          onPlaceSelected={(place) => getCoordinate(place.formatted_address)}
        />

        <input
          className="form-field"
          type="text"
          placeholder="price"
          name="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
        <input
          className="form-field"
          type="text"
          placeholder="radius"
          name="radius"
          onChange={(e) => {
            setRadius(e.target.value);
          }}
          value={radius}
        />
        <input
          className="form-field"
          type="file"
          placeholder="Image"
          name="product_img"
          onChange={(e) => {
            setProductImg(e.target.files[0]);
          }}
        />
        </div>

        <div className="buttons">
        <span style={{color: 'black', cursor: 'pointer'}} onClick={() => setModalIsOpen(false)}>Close modal</span>
        <button className="btn" onClick={handleProduct}>Add Product</button>
        </div>
        </div>
      </Modal>
    </div>
  );
}

export default HomeComponent;
