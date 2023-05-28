import React from "react";
import "./Buttons.scss";
import { Spinner } from "@chakra-ui/react";

export const LoadingButton = ({ color }) => {
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

export const LoadingStatusButton = ({ color, bgColor }) => {
  return (
    <div
      className="filled-button-cont-comp"
      style={{
        backgroundColor: bgColor,
        cursor: "not-allowed",
        width: "fit-content",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <Spinner color={color} />{" "}
    </div>
  );
};
