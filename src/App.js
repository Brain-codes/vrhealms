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

function App() {
  return (
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
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
