import React, { useEffect, useState } from "react";
import User from "../../images/user-logo.svg";
import More from "../../images/more-vertical.svg";
import {
  generateFormattedAmount,
  generateStatusWithColor,
} from "../Dashboard/Service/DashboardService";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ViewContract from "./ViewContract";

const EachTransaction = ({
  name,
  productName,
  role,
  amount,
  date,
  status,
  id,
  textColor,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgColor, statusText } = generateStatusWithColor(role, status);
  const [contractDetailsOpen, setContractDetailsOpen] = useState(false);

  const viewContractDetails = () => {
    setContractDetailsOpen(true);
    onOpen();
  };

  return (
    <div
      className="each-transaction-cont"
      style={{ borderLeftColor: textColor }}
    >
      <style jsx>{`
        @media (max-width: 510px) {
          .each-transaction-cont {
            border-left: 5px solid ${textColor};
          }
        }
      `}</style>
      <div className="img-name">
        <img className="item-image" src={User} alt="" />
        <div className="name-time">
          <h2> {productName}</h2>
          <p>{name}</p>
        </div>
      </div>
      <p
        className="type"
        style={{
          textTransform: "capitalize",
        }}
      >
        {role}
      </p>
      <div style={{ backgroundColor: bgColor }} className="transac-status">
        <p style={{ color: textColor }}>{statusText}</p>
      </div>
      <p className="date">{date}</p>
      <p className="amount">&#8358;{generateFormattedAmount(amount)}</p>
      <div className="details-btn" onClick={viewContractDetails}>
        Details
      </div>
      <div className="details-img">
        <Menu>
          <MenuButton>
            {" "}
            <img src={More} alt="" className="details-img" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={viewContractDetails}>View Contract</MenuItem>
          </MenuList>
        </Menu>
      </div>
      {contractDetailsOpen == true ? (
        <>
          {" "}
          <ViewContract
            isOpen={isOpen}
            onClose={() => {
              setContractDetailsOpen(false);
              onClose();
            }}
            id={id}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EachTransaction;
