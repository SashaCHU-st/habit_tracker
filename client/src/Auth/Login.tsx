import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const fetchData = await fetch(`http://localhost:3001/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseData = await fetchData.json();
      localStorage.setItem("id", responseData.id);
      const kuku = localStorage.getItem("id");
      console.log("TTTT =>", kuku);

      if (!fetchData.ok) {
        throw new Error(responseData.message);
      }
      // After login success
      localStorage.setItem("user_id", responseData.user_id);

      navigate("/profile");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form action="" onSubmit={login}>
        <div className="flex flex-col items-center">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="block mx-auto border-2 border-gray-700 rounded-xl p-1 focus:border-blue-500 focus:outline-none"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          {/* <br /> */}
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="password" className="mb-2 text-center">
            Password
          </label>
          <input
            type="password"
            className="block mx-auto border-2 border-gray-700 rounded-xl p-1 focus:border-blue-500 focus:outline-none"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </div>
        <button
          className="block mx-auto w-36 mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="submit"
          value="Submit"
        >
          {" "}
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
