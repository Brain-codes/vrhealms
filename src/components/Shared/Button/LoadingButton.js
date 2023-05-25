import React from "react";
import "./Buttons.scss";
import { Spinner } from "@chakra-ui/react";

const LoadingButton = ({ color }) => {
  return (
    <div
      className="filled-button-cont-comp"
      style={{
        backgroundColor: color,
        cursor: "not-allowed",
      }}
    >
      <Spinner />{" "}
    </div>
  );
};

export default LoadingButton;
