import React from "react";
import "./BaseInput.scss";
import { Box } from "@chakra-ui/react";

const BaseInput = ({ label, type, placeholder, onChange, value }) => {
  return (
    <div className="input-cont-comp">
      <label style={{ textTransform: "capitalize" }}>{label}</label>
      <Box mt={2}></Box>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
};

export default BaseInput;
