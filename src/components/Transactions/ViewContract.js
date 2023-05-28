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
  generateFormattedAmount,
  generateFormattedDate,
  generateStatusWithColor,
  generateUpdateStatusWithColor,
  getContractDetails,
  initializePaystack,
  updateContract,
} from "../Dashboard/Service/DashboardService";
import { usePaystackPayment } from "react-paystack";
import DetailsTile from "./DetailsTile";
import { PaystackPaymentButton } from "./CreatePayment";
import { LoadingStatusButton } from "../Shared/Button/LoadingButton";
import { ContractLoading } from "../Shared/Loading/LoadingState";

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
    clickable,
  } = generateUpdateStatusWithColor(
    contractDetailsData.invoiceRole,
    contractDetailsData.contractStatus
  );
  //END

  //UPDATE CONTRACT
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const handleUpdateContract = async () => {
    setIsLoadingUpdate(true);
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
      setIsLoadingUpdate(false);
    }
  };
  //END

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
              <>
                <ContractLoading />
                <Box pb={10}></Box>
                <Divider mt={5} mb={7} /> <ContractLoading />
                <Box pb={10}></Box>
                <Divider mt={5} mb={7} /> <ContractLoading />
              </>
            ) : (
              <>
                <DetailsTile
                  title="Contract Title"
                  value={contractDetailsData.invoiceTitle}
                />
                <Divider mt={5} mb={7} />{" "}
                <DetailsTile
                  title="Product Name"
                  value={contractDetailsData.productName}
                />
                <DetailsTile
                  title="Product Description"
                  value={contractDetailsData.productDesc}
                />
                <DetailsTile
                  title="Date Initiated"
                  value={`${generateFormattedDate(
                    contractDetailsData?.createdAt ?? ""
                  )}`}
                />
                <Divider mt={5} mb={7} />{" "}
                <DetailsTile
                  title="Name"
                  value={contractDetailsData?.invoiceAlpha?.fullname}
                />
                <DetailsTile
                  title="Email"
                  value={contractDetailsData?.invoiceAlpha?.email}
                />
                <Divider mt={5} mb={7} />{" "}
                <DetailsTile
                  title="Recipient Name"
                  value={contractDetailsData?.recipientName}
                />
                <Flex color="white" gap={0} wrap={"wrap"}>
                  <DetailsTile
                    title="Recipient Email"
                    value={contractDetailsData?.recipientEmail}
                  />
                  <Box pr={10}></Box>{" "}
                  <DetailsTile
                    title="Recipient Number"
                    value={contractDetailsData?.recipientNumber}
                  />
                </Flex>
                <Divider mt={5} mb={7} />
                <Flex
                  color="white"
                  gap={0}
                  wrap={"wrap"}
                  justifyContent={"space-between"}
                >
                  <DetailsTile
                    title="Quantity"
                    value={contractDetailsData?.productQty}
                  />
                  <DetailsTile
                    title="Price"
                    value={`N${generateFormattedAmount(
                      contractDetailsData?.productPrice ?? 0
                    )}`}
                  />
                  <DetailsTile
                    title="Delivery Price"
                    value={`N${generateFormattedAmount(
                      contractDetailsData?.deliveryPrice ?? 0
                    )}`}
                  />
                </Flex>
                <Divider mt={5} mb={7} />
                <DetailsTile
                  title="Total Price"
                  value={`N${generateFormattedAmount(
                    contractDetailsData?.totalPrice ?? 0
                  )}`}
                />
                <Divider mt={5} mb={7} />
                <Flex
                  color="white"
                  gap={20}
                  wrap={"wrap"}
                  className="update-contract-cont"
                >
                  <Flex color="white" gap={2} wrap={true}>
                    <h2>Status:</h2>
                    <p style={{ color: textColor }}>{statusText}</p>
                  </Flex>
                  <Flex color="white" gap={2} wrap={true}>
                    <h2>Role:</h2>
                    <p style={{ textTransform: "capitalize" }}>
                      {contractDetailsData.invoiceRole}
                    </p>
                  </Flex>
                </Flex>
                <Divider mt={5} mb={7} />
                {newStatus === 1 ? (
                  <>
                    {contractDetailsData.invoiceRole == "buyer" ? (
                      <>
                        {contractDetailsData.totalPrice && (
                          <PaystackPaymentButton
                            amount={contractDetailsData?.totalPrice}
                            bgColorUpdate={bgColorUpdate}
                            textColorUpdate={textColorUpdate}
                            statusTextUpdate={statusTextUpdate}
                            closeModals={onClose}
                            contractId={contractDetailsData?.contractId}
                          />
                        )}
                      </>
                    ) : (
                      <button
                        style={{
                          backgroundColor: bgColorUpdate,
                          cursor: "progress",
                        }}
                        className="transac-status-details"
                      >
                        <p style={{ color: textColorUpdate }}>
                          {statusTextUpdate}
                        </p>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {clickable ? (
                      <>
                        {isLoadingUpdate ? (
                          <>
                            <LoadingStatusButton
                              color={textColorUpdate}
                              bgColor={bgColorUpdate}
                            />
                          </>
                        ) : (
                          <div
                            style={{ backgroundColor: bgColorUpdate }}
                            className="transac-status-details"
                            onClick={() => {
                              handleUpdateContract();
                            }}
                          >
                            <p style={{ color: textColorUpdate }}>
                              {statusTextUpdate}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        style={{
                          backgroundColor: bgColorUpdate,
                          cursor: "progress",
                        }}
                        className="transac-status-details"
                      >
                        <p style={{ color: textColorUpdate }}>
                          {statusTextUpdate}
                        </p>
                      </div>
                    )}
                    {/* {contractDetailsData.status == 1 ? (
                      <>
                        <p>Please wait while seler dispatches the product</p>
                        <Box pb={3}></Box>
                        <div
                          style={{ backgroundColor: bgColorUpdate }}
                          className="transac-status-details"
                          onClick={() => {
                            console.log("first");
                          }}
                        >
                          <p style={{ color: textColorUpdate }}>
                            {statusTextUpdate}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{ backgroundColor: bgColorUpdate }}
                          className="transac-status-details"
                          onClick={() => {
                            console.log("first");
                          }}
                        >
                          <p style={{ color: textColorUpdate }}>
                            {statusTextUpdate}
                          </p>
                        </div>
                      </>
                    )} */}
                  </>
                )}
              </>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewContract;
