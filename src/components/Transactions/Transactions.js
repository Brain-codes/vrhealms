import React, { useEffect, useState } from "react";
import "./Transactions.scss";
import Search from "../../images/search.svg";
import EachTransaction from "./EachTransaction";
import { generateFormattedDate } from "../Dashboard/Service/DashboardService";
import { TransactionItemLoading } from "../Shared/Loading/LoadingState";

const Transactions = ({ contractItem, loadingState }) => {
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
