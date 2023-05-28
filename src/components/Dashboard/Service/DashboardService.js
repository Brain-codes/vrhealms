import { get, post, put } from "../../Service/Service";
import { usePaystackPayment } from "react-paystack";
const publicKey = process.env.REACT_APP_CLOUDINARY_API_SECRET;
const user = JSON.parse(localStorage.getItem("vrhealms"));

export const getAllContracts = async (userId, toast) => {
  try {
    const response = await get("contracts", { id: userId });
    if (response.success === true) {
      return response.contracts;
    } else {
      toast({
        title: "Incorrect Credentials",
        description: response.message,
        status: "error",
      });
      return [];
    }
  } catch (error) {
    toast({
      title: "Oops",
      description: error.message,
      status: "error",
    });
    return [];
  }
};

export const makePayment = async (contractId, toast, reference, amount) => {
  try {
    const response = await post("payments", {
      contractId: contractId,
      email: user.email,
      paymentData: {
        ...reference,
        amount,
        transaction_date: new Date(),
      },
    });
    if (response.success === true) {
      toast({
        title: "Payment",
        description: response.message,
        status: "success",
      });
      return response.contracts;
    } else {
      toast({
        title: "Incorrect Credentials",
        description: response.message,
        status: "error",
      });
      return [];
    }
  } catch (error) {
    toast({
      title: "Oops",
      description: error.message,
      status: "error",
    });
    return [];
  }
};

export const getContractDetails = async (userId, toast, contractId) => {
  try {
    const response = await post(
      "contracts/getsinglecontract",
      { contractId: contractId },
      { id: userId, contractId: contractId }
    );
    if (response.success === true) {
      return response.data;
    } else {
      toast({
        title: "Incorrect Credentials",
        description: response.message,
        status: "error",
      });
      return [];
    }
  } catch (error) {
    toast({
      title: "Oops",
      description: error.message,
      status: "error",
    });
    return [];
  }
};

export const updateContract = async (
  userId,
  toast,
  contractId,
  contractStatus
) => {
  try {
    const response = await put(
      "contracts",
      { id: userId },
      { contractId: contractId, contractStatus: contractStatus }
    );
    if (response.success === true) {
      toast({
        title: "Updated",
        description: response.message,
        status: "success",
      });
      return response.data;
    } else {
      toast({
        title: "Oops",
        description: response.message,
        status: "error",
      });
      return [];
    }
  } catch (error) {
    toast({
      title: "Oops",
      description: error.message,
      status: "error",
    });
    return [];
  }
};

export const getUserDate = async (userId, toast) => {
  try {
    const response = await post("auth/getuserdata", { id: userId });
    if (response.success === true) {
      return response.data;
    } else {
      toast({
        title: "Incorrect Credentials",
        description: response.message,
        status: "error",
      });
      return [];
    }
  } catch (error) {
    toast({
      title: "Oops",
      description: error.message,
      status: "error",
    });
    return [];
  }
};

export const generateStatusWithColor = (roleIn, statusIn) => {
  if ((roleIn === "Buyer" || roleIn === "buyer") && statusIn === 0) {
    return {
      textColor: "#FF3838 ",
      bgColor: "#ff383830",
      statusText: "Unpaid",
    };
  } else if ((roleIn === "Buyer" || roleIn === "buyer") && statusIn === 1) {
    return {
      textColor: "#FFB302",
      bgColor: "#ffb30336",
      statusText: "Paid",
    };
  } else if ((roleIn === "Buyer" || roleIn === "buyer") && statusIn === 2) {
    return {
      textColor: "#56F000",
      bgColor: "#56f00033",
      statusText: "Pending",
    };
  } else if ((roleIn === "Buyer" || roleIn === "buyer") && statusIn === 3) {
    return {
      textColor: "#2DCCFF",
      bgColor: "#5bd6fc29",
      statusText: "Delivered",
    };
  } else if ((roleIn === "Seller" || roleIn === "seller") && statusIn === 0) {
    return {
      textColor: "#FF3838",
      bgColor: "#ff383830",
      statusText: "Unpaid",
    };
  } else if ((roleIn === "Seller" || roleIn === "seller") && statusIn === 1) {
    return {
      textColor: "#FFB302  ",
      bgColor: "#ffb30336",
      statusText: "Paid",
    };
  } else if ((roleIn === "Seller" || roleIn === "seller") && statusIn === 2) {
    return {
      textColor: "#56F000",
      bgColor: "#56f00033",
      statusText: "Dispatched",
    };
  } else if ((roleIn === "Seller" || roleIn === "seller") && statusIn === 3) {
    return {
      textColor: "#2DCCFF",
      bgColor: "#5bd6fc29",
      statusText: "Delivered",
    };
  } else {
    return { textColor: "#FF3838", bgColor: "", statusText: "" };
  }
};

export const generateUpdateStatusWithColor = (roleIn, statusIn) => {
  statusIn++;
  var newStatus = statusIn;
  if (roleIn === "Buyer" || roleIn === "buyer") {
    if (statusIn === 0) {
      return {
        textColor: "#FF3838",
        bgColor: "#ff383830",
        statusText: "Unpaid",
        newStatus: newStatus,
      };
    } else if (statusIn === 1) {
      return {
        textColor: "#FFB302",
        bgColor: "#ffb30336",
        statusText: "Pay",
        newStatus: newStatus,
        clickable: true,
      };
    } else if (statusIn === 2) {
      return {
        textColor: "#56F000",
        bgColor: "#56f00033",
        statusText: "Awaiting Dispatched",
        newStatus: newStatus,
        clickable: false,
      };
    } else if (statusIn === 3) {
      return {
        textColor: "#2DCCFF",
        bgColor: "#5bd6fc29",
        statusText: "Confirm Delivery",
        newStatus: newStatus,
        clickable: true,
      };
    } else if (statusIn === 4) {
      return {
        textColor: "#2DCCFF",
        bgColor: "#5bd6fc29",
        statusText: "Contract Resolved",
        newStatus: newStatus,
        clickable: false,
      };
    }
  } else if (roleIn === "Seller" || roleIn === "seller") {
    if (statusIn === 0) {
      return {
        textColor: "#FF3838",
        bgColor: "#ff383830",
        statusText: "Unpaid",
        newStatus: newStatus,
      };
    } else if (statusIn === 1) {
      return {
        textColor: "#FFB302",
        bgColor: "#ffb30336",
        statusText: "Awaiting Payment",
        newStatus: newStatus,
        clickable: false,
      };
    } else if (statusIn === 2) {
      return {
        textColor: "#56F000",
        bgColor: "#56f00033",
        statusText: "Dispach Goods",
        newStatus: newStatus,
        clickable: true,
      };
    } else if (statusIn === 3) {
      return {
        textColor: "#2DCCFF",
        bgColor: "#5bd6fc29",
        statusText: "Awaiting Delivery",
        newStatus: newStatus,
        clickable: false,
      };
    } else if (statusIn === 4) {
      return {
        textColor: "#2DCCFF",
        bgColor: "#5bd6fc29",
        statusText: "Contract Resolved",
        newStatus: newStatus,
        clickable: false,
      };
    }
  }

  return { textColor: "#FF3838", bgColor: "", statusText: "" };
};

export const generateFormattedAmount = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const generateFormattedDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};
