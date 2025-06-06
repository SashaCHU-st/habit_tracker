import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [err, setError] = useState("");

  const submitSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("sssss");

    try {
      const fetchData = await fetch(`http://localhost:3001/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          nick,
          email,
          password,
        }),
      });
      const responseData = await fetchData.json();
      console.log("SignUp all good", responseData); 
      localStorage.setItem("id", responseData.id);
      // const kiki = localStorage.getItem("id");
      // console.log("JJJJJ=>", kiki);
      
      if (!fetchData.ok) {
        console.log("dddddd");
        throw new Error(responseData.message);
      }
      console.log("SignUp all good");
      // After login success


      navigate("/profile");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  //   console.log("Name =>",name)
  //   console.log("Email =>",email)
  //   console.log("Password =>",password)
  return (
    <div>
      <form action="" method="post" onSubmit={submitSignUp}>
        <div className="flex flex-col items-center">
          <label htmlFor=""> Name</label>
          <input
            className="border-2 border-gray-700 rounded-xl p-1 focus:border-blue-500 focus:outline-none"
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <br /> */}
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor=""> Nick</label>
          <input
            className="border-2 border-gray-700 rounded-xl p-1 focus:border-blue-500 focus:outline-none"
            type="text"
            placeholder="Nick"
            id="nick"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
          />
          {/* <br /> */}
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor=""> Email</label>
          <input
            className="border-2 border-gray-700 rounded-xl p-1 focus:border-blue-500 focus:outline-none"
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <br /> */}
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor=""> Password</label>
          <input
            className="border-2 border-gray-700 rounded-xl p-1 focus:border-blue-500 focus:outline-none"
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <br /> */}
        </div>
        <button
          className="block mx-auto w-36 mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="submit"
          value="Submit"
        >
          {" "}
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
