import * as React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorText } from "../commons";
import axios, { AxiosError } from "axios";
import { DatePickerProps, Checkbox, Form, Input } from "antd";
import { DatePicker } from "antd";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const userSignUpRequest = {
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  password: "",
  confirmPassword: "",
  address: "",
  phoneNumber: "",
  gender: "",
  
};

const googleMapsApiKey: string = process.env
  .REACT_APP_GOOGLE_MAPS_API_KEY as string;
const libraries: any = ["drawing", "places"];

function SignupPage(props: any) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDob(dateString);
    console.log(date, dateString);
  };

  const loginPage = () => {
    navigate("/login");
  };

  const saveUser = async () => {
    userSignUpRequest.firstName = firstName;
    userSignUpRequest.lastName = lastName;
    userSignUpRequest.email = email;
    userSignUpRequest.password = password;
    userSignUpRequest.confirmPassword = confirmPassword;
    userSignUpRequest.address = address;
    userSignUpRequest.phoneNumber = phoneNumber;
    userSignUpRequest.gender = gender;
    userSignUpRequest.dob = dob;

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/signup",
        userSignUpRequest
      );

      console.log(response.data);
      alert("Email verification has been sent to "+email+".")

      // Rederict to login page on successful signup
      loginPage();
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (

      <div className=" min-h-screen flex items-center justify-center bg-cover bg-center"
           style={{ backgroundImage: "url('http://res.cloudinary.com/du9qbmvxn/image/upload/v1718113539/852c37a2-31ae-4dd1-bddf-135edac56ff7.png')" }}>

      <div className="md:container md:mx-auto px-8 py-20 md:w-8/12 lg:w-5/12">
            <div className="items-center shadow-lg bg-slate-700 flex flex-col px-8 rounded-2xl max-md:px-5">

              <div className="text-white text-lg font-bold  mt-[10%]">
                Create a new account{" "}
              </div>
              <Form
                  form={form}
                  name="signup"
                  scrollToFirstError
                  onFinish={saveUser}
                  className="md:w-full md:flex md:flex-col md:items-stretch"
                  autoComplete="off"
              >
                <div className="mt-7">
                  <ErrorText className="text-left ">{error}</ErrorText>
                  <label
                      className="block uppercase text-left w-full tracking-wide text-white text-xs font-bold mb-2 mt-2"
                      htmlFor="grid-first-name"
                  >
                    First Name
                  </label>
                  <Form.Item
                      name="firstName"
                      // className="w-full px-3 mb-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your First name!",
                        },
                      ]}
                  >
                    <Input
                        // type="text"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div>
                  <label
                      className="block uppercase text-left w-full tracking-wide text-white text-xs font-bold mb-2 mt-1"
                      htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <Form.Item
                      name="lastName"
                      // className="w-full px-3 mb-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Last name!",
                        },
                      ]}
                  >
                    <Input
                        // type="text"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                        id="grid-last-name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div>
                  <label
                      className="block uppercase text-left w-full tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <Form.Item
                      name="email"
                      // className="w-full px-3 mb-1"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                  >
                    <Input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                        id="grid-email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>

                  <label
                      className="block uppercase text-left w-full tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-password"
                  >
                    Password
                  </label>

                  <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        () => ({
                          validator(_, value) {
                            if ((value).toString().length >= 4) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(
                                    "Password is too short!"
                                )
                            );
                          },
                        }),
                      ]}
                      hasFeedback
                  >
                    <Input.Password
                        className="py-3 w-full px-3 "
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>

                  <label
                      className="block uppercase text-left w-full tracking-wide text-white text-xs font-bold mb-2"
                      htmlFor="grid-confirm-password"
                  >
                    Confirm Password
                  </label>

                  <Form.Item
                      name="confirmPassword"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(
                                    "The new password that you entered do not match!"
                                )
                            );
                          },
                        }),
                      ]}
                  >
                    <Input.Password
                        className="py-3 w-full px-3 border-solid"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="flex -mx-3 mb-6 ">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="address"
                    >
                      Address
                    </label>
                    <input
                        className=" block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                        id="addresss"
                        type="text"
                        placeholder="E.g New Delhi, India"
                        onChange={(e) => setAddress(e.target.value)}
                        autoComplete="off"
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-phone"
                    >
                      Phone Number
                    </label>
                    <input
                        className="appearance-none block w-full  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-phone"
                        type="tel"
                        placeholder="+91"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-gender"
                    >
                      Gender
                    </label>
                    <div className="relative">
                      <select
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-gender"
                          placeholder="Select your gender"
                          onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-white  text-xs font-bold mb-2"
                        htmlFor="grid-date"
                    >
                      Date of Birth
                    </label>
                    <div>
                      <DatePicker
                          className="w-full md:w-9/8 px-3 py-2.5 "
                          onChange={onChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="items-stretch self-stretch flex flex-col my-4 max-md:max-w-full">
                  <button
                      className="bg-green-500 text-green-200  text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center  px-5 py-3 rounded-lg max-md:max-w-full hover:text-black hover:bg-green-600"
                      type="button"
                      onClick={saveUser}
                  >
                    Sign Up
                  </button>
                </div>

              </Form>
              <div className="text-sm leading-5  self-center whitespace-normal mt-5 mb-5 md:flex md:flex-col items-stretch">
                <span className=" text-white">Already have an account ? </span>
                <a
                    href="/login"
                    className="font-semibold text-white hover:text-green-600 underline"
                >
                  Sign in here
                </a>
              </div>
            </div>
          </div>

      </div>
  );
}

export default SignupPage;
