import * as React from "react";

import { useState } from "react";
import { ErrorText } from "../../commons";
import axios, { AxiosError } from "axios";
import { Form, Input, Modal } from "antd";

function ResetPasswordPage(props: any) {
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

    const showOtpModal = () => {
        setOtpModalVisible(true);
    };

    const hideOtpModal = () => {
        setOtpModalVisible(false);
    };

    const resetPassword = async () => {
    setError("");

    try {
      // const response = await axios.get(
      //   "http://localhost:8085/api/v1/reset_password?email=" + email
      // );
      //
      // console.log(response.data);
      alert("Reset link sent to your email.");
        showOtpModal();

    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.responseMessage);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

    const verifyOTP = async () => {
        setLoading(true);

        try {
            // Replace with your OTP verification API endpoint
            const response = await axios.post(
                "http://localhost:8085/api/v1/verify_otp",
                { email, otp: otpInput }
            );

            console.log(response.data);
            // Handle successful OTP verification, e.g., redirect to a new page
            // or display a success message
            alert("OTP verified successfully!");
            hideOtpModal();
            window.location.href = '/login';
        } catch (err) {
            // Handle errors from API call
            console.error("Error verifying OTP:", err);
            // Display error message to the user
            alert("Failed to verify OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    return(
      <div className=" min-h-screen flex items-center justify-center bg-cover bg-center"
           style={{ backgroundImage: "url('http://res.cloudinary.com/du9qbmvxn/image/upload/v1718113539/852c37a2-31ae-4dd1-bddf-135edac56ff7.png')" }}>
      <div className="md:container md:mx-auto px-8 py-20 md:w-8/12 lg:w-5/12">
              <div className="items-center shadow-lg bg-slate-700 flex flex-col px-8 rounded-2xl max-md:px-5">
                  <div className="text-white text-2xl font-bold leading-9 whitespace-nowrap mt-6">
                      Reset your password
                  </div>
                  <div className="text-white text-l text-center whitespace-wrap mt-6">
                      Enter your email below to reset your password.
                  </div>
                  <Form
                      form={form}
                      name="signup"
                      scrollToFirstError
                      onFinish={resetPassword}
                      className="w-full max-w-lg"
                  >
                      <div className="mt-10">
                          <ErrorText className="text-left">{error}</ErrorText>
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
                              rules={[
                                  {
                                      type: 'email',
                                      message: 'The input is not valid E-mail!',
                                  },
                                  {
                                      required: true,
                                      message: 'Please input your E-mail!',
                                  },
                              ]}
                          >
                              <Input
                                  className="appearance-none block w-full bg-slate-200 text-black border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                                  id="grid-email"
                                  onChange={(e) => setEmail(e.target.value)}
                              />
                          </Form.Item>
                      </div>
                      <div className="items-stretch self-stretch flex flex-col my-8 max-md:max-w-full">
                          <button
                              className="text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-green-500 text-white px-5 py-3 rounded-lg max-md:max-w-full hover:text-black hover:bg-green-600"
                              type="button"
                              onClick={resetPassword}
                          >
                              Confirm
                          </button>
                      </div>
                  </Form>
                  <div className="text-violet-700 text-sm leading-5 self-center whitespace-nowrap mt-5 mb-5">
                      <span className="text-white">Back to </span>
                      <a href="/login" className="font-semibold text-white hover:text-green-600 underline">
                          Sign in
                      </a>
                  </div>
              </div>
          </div>

          <Modal
              title="Enter OTP"
              visible={otpModalVisible}
              onCancel={hideOtpModal}
              footer={[
                  <button
                      key="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      onClick={verifyOTP}
                      disabled={loading}
                  >
                      {loading ? "Verifying..." : "Verify OTP"}
                  </button>,
              ]}
          >
              <Input
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  onPressEnter={verifyOTP}
                  placeholder="Enter OTP"
              />
          </Modal>

      </div>
  );
}

export default ResetPasswordPage;