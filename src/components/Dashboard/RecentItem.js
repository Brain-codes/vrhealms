import React from "react";
import User from "../../images/user-logo.svg";
import More from "../../images/more.svg";
import { Box } from "@chakra-ui/react";
import "./Dashboard.scss";

const RecentItem = () => {
  return (
    <div className="recent-item-cont">
      <img className="item-image" src={User} alt="" />
      {/* <Box pl={5}></Box> */}

      <div className="name-time">
        <h2> Sewo Goodness Jr.</h2>
        <p>Mar 9, 2023</p>
      </div>
      {/* <Box pl={10}></Box> */}

      <p className="price">N3,620</p>
      {/* <Box pl={10}></Box> */}

      <div className="status">
        <h1>Done</h1>
      </div>
      {/* <Box pl={20}></Box> */}
      <img className="more-img" src={More} alt="" />
    </div>
  );
};

export default RecentItem;
