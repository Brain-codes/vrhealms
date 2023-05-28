import React, { useState } from "react";
import axios from "axios";
import { usePaystackPayment } from "react-paystack";
import { useToast } from "@chakra-ui/react";
import { makePayment } from "../Dashboard/Service/DashboardService";
const user = JSON.parse(localStorage.getItem("vrhealms"));
const publicKey = process.env.REACT_APP_PAYSTACT_API_KEY;

export const PaystackPaymentButton = ({
  amount,
  bgColorUpdate,
  textColorUpdate,
  statusTextUpdate,
  closeModals,
  contractId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });

  const onSuccess = (reference) => {
    console.log(reference);
    return makePaymentOnline(reference);
  };

  const makePaymentOnline = async (reference) => {
    setIsLoading(true);
    try {
      await makePayment(contractId, toast, reference, amount);
      closeModals();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onClosePayment = () => {
    closeModals();
    toast({
      title: "Payment",
      description: "You have canceled you payment",
      status: "info",
    });
  };

  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: amount * 100,
    publicKey: publicKey,
  });

  console.log(publicKey);
  return (
    <button
      style={{ backgroundColor: bgColorUpdate }}
      className="transac-status-details"
      onClick={() => {
        initializePayment(onSuccess, onClosePayment);
      }}
    >
      <p style={{ color: textColorUpdate }}>
        {isLoading ? "Paying.." : statusTextUpdate}
      </p>
    </button>
  );
};
