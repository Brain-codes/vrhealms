import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Flex,
  Spacer,
  Wrap,
  WrapItem,
  useToast,
  Divider,
  Heading,
} from "@chakra-ui/react";
import BaseModalHeader from "../Shared/Headers/BaseModalHeader";
import {
  generateStatusWithColor,
  generateUpdateStatusWithColor,
  getContractDetails,
  initializePayment,
  initializePaystack,
  updateContract,
} from "../Dashboard/Service/DashboardService";
import { usePaystackPayment } from "react-paystack";
import { PaystackButton } from "react-paystack";
import DetailsTile from "./DetailsTile";
const ViewContract = ({ isOpen, onClose, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("vrhealms"));
  const [contractDetailsData, setContractDetailsData] = useState([]);
  const publicKey = process.env.REACT_APP_PAYSTACT_API_KEY;

  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });

  useEffect(() => {
    fetchContractDetails();
  }, []);

  //FETCH CONTRACT DETAILS
  const fetchContractDetails = async () => {
    setIsLoading(true);
    try {
      const contractDetails = await getContractDetails(user.id, toast, id);
      setContractDetailsData(contractDetails);
      console.log(contractDetailsData.invoiceAlpha.fullname);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  //END

  //FETCH STATUSES

  const { textColor, bgColor, statusText } = generateStatusWithColor(
    contractDetailsData.invoiceRole,
    contractDetailsData.contractStatus
  );

  const {
    textColor: textColorUpdate,
    bgColor: bgColorUpdate,
    statusText: statusTextUpdate,
    newStatus,
  } = generateUpdateStatusWithColor(
    contractDetailsData.invoiceRole,
    contractDetailsData.contractStatus
  );
  //END

  //UPDATE CONTRACT
  const handleUpdateContract = async () => {
    setIsLoading(true);
    try {
      const contractDetails = await updateContract(
        user.id,
        toast,
        id,
        newStatus
      );
      fetchContractDetails();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  //END

  const onSuccess = (reference) => {
    if (reference.status === "success") {
    } else {
    }
  };
  const onClosePayment = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("Payment Cancelled");
  };

  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: contractDetailsData.totalPrice * 100,
    publicKey: publicKey,
  });

  const initP = () => {
    initializePayment(onSuccess, onClosePayment);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <ModalCloseButton />
          <div className="contract-cont-whole">
            <BaseModalHeader
              title="Contract Details"
              description="Full Details of this current product"
            />
            <Divider mt={5} mb={7} />{" "}
            {isLoading ? (
              <>LOADING OOO</>
            ) : (
              <>
                <DetailsTile
                  title="Contract Title"
                  value={contractDetailsData.invoiceTitle}
                />
                <DetailsTile
                  title="Goods Description"
                  value={contractDetailsData.productDesc}
                />
                <Divider mt={5} mb={7} />{" "}
                <DetailsTile
                  title="Buyer's Name"
                  value={contractDetailsData?.invoiceAlpha?.fullname}
                />
                <DetailsTile
                  title="Buyer's email"
                  value={contractDetailsData?.invoiceAlpha?.email}
                />
                <Divider mt={5} mb={7} />{" "}
                <DetailsTile
                  title="Seller's Name"
                  value={contractDetailsData?.recipientName}
                />
                <Flex color="white" gap={10} wrap={true}>
                  <DetailsTile
                    title="Seller's email"
                    value={contractDetailsData?.recipientEmail}
                  />
                  <DetailsTile
                    title="Seller's email"
                    value={contractDetailsData?.recipientNumber}
                  />
                </Flex>
                <Divider mt={5} mb={7} />
                <Flex
                  color="white"
                  gap={10}
                  wrap={true}
                  className="update-contract-cont"
                >
                  <h2>Status:</h2>
                  <p style={{ color: textColor }}>{statusText}</p>
                </Flex>
                <Divider mt={5} mb={7} />
                <div
                  style={{ backgroundColor: bgColorUpdate }}
                  className="transac-status-details"
                  onClick={() => {
                    initializePayment(onSuccess, onClosePayment);
                  }}
                >
                  <p style={{ color: textColorUpdate }}>{statusTextUpdate}</p>
                </div>
              </>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewContract;
