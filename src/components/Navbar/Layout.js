import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children, pageLocation }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("vrhealms");
    if (!user) {
      navigate("/");
    } else {
      // Add your logic to handle redirection based on the current location
      if (location.pathname === "/dashboard") {
        navigate("/dashboard");
      } else if (location.pathname === "/contracts") {
        navigate("/contracts");
      } else if (location.pathname === "/404") {
        navigate("/dashboard");
      } else if (location.pathname === "/transactions") {
        navigate("/transactions");
      } else {
        navigate("/404");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <div className="app-container">
      <Sidebar pageLocation={pageLocation}>{children}</Sidebar>
    </div>
  );
};

export default Layout;
