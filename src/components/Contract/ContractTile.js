import React from "react";
import "./Contract.scss";

const ContractTile = ({ Image, title, description, onClick }) => {
  return (
    <div className="contract-tile-cont" onClick={onClick}>
      <img src={Image} alt="" />
      <div className="right-contract-tile">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ContractTile;
