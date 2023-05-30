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
} from "@chakra-ui/react";
import BaseModalHeader from "../Shared/Headers/BaseModalHeader";
import BaseInput from "../Shared/Input/BaseInput";
import BaseFilledButton from "../Shared/Button/BaseFilledButton";
import { post } from "../Service/Service";
import { useToast } from "@chakra-ui/react";
import { LoadingButton } from "../Shared/Button/LoadingButton";

const CreateContract = ({
  isOpen,
  onClose,
  contractType,
  refreshContracts,
}) => {
  const user = JSON.parse(localStorage.getItem("vrhealms"));
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [description, setDescription] = useState();
  const [invoiceTitle, setInvoiceTitle] = useState();
  const [productPrice, setProductPrice] = useState(null);
  const [productName, setProductName] = useState();
  const [productQuantity, setProductQuantity] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newContractType, setNewContractType] = useState(
    contractType == "buyer" ? "Seller" : "Buyer"
  );

  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });
  const _createContract = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await post("contracts", {
        invoiceTitle: invoiceTitle,
        invoiceAlpha: {
          fullname: user.name,
          email: user.email,
        },
        invoiceRole: contractType,
        recipientEmail: email,
        recipientName: `${firstName} ${lastName}`,
        recipientNumber: phoneNumber,
        productName: productName,
        productDesc: description,
        productPrice: productPrice,
        productQty: productQuantity,
        deliveryPrice: deliveryPrice,
      });
      setIsLoading(false);
      if (response.success == true) {
        toast({
          title: "Contract Created",
          description: response.message,
          status: "success",
        });
        onClose();
        refreshContracts();
        // window.location.reload();
      } else {
        toast({
          title: "Oops!",
          description: response.message,
          status: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Oops!",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <ModalCloseButton />
          <form className="contract-cont-whole" onSubmit={_createContract}>
            <BaseModalHeader
              title={`${contractType}'s contract`}
              description="Fill up the required field to continue and create a contract to continue transaction"
            />
            <Box mt={10} mb={10}></Box>
            <Box mt={10} mb={10}></Box>
            <Flex color="white" gap={2} wrap={true}>
              <BaseInput
                label={`${newContractType}'s First Name`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <BaseInput
                label={`${newContractType}'s Last Name`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Flex>
            <Box mt={5}></Box>
            <BaseInput
              label={`${newContractType}'s Email Address`}
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box mt={5}></Box>
            <BaseInput
              label="Invoice Title"
              value={invoiceTitle}
              onChange={(e) => setInvoiceTitle(e.target.value)}
            />
            <Box mt={5}></Box>
            <BaseInput
              label={`${newContractType}'s Phone Number`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Box mt={5}></Box>
            <BaseInput
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Box mt={5}></Box>

            <BaseInput
              label="Goods Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box mt={5}></Box>
            <Flex color="white" gap={2} wrap={true}>
              <BaseInput
                label="Goods Quantity"
                type={"number"}
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
              <BaseInput
                label="Price (₦)"
                type={"number"}
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              {/* <BaseInput label="Delivery Cost (₦)" type={"number"} /> */}
            </Flex>
            <Box mt={5}></Box>
            <Flex color="white" gap={2} wrap={true}>
              <BaseInput
                label="Delivery Cost (₦)"
                type={"number"}
                value={deliveryPrice}
                onChange={(e) => setDeliveryPrice(e.target.value)}
              />
              <BaseInput label="Total Amount (₦)" type={"number"} />
            </Flex>
            <Box mt={10} mb={10}></Box>
            <Box mt={10} mb={10}></Box>
            {isLoading ? (
              <>
                <LoadingButton color="#5c84db" />
              </>
            ) : (
              <>
                {" "}
                <BaseFilledButton
                  label="Create Contract"
                  type="submit"
                  onClick={console.log("here")}
                />
              </>
            )}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateContract;
