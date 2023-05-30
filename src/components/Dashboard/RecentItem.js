import React from "react";
import User from "../../images/user-logo.svg";
import Debit from "../../images/debit.svg";
import Credit from "../../images/credit.svg";
import More from "../../images/more.svg";
import { Box } from "@chakra-ui/react";
import "./Dashboard.scss";
import {
  generateFormattedAmount,
  generateFormattedDate,
} from "./Service/DashboardService";

const RecentItem = ({ date, status, type, amount, desc }) => {
  return (
    <div className="recent-item-cont-a">
      {/* <img className="item-image" src={User} alt="" /> */}
      <img className="dc" src={type == "credit" ? Credit : Debit} alt="" />
      {/* <Box pl={5}></Box> */}

      <div className="name-time">
        <h2 style={{ textTransform: "capitalize" }}>{type}</h2>
        <p>{generateFormattedDate(date)}</p>
      </div>
      {/* <Box pl={10}></Box> */}

      <p className="price">&#8358;{generateFormattedAmount(amount ?? 0)}</p>
      {/* <Box pl={10}></Box> */}

      <div className="status">
        <h1>{status}</h1>
      </div>
      {/* <Box pl={20}></Box> */}
      {/* <img className="more-img" src={More} alt="" /> */}
    </div>
  );
};

export default RecentItem;
