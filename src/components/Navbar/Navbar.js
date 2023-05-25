import React, { useEffect } from "react";
import "./Navbar.scss";
import Logo from "../../images/text_logo.svg";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import Dashboard from "../../images/dashboard.svg";
import { NavLink, useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import TopNav from "../TopNav/TopNav";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const location = useLocation();

  useEffect(() => {
    onOpen();
  }, []);

  // const closeIt = () => {
  //   console.log("why");
  //   isClose();
  // };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {" "}
          <DrawerBody>
            <div className="navbar-container">
              <div className="navbar-logo">
                <img src={Logo} alt="" />
              </div>
              <Box mt={30}></Box>
              <div className="navbar-title">MAIN MENU</div>
              <Box mt={5}></Box>
              <NavLink
                to="/dashboard"
                className={`navbar-item ${
                  location.pathname === "/dashboard" ? "active-item" : ""
                }`}
              >
                <img src={Dashboard} alt="" />
                <Box ml={5}></Box>
                <p>Dashboard</p>
              </NavLink>
              <Box mt={8}></Box>
              <NavLink
                to="/login"
                className={`navbar-item ${
                  location.pathname === "/login" ? "active-item" : ""
                }`}
              >
                <img src={Dashboard} alt="" />
                <Box ml={5}></Box>
                <p>Login</p>
              </NavLink>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* //TOPNAV */}
      <div className="top-nav-cont">
        <div className="top-nav-details">
          {" "}
          <div className="isOpen" onClick={isOpen}>
            OPEN
          </div>
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            CCC
          </Button>
        </div>
      </div>{" "}
    </>
  );
};

export default Navbar;
