import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import BG from "../../images/Waimakariri.svg";
import { Box, useToast } from "@chakra-ui/react";
import RecentItem from "./RecentItem";
import Contract from "../Contract/Contract";
import BaseModalHeader from "../Shared/Headers/BaseModalHeader";
import Transactions from "../Transactions/Transactions";
import {
  generateFormattedAmount,
  getAllContracts,
  getUserDate,
} from "./Service/DashboardService";
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contractItem, setContractItem] = useState([]);
  const [userDataDetails, setUserDataDetails] = useState([]);
  const user = JSON.parse(localStorage.getItem("vrhealms"));
  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });

  const fetchContracts = async () => {
    setIsLoading(true);
    try {
      const contracts = await getAllContracts(user.id, toast);
      setContractItem(contracts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userData = await getUserDate(user.id, toast);
      setUserDataDetails(userData);
      console.error(userData.pendingBalance);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
    fetchUserData();
  }, []);

  return (
    <div className="dashboard-whole-cont">
      <div className="welcome-container">
        <BaseModalHeader
          title={`Welcome, ${user.name}`}
          description="   We are here to help you manage your transactions in all shopping
          platforms"
          colorShade="light"
        />
        {/* <h1 style={{ fontFamily: "Circular Std Normal" }}>
          Welcome, Adenuga Adewumi
        </h1>
        <p>
          We are here to help you manage your transactions in all shopping
          platforms
        </p> */}
        <img src={BG} alt="" />
        <Box pt={10} mt={5}></Box>

        <div className="wallet-cont">
          <div className="current">
            <h6>Current Balance</h6>
            <h2>
              N{generateFormattedAmount(userDataDetails.mainBalance ?? 0)}
            </h2>
          </div>
          <Box pt={5}></Box>

          <div className="pending">
            <h6>Pending Balance</h6>
            <h2>
              N{generateFormattedAmount(userDataDetails.pendingBalance ?? 0)}
            </h2>
          </div>
        </div>
      </div>
      <Box pt={10} mt={5}></Box>
      <div className="recent-transaction">
        <div className="recent-h1">Recent Transaction</div>
        <Box pt={5}></Box>
        <div className="recent-trac-item-cont">
          <RecentItem />
          <RecentItem />
        </div>
      </div>
      <Box pt={10} mt={5}></Box>
      <Transactions contractItem={contractItem} loadingState={isLoading} />
      <Contract refreshContracts={fetchContracts} />
    </div>
  );
};

export default Dashboard;
