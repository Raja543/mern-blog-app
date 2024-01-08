import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";
import { catchError } from "../utils/catchError";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(5, "Username minimum 5 characters")
    .max(20, "Username maximum 20 characters"),
  password: z
    .string()
    .trim()
    .min(6, "Password should be minimum of 6 characters")
    .max(40, "Must be 40 or fewer characters long"),
});

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");

  const { handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      toast.error(catchError(error), {
        position: "top-right",
      });
    }
  };

  const handleClickShowPassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <>
      <form
        className="flex flex-col mx-auto max-w-xl my-20 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-bold py-4 text-center">Login</h1>

        <label htmlFor="email" className="text-lg py-1">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter email"
          className="border-2 border-gray-300 rounded-lg p-4 my-2 w-full focus:outline-none bg-white"
        />

        <label htmlFor="password" className="text-lg py-1">
          Password
        </label>
        <div className="relative my-2">
          <input
            type={passwordType}
            id="password"
            name="password"
            placeholder="Enter password"
            autoComplete="current-password"
            className="border-2 border-gray-300 rounded-lg p-4 my-2 w-full focus:outline-none bg-white"
          />
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleClickShowPassword}
          >
            {passwordType === "password" ? (
              <Eye className="text-icon-color hover:text-hover-icon-color mr-2" />
            ) : (
              <EyeOff className="text-icon-color hover:text-hover-icon-color mr-2" />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#1565D8] text-white text-xl p-4 rounded-lg my-4 w-full"
        >
          Login
        </button>

        <p className="text-lg cursor-pointer">
          Don&apos;t have an account?
          <HashLink to="/signup" smooth>
            <span className="text-blue-500"> Sign up</span>
          </HashLink>
        </p>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
