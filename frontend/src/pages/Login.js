import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { HashLink } from "react-router-hash-link";
import { isTokenValid } from "../utils/Auth";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  // Check if a valid token exists on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (isTokenValid(token)) {
      navigate("/");
    }
  }, [navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, token } = data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token); // Save the token to local storage
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <form className="flex flex-col mx-auto max-w-xl my-20 p-4">
      <h1 className="text-4xl font-bold py-4 text-center">Login</h1>
      <label className="text-lg py-1">Email address</label>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Enter email"
        className="border-2 border-gray-300 rounded-lg p-4 my-2 w-full focus:outline-none bg-white"
        onChange={handleOnChange}
      />
      <label className="text-lg py-1">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Enter password"
        className="border-2 border-gray-300 rounded-lg p-4 my-2 w-full focus:outline-none bg-white"
        onChange={handleOnChange}
      />
      <button
        className="bg-[#1565D8] text-white text-xl  p-4 rounded-lg my-4 w-full"
        onClick={handleSubmit}
      >
        Login
      </button>

      <p className="text-lg cursor-pointer ">
        Don&apos;t have an account ?
        <HashLink to="/signup" smooth>
          <span className="text-blue-500"> Sign up</span>
        </HashLink>
      </p>
      <ToastContainer />
    </form>
  );
};

export default Login;
