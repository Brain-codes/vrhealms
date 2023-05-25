import React, { useEffect, useState } from "react";
import "./Transactions.scss";
import Search from "../../images/search.svg";
import EachTransaction from "./EachTransaction";
import { generateFormattedDate } from "../Dashboard/Service/DashboardService";
import { TransactionItemLoading } from "../Shared/Loading/LoadingState";
import { usePaystackPayment } from "react-paystack";

const Transactions = ({ contractItem, loadingState }) => {
  const user = JSON.parse(localStorage.getItem("vrhealms"));
  const publicKey = process.env.REACT_APP_PAYSTACT_API_KEY;

  const onSuccess = (reference) => {
    if (reference.status === "success") {
    } else {
    }
  };
  const onClosePayment = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("Payment Cancelled");
  };
  const config = (amount, key) => {
    console.log(key);
    return {
      reference: new Date().getTime().toString(),
      email: user.email,
      amount: amount * 100,
      publicKey: "pk_test_a1843516da79bb8c9fc783a6c34c674611c32e40",
    };
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <div className="transactions-whole-cont">
      <div className="top-transc-with-search">
        <h1>Transactions</h1>

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
              <h1>empty list</h1>
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
                    initPay={() => {
                      config(totalPrice, publicKey);
                      initializePayment(onSuccess, onClosePayment);
                    }}
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
