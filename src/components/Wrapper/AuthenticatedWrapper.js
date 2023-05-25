import React from "react";
import Navbar from "../Navbar/Navbar";

const AuthenticatedWrapper = ({ children }) => {
  return (
    <>
      <div className="auth-wrapper-cont">
        <div className="navbar-wrapper">
          <Navbar />
        </div>
        <div className="chi-auth-wrapper">{children}</div>{" "}
      </div>
    </>
  );
};

export default AuthenticatedWrapper;
