import React, { useEffect, useState } from "react";
import "./Transactions.scss";
import Search from "../../images/search.svg";
import EachTransaction from "./EachTransaction";
import { generateFormattedDate, generateStatusWithColor } from "../Dashboard/Service/DashboardService";
import { TransactionItemLoading } from "../Shared/Loading/LoadingState";
import { usePaystackPayment } from "react-paystack";
import { Box } from "@chakra-ui/react";
import emptyImage from "../../images/123936-empty-ghost.gif";

const Transactions = ({ contractItem, loadingState }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for storing the search term
  const filteredContracts = contractItem.filter((contract) =>
    contract.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transactions-whole-cont">
      <div className="top-transc-with-search">
        <h1>All Contracts</h1>

        <div className="search-cont">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
          {filteredContracts.length === 0 ? (
            <>
              <div className="empty-cont">
                <Box pb={10}></Box>
                <img src={emptyImage} alt="JSON Image" />
                {contractItem.length === 0 ? (
                  <p>
                    Oops! It looks like you currently don't have any contract at
                    the moment.
                  </p>
                ) : (
                  <p>Oops! No contracts match your search.</p>
                )}
                <Box pb={10}></Box>
              </div>
            </>
          ) : (
            <>
              {" "}
              {filteredContracts.map((eachContract, index) => {
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
                const { textColor } = generateStatusWithColor(
                  invoiceRole,
                  contractStatus
                );
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
                    textColor={textColor} // Pass the textColor as a prop
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Transactions;
