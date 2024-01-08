import React, { createContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import LoadingScreen from "../components/LoadingScreen";
import { axiosPrivate } from "../utils/axios";
import { jwtDecode } from "jwt-decode";
import { catchError } from "../utils/catchError";

// Create context
const AuthContext = createContext();

// auth provider
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isInitialized: false,
    isAuthenticated: false,
    accessToken: "",
    user: null,
  });

  const isMountedRef = useRef(false);

  // Decode JWT
  const decodeJwt = (token) => {
    const { userName, role, userId } = jwtDecode(token);
    return { userName, role, userId };
  };

  // login
  const login = async (userName, password) => {
    const response = await axiosPrivate.post("/api/auth/login", {
      userName,
      password,
    });

    const { accessToken } = response.data;
    const user = decodeJwt(accessToken);

    setState({
      isInitialized: true,
      isAuthenticated: true,
      accessToken,
      user,
    });
  };

  // change password
  const changePassword = async (oldPassword, newPassword) => {
    await axiosPrivate.post("/api/auth/change-password", {
      oldPassword,
      newPassword,
    });
  };

  // logout
  const logout = async () => {
    try {
      await axiosPrivate.get("/api/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      setState({
        isInitialized: true,
        isAuthenticated: false,
        accessToken: "",
        user: null,
      });
    }
  };

  // refresh token
  const refresh = async () => {
    console.log("refreshing ...");

    try {
      const response = await axiosPrivate.get("/api/auth/refresh");
      const { accessToken } = response.data;
      const user = decodeJwt(accessToken);

      setState({
        isInitialized: true,
        isAuthenticated: accessToken ? true : false,
        accessToken,
        user,
      });

      return { accessToken, user };
    } catch (error) {
      setState({
        isInitialized: true,
        isAuthenticated: false,
        accessToken: "",
        user: null,
      });

      throw new Error(catchError(error));
    }
  };

  // init app
  const initializingApp = async () => {
    console.log("initializing ...");

    try {
      const { accessToken, user } = await refresh();
      setState({
        isInitialized: true,
        isAuthenticated: accessToken ? true : false,
        accessToken,
        user,
      });
    } catch (error) {
      setState({
        isInitialized: true,
        isAuthenticated: false,
        accessToken: "",
        user: null,
      });
    }
  };

  useEffect(() => {
    if (isMountedRef.current) return;
    initializingApp();

    isMountedRef.current = true;
  }, []);

  // show loading if not init
  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refresh,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
