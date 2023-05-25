import React from "react";
import "./TopNav.scss";

const TopNav = ({ isOpen, isClose }) => {
  const closeIt = () => {
    console.log("why");
    isClose();
  };
  return (
    <div className="top-nav-cont">
      <div className="top-nav-details">
        {" "}
        <div className="isOpen" onClick={isOpen}>
          OPEN
        </div>
        <button className="isClose" onClick={closeIt}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default TopNav;
