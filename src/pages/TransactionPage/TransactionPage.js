import React, { useEffect, useState } from "react";
import { RecentLoading } from "../../components/Shared/Loading/LoadingState";
import RecentItem from "../../components/Dashboard/RecentItem";
import { fetchRecentTransaction } from "../../components/Dashboard/Service/DashboardService";
import { Box, useToast } from "@chakra-ui/react";
import emptyImage from "../../images/123936-empty-ghost.gif";

const TransactionPage = () => {
  const [recentTransactionItem, setRecentTransactionItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("vrhealms"));
  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });

  useEffect(() => {
    fetcRecentTransaction();
  }, []);

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
  return (
    <div className={recentTransactionItem.length === 0 ? "tp" : ""}>
      <div className="recent-trac-item-cont-a">
        {isLoading ? (
          <>
            <RecentLoading />
            <RecentLoading />
          </>
        ) : (
          <>
            {recentTransactionItem.length === 0 ? (
              <div className="empty-cont">
                <Box pb={10}></Box>
                <img src={emptyImage} alt="JSON Image" />
                {recentTransactionItem.length === 0 ? (
                  <p>
                    Oops! It looks like you currently don't have any transaction
                    at the moment.
                  </p>
                ) : (
                  <p>
                    {" "}
                    Oops! It looks like you currently don't have any transaction
                    at the moment.
                  </p>
                )}
                <Box pb={10}></Box>
              </div>
            ) : (
              <>
                {recentTransactionItem?.map((eachTransaction, index) => {
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
                })}{" "}
              </>
            )}
          </>
        )}
      </div>
      <Box mt={30}></Box>
    </div>
  );
};

export default TransactionPage;
