import React, { useEffect, useState } from "react";
import Transactions from "../../components/Transactions/Transactions";
import { getAllContracts } from "../../components/Dashboard/Service/DashboardService";
import { Box, useToast } from "@chakra-ui/react";
import Contract from "../../components/Contract/Contract";

const ContractScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contractItem, setContractItem] = useState([]);
  const user = JSON.parse(localStorage.getItem("vrhealms"));

  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });
  const fetchContracts = async () => {
    setIsLoading(true);
    try {
      const contracts = await getAllContracts(user.id, toast);
      setContractItem(contracts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div>
      <Transactions contractItem={contractItem} loadingState={isLoading} />

      <Box pb={10}></Box>
      <Contract refreshContracts={fetchContracts} />
    </div>
  );
};

export default ContractScreen;
