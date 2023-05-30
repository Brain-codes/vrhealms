import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";
import Signup from "./components/Auth/Signup";
import ScrollToTop from "./components/Wrapper/ScrollToTop";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthenticatedWrapper from "./components/Wrapper/AuthenticatedWrapper";
import Layout from "./components/Navbar/Layout";
import { PaystackHookExample } from "./components/Transactions/TestPay";
import ContractScreen from "./pages/ContractPage/ContractScreen";
import ErrorPage from "./pages/404/ErrorPage";
import TransactionPage from "./pages/TransactionPage/TransactionPage";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Wrapper>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <Layout pageLocation="Dashboard">
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/contracts"
              element={
                <Layout pageLocation="Contracts">
                  <ContractScreen />
                </Layout>
              }
            />
            <Route
              path="/transactions"
              element={
                <Layout pageLocation="Transactions">
                  <TransactionPage />
                </Layout>
              }
            />
            <Route path="/pay" element={<PaystackHookExample />} />

            {/* Wildcard route for 404 errors */}
            <Route
              path="*"
              element={
                // <Layout pageLocation="404">
                <ErrorPage />
                // {/* </Layout> */}
              }
            />
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}

export default App;
