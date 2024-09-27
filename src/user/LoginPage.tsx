import * as React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorText } from "../commons";
import axios, { AxiosError } from "axios";
import { useSignIn } from "react-auth-kit";
import { Form, Input } from "antd";

const userLoginRequest = {
  email: "",
  password: "",
};

function LoginPage(props: any) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const [form] = Form.useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const homePage = () => {
    navigate("/home");
  };

  const loginUser = async (event: React.FormEvent) => {
    event.preventDefault();
    userLoginRequest.email = email;
    userLoginRequest.password = password;

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        userLoginRequest
      );

      const data = response.data.responseData;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("profilePic", data.profilePic);
      localStorage.setItem("firstname", data.name);

      console.log("Access Token:  " + data.accessToken);

      signIn({
        token: response.data.responseData.accessToken,
        refreshToken: response.data.responseData.refreshToken,
        expiresIn: 30, // minutes
        tokenType: "Bearer",
        authState: { email: email },
      });

      localStorage.setItem("email", email);

      console.log(response.data);
      // Rederict to home page on successful login
      homePage();
    } catch (err) {
      if (err && err instanceof AxiosError) {
        if (err.response?.data.responseMessage === "Not verified!") {
          reSendLink();
        }
        setError(err.response?.data.responseMessage);
      } else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const reSendLink = async () => {
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:8085/api/v1/registration/re_verification?email=" +
          email
      );

      console.log(response.data);
      alert("Verification link sent to your email.");
      // Rederict to home page on successful login
      // closeModal2();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (
      <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
                "url('http://res.cloudinary.com/du9qbmvxn/image/upload/v1718113539/852c37a2-31ae-4dd1-bddf-135edac56ff7.png')",
          }}
      >
        <div className="bg-slate-700 p-8 rounded-3xl shadow-lg z-10 w-full max-w-3xl flex">
          <div className="w-1/2 p-4 flex flex-col mt-10 justify-between">
            <div>
              <div className="flex justify-center mb-4">
                {/* Add your SVG or Logo here */}
              </div>
              <div className="text-center">
                <h2 className="text-white text-2xl font-bold mb-4">Eco Bank Ltd.</h2>
                <p className="text-white mt-[20%] font-serif mb-2">
                  Don't Have an Account?
                </p>
                <a
                    href="/signup"
                    className="bg-green-500 text-green-200 py-2 rounded-2xl px-5 hover:text-black hover:bg-green-600"
                >
                  SIGN UP
                </a>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-white pr-[40%] text-2xl font-bold">Welcome Back,</h2>
            <h4 className="text-white font-extralight text-sm pr-[19%]">
              Please enter your info to log in
            </h4>
            <form className="space-y-6" onSubmit={loginUser}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mt-4 text-white mr-[80%]">
                  Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="bg-slate-200 w-full py-2 px-2 text-black rounded-3xl focus:outline-none focus:ring-2 focus:ring-white focus:bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mr-[70%]">
                  Password
                </label>
                <input
                    type="password"
                    className="bg-slate-200 w-full py-2 px-2 text-black rounded-3xl focus:outline-none focus:ring-2 focus:ring-white focus:bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                  type="submit"
                  className="mr-[65%] bg-green-500 text-green-200 py-2 px-5 rounded-2xl hover:text-black hover:bg-green-600"
              >
                LOGIN {">"}
              </button>
            </form>
            <div className="flex ml-3 mt-4 justify-between items-center">
              <div className="text-sm">
                <a href="/reset_password" className="text-green-500 hover:text-green-400">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginPage;
