import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LivePage from "./LivePage";

function TeacherHome() {
  const navigate = useNavigate();
  const authState = Cookies.get("_auth_state");
  const user = authState ? JSON.parse(authState) : {};
  const handleLogout = () => {
    Cookies.remove("_auth");
    Cookies.remove("_auth_state");
    navigate("/login");
  };
  return (
    <div className="flex justify-center flex-col items-center h-screen w-screen">
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center m-2 mt-6 gap-2"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Logout</span>
        </button>
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-5">
          Welcome Back {user.name}
        </h1>
      </div>

      <LivePage />
    </div>
  );
}

export default TeacherHome;
