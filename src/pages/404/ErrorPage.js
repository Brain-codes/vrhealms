import React from "react";
import "./ErrorPage.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-cont">
      <h1>
        Error{" "}
        <h2>
          404
          {/* <span>4</span>{" "} */}
        </h2>
      </h1>
      <p>Oops, it looks like you are trying to access an unknown page</p>
      <Link to="/dashboard" className="home-btn">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
