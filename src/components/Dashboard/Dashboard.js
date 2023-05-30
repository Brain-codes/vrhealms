import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import BG from "../../images/Waimakariri.svg";
import Hide from "../../images/hide.svg";
import Show from "../../images/show.svg";
import { Box, useToast } from "@chakra-ui/react";
import RecentItem from "./RecentItem";
import Contract from "../Contract/Contract";
import BaseModalHeader from "../Shared/Headers/BaseModalHeader";
import Transactions from "../Transactions/Transactions";
import {
  fetchRecentTransaction,
  generateFormattedAmount,
  getAllContracts,
  getUserDate,
} from "./Service/DashboardService";
import { RecentLoading } from "../Shared/Loading/LoadingState";
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contractItem, setContractItem] = useState([]);
  const [userDataDetails, setUserDataDetails] = useState([]);
  const [recentTransactionItem, setRecentTransactionItem] = useState([]);
  const user = JSON.parse(localStorage.getItem("vrhealms"));
  const [showCurrentBalance, setShowCurrentBalance] = useState(true);
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

  const fetcRecentTransaction = async () => {
    setIsLoading(true);
    try {
      const userData = await fetchRecentTransaction(user.id, toast);
      setRecentTransactionItem(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
    fetcRecentTransaction();
    fetchUserData();
  }, []);

  const toggleCurrentBalance = () => {
    setShowCurrentBalance(!showCurrentBalance);
  };
  return (
    <div className="dashboard-whole-cont">
      <div className="welcome-container">
        <BaseModalHeader
          title={`Welcome, ${user.name.split(" ")[0]}`}
          description="We are here to help you manage your transactions in all shopping platforms"
          colorShade="light"
        />

        {/* <h1 style={{ fontFamily: "Circular Std Normal" }}>
          Welcome, Adenuga Adewumi
        </h1>
        <p>
          We are here to help you manage your transactions in all shopping
          platforms
        </p> */}
        <img className="bg-img" src={BG} alt="" />
        <Box pt={10} mt={5}></Box>

        <div className="wallet-cont">
          <div className="current">
            <h6>Current Balance</h6>
            <div className="see-balance-cont">
              <h2>
                &#8358;
                {showCurrentBalance ? (
                  <>
                    {" "}
                    &#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;{" "}
                  </>
                ) : (
                  <>
                    {generateFormattedAmount(userDataDetails.mainBalance ?? 0)}{" "}
                    : 00k
                  </>
                )}{" "}
              </h2>

              <img
                onClick={toggleCurrentBalance}
                src={showCurrentBalance ? Show : Hide}
                alt=""
              />
            </div>
          </div>
          <Box pt={5}></Box>

          <div className="pending">
            <h6>Pending Balance</h6>
            <h2>
              &#8358;
              {generateFormattedAmount(userDataDetails.pendingBalance ?? 0)} :
              00k
            </h2>
          </div>
        </div>
      </div>
      <Box pt={10} mt={5}></Box>
      <div className="recent-transaction">
        <div className="recent-h1">Recent Transaction</div>
        <Box pt={5}></Box>
        <div className="recent-trac-item-cont">
          {isLoading ? (
            <>
              <RecentLoading />
              <RecentLoading />
            </>
          ) : (
            <>
              {recentTransactionItem
                ?.slice(0, 2)
                .map((eachTransaction, index) => {
                  const { amount, date, status, type, desc } = eachTransaction;
                  return (
                    <RecentItem
                      key={index} // Make sure to provide a unique key prop for each item in the map
                      date={date}
                      amount={amount}
                      status={status}
                      type={type}
                      desc={desc}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
      <Box pt={10} mt={5}></Box>
      <Transactions contractItem={contractItem} loadingState={isLoading} />
      <Contract refreshContracts={fetchContracts} />
    </div>
  );
};

export default Dashboard;
