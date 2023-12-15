import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/articles", text: "Articles" },
    { to: "/pages", text: "Pages" },
    { to: "/contacts", text: "Contact" },
  ];

  return (
    <nav className="flex justify-between bg-[#F9FCFF] items-center w-full px-6 md:px-10 lg:px-20 py-4 mx-auto">
      <div className="flex items-center">
        <NavLink to="/">
          <img
            className="w-24 cursor-pointer"
            src="/images/Logo.svg"
            alt="Logo"
          />
        </NavLink>
      </div>
      <div
        className={`md:flex md:items-center hidden list-none ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to}>
            <li className="text-lg pr-8">{link.text}</li>
          </NavLink>
        ))}
        <NavLink to="/login">
          <button className="text-[#1565D8] border-2 border-[#1565D8] rounded-2xl py-2 px-8">
            Login
          </button>
        </NavLink>
      </div>
      {/* Sidebar Hamburger Menu */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 ">
          {menuOpen ? (
            <X className=" hidden" size={30} />
          ) : (
            <Menu className="text-4xl" size={30} />
          )}
        </button>
      </div>
      {/* Sidebar Menu */}
      <div
        className={`fixed md:hidden bg-[#F9FCFF] top-0 right-0 h-full w-64 z-20 transform ease-in-out duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 flex items-center ">
          <ul className="space-y-4 mt-12 ml-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                <li className="text-xl p-2">{link.text}</li>
              </NavLink>
            ))}
            <NavLink to="/login">
              <button className="text-[#1565D8] border-2 border-[#1565D8] rounded-2xl py-2 px-8 my-2">
                Login
              </button>
            </NavLink>
          </ul>
          {/* Close (X) icon inside the Sidebar Menu */}
          <button onClick={toggleMenu} className="absolute top-4 right-4 p-2 ">
            <X size={30} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
