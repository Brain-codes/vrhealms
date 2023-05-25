import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Wrapper = ({ children }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = localStorage.getItem("vrhealms");
  //   if (!user) {
  //     navigate("/");
  //   } else {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  return (
    <>
      {/* <Navbar /> */}
      <div className="wrapper-container">{children}</div>{" "}
    </>
  );
};

export default Wrapper;
