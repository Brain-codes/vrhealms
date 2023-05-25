import React from "react";

const BaseFilledButton = ({ label, type, onClick }) => {
  const buttonStyle = {
    backgroundColor: "#2B4E9B",
    padding: "15px 20px",
    fontFamily: "Circular Std 500",
    borderRadius: "4px",
    fontSize: "15px",
    width: "100%",
    fontWight: "500",
    color: "#FFFFFF",
    border: "none",
  };

  return (
    <button type={type} style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default BaseFilledButton;
