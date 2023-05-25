import React from "react";
import "./Transactions.scss";

const DetailsTile = ({ title, value }) => {
  return (
    <div className="details-tile-cont">
      <h1>{title}</h1>
      <p>{value}</p>
    </div>
  );
};

export default DetailsTile;
