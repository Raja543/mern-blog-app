import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  const isAuthenticated = cookies.token;

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/articles", text: "Articles" },
    { to: "/pages", text: "Pages" },
    { to: "/contacts", text: "Contact" },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="flex justify-between bg-[#F9FCFF] items-center w-full px-6 md:px-10 lg:px-20 py-4 mx-auto">
        <div className="flex items-center">
          <HashLink to="/">
            <img
              className="w-24 cursor-pointer"
              src="/images/Logo.svg"
              alt="Logo"
            />
          </HashLink>
        </div>
        <div className="md:flex md:items-center hidden list-none">
          {navLinks.map((link) => (
            <HashLink key={link.to} to={link.to}>
              <li className="text-lg pr-8">{link.text}</li>
            </HashLink>
          ))}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-[#1565D8] border-2 border-[#1565D8] rounded-2xl py-2 px-8"
            >
              Logout
            </button>
          ) : (
            <HashLink to="/login">
              <button className="text-[#1565D8] border-2 border-[#1565D8] rounded-2xl py-2 px-8">
                Login
              </button>
            </HashLink>
          )}
        </div>
        {/* Sidebar Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="p-2 ">
            {isSidebarOpen ? (
              <X className="text-[#1565D8]" size={30} />
            ) : (
              <Menu className="text-[#1565D8]" size={30} />
            )}
          </button>
        </div>
        {/* Sidebar Menu */}
        <div
          className={`fixed md:hidden bg-[#F9FCFF] top-0 right-0 h-full w-64 z-20 transform ease-in-out duration-300 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          <div className="p-4 flex items-center ">
            <ul className="space-y-4 mt-12 ml-8">
              {navLinks.map((link) => (
                <HashLink key={link.to} to={link.to}>
                  <li className="text-xl p-2">{link.text}</li>
                </HashLink>
              ))}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-[#1565D8] border-2 border-[#1565D8] rounded-2xl py-2 px-8 my-2"
                >
                  Logout
                </button>
              )}
            </ul>
            {/* Close (X) icon inside the Sidebar Menu */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 p-2 "
            >
              {isSidebarOpen ? (
                <X className="text-[#1565D8]" size={30} />
              ) : (
                <Menu className="text-[#1565D8]" size={30} />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
