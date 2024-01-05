import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        console.log("Token not found, redirecting to login");
        navigate("/login");
      }
      try {
        const { data } = await axios.get(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);

        if (status) {
          toast(`Hello ${user}`, { position: "top-right" });
        } else {
          console.log("Server returned status: 0, redirecting to login");
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during cookie verification:", error);

        if (error.response) {
          // The request was made, but the server responded with an error
          console.error("Server responded with:", error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
        }

        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, []);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <h1>This is home page</h1>
      </div>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
