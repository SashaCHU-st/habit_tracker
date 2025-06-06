import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const auth = () => {
    navigate("/auth");
  };
  return (

      <div className="flex justify-center items-center h-screen bg-gray-100 bg-opacity-70">
        <button
          className="flex justify-center rounded-md bg-blue-500"
          onClick={auth}
        >
          Login
        </button>
      </div>
  );
};

export default Home;
