import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState(true);

  const switchHandler = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  const backHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 bg-opacity-70">
      <button
        onClick={backHome}
        className="mb-6 text-blue-600 hover:underline font-medium"
      >
        {" "}
        Home
      </button>
      <div className="w-full max-w-sm p-5 bg-white rounded-2xl shadow-lg bg-white/40 backdrop-blur-none">
        {!loginMode && <SignUp />}
        {loginMode && <Login />}

        <button
          type="button"
          onClick={switchHandler}
          className="block mx-auto w-36 mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Switch to {loginMode ? "SIGNUP" : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
