import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
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
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
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
      username: "",
    });
  };

  return (
    <form className="flex flex-col mx-auto max-w-xl my-20 p-4">
      <h1 className="text-4xl font-bold py-4 text-center">Sign up</h1>
      <label className="text-lg py-1">Name</label>
      <input
        type="text"
        name="username"
        value={username}
        placeholder="Enter name"
        className="border-2 border-gray-300 rounded-lg p-4 my-2 w-full focus:outline-none bg-white"
        onChange={handleOnChange}
      />
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
        Register
      </button>

      <p className="text-lg cursor-pointer ">
        You have an account ?
        <HashLink to="/login" smooth>
          <span className="text-blue-500"> Login </span>
        </HashLink>
      </p>
      <ToastContainer />
    </form>
  );
};

export default Signup;
