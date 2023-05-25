import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import { useNavigate } from "react-router-dom";

const Layout = ({ children, pageLocation }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("vrhealms");
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className="app-container">
      <Sidebar pageLocation={pageLocation}>{children}</Sidebar>
    </div>
  );
};

export default Layout;
