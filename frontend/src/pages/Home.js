import { React } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <h1>This is home page</h1>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
