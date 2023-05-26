import React, { useState } from "react";
import "./Contract.scss";
import Add from "../../images/new.svg";
import Seller from "../../images/seller.svg";
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
} from "@chakra-ui/react";
import BaseModalHeader from "../Shared/Headers/BaseModalHeader";
import ContractTile from "./ContractTile";
import BaseFilledButton from "../Shared/Button/BaseFilledButton";
import CreateContract from "./CreateContract";

const Contract = ({ refreshContracts }) => {
  const [contractType, setContractType] = useState("");
  const [contractFormOpen, setContractFormOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createContractForm = (contractType) => {
    setContractType(contractType);
    onClose();
    setContractFormOpen(true);
    onOpen();
  };

  return (
    <>
      <div className="fixed-add-btn" onClick={onOpen}>
        <img src={Add} alt="" />
      </div>

      {contractFormOpen == true ? (
        <>
          {" "}
          <CreateContract
            isOpen={isOpen}
            onClose={() => {
              setContractFormOpen(false);
              onClose();
            }}
            contractType={contractType.toLowerCase}
            refreshContracts={refreshContracts}
          />
        </>
      ) : (
        <>
          {" "}
          <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody p={0}>
                <div className="contract-cont-whole">
                  <BaseModalHeader
                    title={"Create Contract"}
                    description={
                      "Create a contract to continue a transaction and monitor every transaction without being scammed"
                    }
                  />
                  <Box mt={10} mb={10}></Box>
                  <Box mt={10} mb={10}></Box>

                  <ContractTile
                    Image={Seller}
                    title="Seller"
                    description="Create a contract as a seller of a good"
                    onClick={() => createContractForm("Seller")}
                  />
                  <Box mt={5}></Box>

                  <ContractTile
                    Image={Seller}
                    title="Buyer"
                    description="Create a contract as a buyer of a good"
                    onClick={() => createContractForm("Buyer")}
                  />
                  <Box mt={10} mb={10}></Box>
                  <Box mt={10} mb={10}></Box>

                  <BaseFilledButton
                    label="Continue"
                    type="submit"
                    onClick={console.log("here")}
                  />
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Contract;
