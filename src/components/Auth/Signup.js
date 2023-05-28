import React, { useState } from "react";
import { post } from "../Service/Service";
import "./Auth.scss";
import BluredLogo from "../../images/blured_logo.png";
import Logo from "../../images/text_logo.svg";
import AuthHeader from "../Shared/Auth/AuthHeader";
import { Box } from "@chakra-ui/react";
import BaseInput from "../Shared/Input/BaseInput";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import BaseFilledButton from "../Shared/Button/BaseFilledButton";
import {LoadingButton} from "../Shared/Button/LoadingButton";

const Signup = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });
  const _handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await post("auth/register", {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      });
      setIsLoading(false);
      if (response.success == true) {
        toast({
          title: "Signup Successful",
          description: response.message,
          status: "success",
        });
        navigate("/login");
      } else {
        toast({
          title: "Incorrect Credentials",
          description: response.message,
          status: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Oops",
        description: error.message,
        status: "error",
      });
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="top-auth">
          <img src={Logo} alt="logo" />
        </div>
        <Box mt={30}></Box>
        <Box mt={5}></Box>
        <Box mt={5}></Box>

        <form className="auth-form-container" onSubmit={_handleSignUp}>
          <AuthHeader
            title={"Create Account!"}
            description={
              "Please, enter your details to create an account with us."
            }
          />
          <Box mt={20}></Box>
          <BaseInput
            label={"Full Name"}
            type={"text"}
            placeholder={"John Doe"}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <Box mt={5}></Box>
          <BaseInput
            label={"Email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Box mt={5}></Box>
          <BaseInput
            label={"Phone Number"}
            type={"number"}
            placeholder={"09012345678"}
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
          <Box mt={5}></Box>
          <BaseInput
            label={"Password"}
            type={"password"}
            placeholder={"Example@1234"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Box mt={20}></Box>
          {isLoading ? (
            <>
              <LoadingButton color="#5c84db" />
            </>
          ) : (
            <>
              <BaseFilledButton label="Sign Up" type="submit" />{" "}
            </>
          )}
          <Box mt={30}></Box>
          <div className="auth-footer">
            <p>Already have an account</p>
            <Box ml={2}></Box>
            <Link to="/login">
              <h6>Login</h6>
            </Link>{" "}
          </div>
        </form>
        <Box mt={30}></Box>
        <Box mt={5}></Box>
        <Box mt={5}></Box>

        <div className="footer-copyrite">
          <p>&#169; Brain Creatives</p>
        </div>
      </div>
      <div className="auth-right">
        <img src={BluredLogo} alt="logo" />
      </div>
    </div>
  );
};

export default Signup;
