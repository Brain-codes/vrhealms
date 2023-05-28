import React, { useEffect, useState } from "react";
import "./Transactions.scss";
import Search from "../../images/search.svg";
import EachTransaction from "./EachTransaction";
import { generateFormattedDate } from "../Dashboard/Service/DashboardService";
import { TransactionItemLoading } from "../Shared/Loading/LoadingState";
import { usePaystackPayment } from "react-paystack";
import { Box } from "@chakra-ui/react";
import emptyImage from "../../images/123936-empty-ghost.gif";

const Transactions = ({ contractItem, loadingState }) => {
  return (
    <div className="transactions-whole-cont">
      <div className="top-transc-with-search">
        <h1>All Contracts</h1>

        <div className="search-cont">
          <img src={Search} alt="" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      {loadingState ? (
        <>
          <TransactionItemLoading />
          <TransactionItemLoading />
          <TransactionItemLoading />
          <TransactionItemLoading />
        </>
      ) : (
        <>
          {contractItem.length <= 0 ? (
            <>
              <div className="empty-cont">
                <Box pb={10}></Box>
                <img src={emptyImage} alt="JSON Image" />
                {/* <Box pb={10}></Box> */}
                <p>
                  Oops! It looks like you currently don't have any contract at
                  the moment{" "}
                </p>
                <Box pb={10}></Box>
              </div>
            </>
          ) : (
            <>
              {" "}
              {contractItem?.map((eachContract, index) => {
                const {
                  recipientName,
                  invoiceRole,
                  createdAt,
                  contractId,
                  contractStatus,
                  productName,
                  totalPrice,
                  title,
                } = eachContract;
                return (
                  <EachTransaction
                    key={contractId}
                    name={recipientName}
                    role={invoiceRole}
                    productName={productName}
                    amount={totalPrice}
                    date={generateFormattedDate(createdAt)}
                    status={contractStatus}
                    id={contractId}
                  />
                );
              })}
            </>
          )}
        </>
      )}

      {/* <EachTransaction />
      <EachTransaction /> */}
    </div>
  );
};

export default Transactions;
