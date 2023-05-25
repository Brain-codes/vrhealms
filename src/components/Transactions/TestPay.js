import React, { useState } from "react";
import axios from "axios";
// import { message } from "antd";
// import { Spinner } from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";
const URL = "https://bac.solarcredit.io/v0.1/api";
const APP_TOKEN =
  "vjh35vj3hv5jhv56jh5v6jhv56jh3v6j3hv6jhvj3hvuu3yg5uygu3y5guyg5uyuhb5uh";
const userData = JSON.parse(localStorage.getItem("userData"));

export const PaystackHookExample = ({
  amount,
  text,
  email,
  setIsModalOpen,
  getUserData,
}) => {
  const [payLoader, setPayLoader] = useState(false);

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference.status === "success") {
      return handleSuccess(reference);
    } else {
      return handleSuccess(reference);
    }
  };

  //Function to call after sucessfull purchase
  const handleSuccess = async (payload) => {
    setPayLoader(true);
    try {
      const res = await axios.post(
        `${URL}/p/verifyToFundWallet`,
        {
          apptoken: APP_TOKEN,
          usertoken: userData.usertoken,
          reference: payload.reference,
          amount: amount,
          amountToPay: amount,
        },
        {
          headers: { Authorization: `Bearer 6455ef91d108f` },
        }
      );
      getUserData();
      setPayLoader(false);
      setIsModalOpen(false);
      if (res.data.success) {
        // message.success("Transaction Sucessfull");
      } else {
        // message.info(res.data.message);
      }
    } catch (error) {
      setPayLoader(false);
      setIsModalOpen(false);
      //   message.error(error.message);
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // message.info("Payment Cancelled");
  };

  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100,
    publicKey: "pk_test_ccd9d31670a4e4be4917412334639e338067d4be",
  });
  return (
    <button
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
    >
      {payLoader ? (
        <span className="visually-hidden">Loading...</span>
      ) : (
        <>HAAA</>
      )}
    </button>
  );
};
