import React, { Profiler, useEffect, useState } from "react";
import "./Sidebar.scss";
import Logo from "../../images/text_logo.svg";
import { Box } from "@chakra-ui/react";
import Dashboard from "../../images/dashboard.svg";
import Transactions from "../../images/transaction.svg";
import Settings from "../../images/settings.svg";
import Logout from "../../images/logout.svg";
import Contracts from "../../images/contracts.svg";
import Contact from "../../images/contact.svg";
import Menu from "../../images/menu.svg";
import Close from "../../images/close.svg";
import Profile from "../../images/profile.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Sidebar = ({ children, pageLocation }) => {
  const navigate = useNavigate();
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isToggleVisible, setToggleVisible] = useState(false);
  const location = useLocation();
  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });

  const openTwakToWidget = () => {
    if (window && window.Tawk_API) {
      window.Tawk_API.toggle();
    }
    toggleSidebar();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarVisible(false);
        setToggleVisible(true);
      } else {
        setSidebarVisible(true);
        setToggleVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  function handleLogout() {
    localStorage.clear();
    toast({
      title: "Logout Successful",
      description: "You've been logged out successfully, login to continue",
      status: "info",
    });
    navigate("/login");
  }
  return (
    <div className="sidebar-container">
      {isSidebarVisible && (
        <div className="sidebar">
          <button
            onClick={toggleSidebar}
            className="toggle-sidebar-button-mobile ham-burger"
          >
            <img src={Close} alt="" />
          </button>
          <nav className="sidebar-nav">
            <div className="navbar-container">
              <div className="navbar-logo">
                <img src={Logo} alt="" />
              </div>
              <Box mt={30}></Box>
              <div className="navbar-title">MAIN MENU</div>
              <Box mt={5}></Box>
              <NavLink
                onClick={toggleSidebar}
                to="/dashboard"
                className={`navbar-item ${
                  location.pathname === "/dashboard" ? "active-item" : ""
                }`}
              >
                <img src={Dashboard} alt="" />
                <Box ml={5}></Box>
                <p>Dashboard</p>
              </NavLink>
              <Box mt={5}></Box>
              <NavLink
                onClick={toggleSidebar}
                to="/transactions"
                className={`navbar-item ${
                  location.pathname === "/login" ? "active-item" : ""
                }`}
              >
                <img src={Transactions} alt="" />
                <Box ml={5}></Box>
                <p>Transactions</p>
              </NavLink>
              <Box mt={5}></Box>
              <NavLink
                onClick={toggleSidebar}
                to="/contracts"
                className={`navbar-item ${
                  location.pathname === "/contracts" ? "active-item" : ""
                }`}
              >
                <img src={Contracts} alt="" />
                <Box ml={5}></Box>
                <p>Contracts</p>
              </NavLink>
              <Box mt={5}></Box>
              <NavLink
                // onClick={toggleSidebar}
                // to="/login"
                onClick={openTwakToWidget}
                className={`navbar-item ${
                  location.pathname === "/login" ? "active-item" : ""
                }`}
              >
                <img src={Contact} alt="" />
                <Box ml={5}></Box>
                <p>Help</p>
              </NavLink>
              {/* SECTION 2 */}
              <Box mt={10} pt={10}></Box>
              <div className="navbar-title">TEAMS</div>
              <Box mt={10}></Box>

              <div className="teams-nav">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#E9872B",
                  }}
                ></div>
                <Box ml={5}></Box>
                <p>Marketing</p>
              </div>
              <Box mt={5}></Box>

              <div className="teams-nav">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#8484F3",
                  }}
                ></div>
                <Box ml={5}></Box>
                <p>Developement</p>
              </div>
              {/* SECTION 3 */}
              <Box mt={10} pt={10}></Box>
              <Box mt={10} pt={10}></Box>
              <Box mt={10} pt={10}></Box>

              <div className="foot-nav">
                <img src={Settings} alt="" />
                <Box ml={5}></Box>
                <p>Settings</p>
              </div>
              <Box mt={5}></Box>
              <div className="foot-nav" onClick={handleLogout}>
                <img src={Logout} alt="" />
                <Box ml={5}></Box>
                <p>Logout</p>
              </div>
              <Box mt={10} pt={10}></Box>
            </div>
          </nav>
        </div>
      )}
      <div className={`topNav-side ${isSidebarVisible ? "" : "expanded"}`}>
        <div className="toggle-mobile">
          {isToggleVisible && (
            <>
              <div onClick={toggleSidebar} className="ham-burger">
                <img src={Menu} alt="" />
              </div>
              <Box ml={5}></Box>
            </>
          )}

          <h1>{pageLocation}</h1>
        </div>

        <img src={Profile} alt="profile" />
      </div>
      <div className={`content ${isSidebarVisible ? "" : "expanded"}`}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
