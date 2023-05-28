import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import "./LoadingState.scss";

export const TransactionItemLoading = () => {
  return (
    <div className="each-transaction-cont">
      <div className="img-name">
        <Skeleton height="50px" width="50px" />
        <Skeleton height="20px" width="180px" ml={4} />
      </div>
      <Skeleton height="20px" width="10%" />
      <Skeleton height="20px" width="10%" />
      <Skeleton height="20px" width="10%" />
      <Skeleton height="20px" width="20%" />
    </div>
  );
};

export const ContractLoading = () => {
  return (
    <div>
      <Skeleton height="30px" width="30%" />
      <Box pb={5}></Box> <Skeleton height="10px" width="100%" />
      <Box pb={2}></Box> <Skeleton height="10px" width="80%" />{" "}
      <Box pb={2}></Box>
      <Skeleton height="10px" width="50%" /> <Box pb={2}></Box>
      <Skeleton height="10px" width="10%" /> <Box pb={2}></Box>
    </div>
  );
};
