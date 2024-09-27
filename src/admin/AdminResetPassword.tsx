import React, { useEffect } from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Form, Input } from "antd";
import Modal from "react-modal";
import {ErrorText} from "../commons";

const resetPasswordRequest = {
  newPassword: "",
  confirmPassword: "",
};

function AdminResetPassword(props: any) {
  const [isVerified, setVerified] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);



  const loginPage = () => {
    navigate("/admin");
  };

  function closeModal() {
    setIsOpen(false);
     loginPage();
  }

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const email = localStorage.getItem("resetPasswordEmail");


  const passwordReset = async () => {
    setError("");
    resetPasswordRequest.newPassword = password;
    resetPasswordRequest.confirmPassword = confirmPassword;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/reset_password/newPassword?email="+email,
        resetPasswordRequest

      );

      console.log(response.data);

      setIsOpen(true);
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  return (
    <>
      <div className=" bg-white min-h-screen	">


          <div className="md:container md:mx-auto px-8 py-20 md:w-8/12 lg:w-5/12">
            <div className="items-center shadow-lg bg-slate-700 flex flex-col px-8 rounded-2xl max-md:px-5">

              <div className="text-white text-2xl font-bold leading-9 whitespace-nowrap mt-6">
                Reset your password{" "}
              </div>
              <Form
                form={form}
                name="signup"
                scrollToFirstError
                onFinish={passwordReset}
                className="w-full max-w-lg"
              >
                <div className="mt-10">
                  <ErrorText className="text-left ">{error}</ErrorText>
                </div>

                <div>
                  <label
                    className="block uppercase text-left w-full tracking-wide text-white  text-xs font-bold mb-2"
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
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      className="py-3 w-full px-3 "
                      id="grid-password"
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
                      className="py-3 w-full px-3   "
                      id="grid-confirm-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div className="items-stretch self-stretch flex flex-col my-8 max-md:max-w-full">
                  <button
                    className="text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center  px-5 py-3 rounded-lg max-md:max-w-full bg-green-500 hover:text-black hover:bg-green-600"
                    type="button"
                    onClick={passwordReset}
                  >
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>

      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        className={"w-full bg-transparent border-none"}
      >
        <div className="justify-center items-center bg-white mx-auto max-w-lg flex flex-col px-8 rounded-2xl max-md:px-5">
          <div className="text-violet-700 text-2xl justify-center items-center font-medium  whitespace-nowrap mt-8 max-md:max-w-full">
            <h3 className="m-0  text-inherit leading-[32px] font-medium font-inherit">
              Your password has been successfully reset!
            </h3>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4523a54-82ba-46e3-a403-e18afb590c04?"
            className="aspect-square object-contain object-center w-20 overflow-hidden self-center max-w-full mt-8"
          />
          <div className=" text-base leading-[22px] font-medium text-gray-3 text-center inline-block w-[480px] max-md:max-w-full">
           Exit Page and Login
          </div>

          <button
            className="cursor-pointer [border:none] py-5 px-[193px] bg-log-pri rounded-[100px] bg-violet-500  hover:bg-violet-700 w-[476px] flex flex-row items-center justify-center box-border max-md:max-w-full my-8"
            autoFocus={true}
            onClick={closeModal}
          >
            <b className=" text-white leading-[12px] font-body-bold text-text-2 text-left max-md:max-w-full">
              Continue
            </b>
          </button>
        </div>
      </Modal>
    </>
  );
}

export default AdminResetPassword;
