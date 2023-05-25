import React, { useEffect, useState } from "react";
import { post } from "../Service/Service";
import "./Auth.scss";
import BluredLogo from "../../images/blured_logo.png";
import Logo from "../../images/text_logo.svg";
import AuthHeader from "../Shared/Auth/AuthHeader";
import { Box } from "@chakra-ui/react";
import BaseInput from "../Shared/Input/BaseInput";
import { Link, useNavigate } from "react-router-dom";
import BaseFilledButton from "../Shared/Button/BaseFilledButton";
import { useToast } from "@chakra-ui/react";
import LoadingButton from "../Shared/Button/LoadingButton";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast({
    isClosable: true,
    position: "bottom-left",
    variant: "solid",
    duration: 9000,
  });
  const _handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await post("auth/login", {
        email: email,
        password: password,
      });
      setIsLoading(false);
      if (response.success == true) {
        toast({
          title: "Login Successful",
          description: response.message,
          status: "success",
        });
        localStorage.setItem("vrhealms", JSON.stringify(response.data));
        navigate("/dashboard");
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
        <Box mt={40}></Box>
        <form className="auth-form-container" onSubmit={_handleLogin}>
          <AuthHeader
            title={"Welcome Back!"}
            description={"Please, enter your details to continue."}
          />
          <Box mt={20}></Box>
          <BaseInput
            label={"Email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Box mt={5}></Box>
          <BaseInput
            label={"Password"}
            type={"password"}
            placeholder={"Example@1234"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Box mt={30}></Box>

          <div className="fg-pw">
            <p>Forgot My Password</p>
          </div>
          <Box mt={30}></Box>
          {isLoading ? (
            <>
              <LoadingButton color="#5c84db" />
            </>
          ) : (
            <>
              <BaseFilledButton label={"Login"} />
            </>
          )}
          <Box mt={30}></Box>

          <div className="auth-footer">
            <p>Don’t have an account</p>
            <Box ml={2}></Box>
            <Link to="/signup">
              <h6>Sign up</h6>
            </Link>
          </div>
        </form>
        <Box mt={30}></Box>
        <Box mt={10}></Box>
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

export default Login;
