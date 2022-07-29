import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Comment from "../comment/Comment";
import SingleCard from "./SingleCard";

function SingleCardComponent({ location, id }) {
  const token = window.localStorage.getItem("token");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/comments/${id}`,
        headers: {
          authorization: `${token}`,
        },
      });
      setComments(response.data);
      return response.data;
    };
    fetchComments();
  }, [comments, id]);

  return (
    <div className="wrapper">
      <SingleCard
        productDetail={location.productDetail}
      />
      <Comment comments={comments} id={id} />
    </div>
  );
}

export default SingleCardComponent;
