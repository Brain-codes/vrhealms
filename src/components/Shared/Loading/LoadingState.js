import {
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
