import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [passwordType, setPasswordType] = useState("password");

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
      position: "top-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name, email, and password
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required.");
      return;
    }

    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address.");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must have 8 characters with 1 uppercase, 1 lowercase, 1 number, and a special character"
      );
      return;
    }

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
    });
  };

  const handleClick = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <>
      <form className="flex flex-col mx-auto max-w-xl my-20 p-4">
        <h1 className="text-4xl font-bold py-4 text-center">Sign up</h1>
        <label className="text-lg py-1">Name</label>
        <input
          type="text"
          name="username"
          value={username}
          autoComplete="username"
          placeholder="Enter name"
          className="border-2 border-gray-300 rounded-lg p-4 my-2 w-full focus:outline-none bg-white"
          onChange={handleOnChange}
        />
        <label className="text-lg py-1">Email address</label>
        <input
          type="email"
          name="email"
          value={email}
          autoComplete="email"
          placeholder="Enter email"
          className="border-2 border-gray-300 rounded-lg p-4 my-2 w-full focus:outline-none bg-white"
          onChange={handleOnChange}
        />
        <label className="text-lg py-1">Password</label>
        <div className="relative my-2">
          <input
            type={passwordType}
            name="password"
            value={password}
            placeholder="Enter password"
            autoComplete="current-password" 
            className="border-2 border-gray-300 rounded-lg p-4 my-2 w-full focus:outline-none bg-white"
            onChange={handleOnChange}
          />
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleClick}
          >
            {passwordType === "password" ? (
              <Eye className="text-[#718096] hover:text-[#2d3748] mr-2" />
            ) : (
              <EyeOff className="text-[#718096] hover:text-[#2d3748] mr-2" />
            )}
          </div>
        </div>
        <button
          className="bg-[#1565D8] text-white text-xl p-4 rounded-lg my-4 w-full"
          onClick={handleSubmit}
        >
          Register
        </button>
        <p className="text-lg cursor-pointer ">
          You have an account?
          <HashLink to="/login" smooth>
            <span className="text-blue-500"> Login</span>
          </HashLink>
        </p>
      </form>
      <ToastContainer />
    </>
  );
};

export default Signup;
