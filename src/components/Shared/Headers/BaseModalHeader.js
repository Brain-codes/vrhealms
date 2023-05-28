import React from "react";
import "./BaseModalHeader.scss";

const BaseModalHeader = ({ title, description, colorShade }) => {
  return (
    <div className="modal-header">
      {colorShade == "dark" || colorShade == null || colorShade == undefined ? (
        <>
          <h1 style={{ textTransform: "capitalize" }}>{title}</h1>
          <p>{description}</p>
        </>
      ) : colorShade == "light" ? (
        <>
          <h1 style={{ color: "white" }}>{title}</h1>
          <p style={{ color: "#ececec" }}>{description}</p>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default BaseModalHeader;
