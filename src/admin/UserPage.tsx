import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import Modal from "react-modal";
import Footer from "../utils/Footer";

import axios from "axios";
import Header from "../utils/Header";

const walletRequest = {
  currency: "",
  networks: "",
};
const UserPage: React.FC = () => {
  const [firstSelect, setFirstSelect] = useState<string>("");
  const [secondSelect, setSecondSelect] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [coin, setCoin] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("User");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [numberOfStakes, setNumberOfStakes] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [buttonText, setButtonText] = useState("Confirm Payment");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleFirstSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFirstSelect(event.target.value);
    setSecondSelect("");
  };

  const handleSecondSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSecondSelect(event.target.value);
  };

  const getSecondSelectOptions = () => {
    switch (firstSelect) {
      case "USDT":
        return (
          <>
            <option value="TRON">Tron</option>
            <option value="ETHEREUM">ethereum</option>
            <option value="BNB_SMART_CHAIN">bnb smart chain</option>
          </>
        );
      case "BITCOIN":
        return (
          <>
            <option value="BITCOIN">bitcoin</option>
            <option value="ETHEREUM">ethereum</option>
            <option value="BNB_SMART_CHAIN">bnb smart chain</option>
            <option value="BNB_BEACON_CHAIN">bnb beacon chain</option>
          </>
        );
      case "ETHEREUM":
        return (
          <>
            <option value="ETHEREUM">ethereum</option>
            <option value="BNB_SMART_CHAIN">bnb smart chain</option>
            <option value="BNB_BEACON_CHAIN">bnb beacon chain</option>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  const handleProfileClick = async () => {
    // Mock API call to fetch user profile data
    const response = await axios.get("/api/userProfile");
    const data = response.data;
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAddress(data.country);
    setPhoneNumber(data.phoneNumber);
    setEmail(data.email);
    setNumberOfStakes(0);
    setIsModalOpen(true);
  };

  const handleFindClick = async () => {
    if (firstSelect && secondSelect) {
      walletRequest.currency = firstSelect;
      walletRequest.networks = secondSelect;

      const response = await axios.post(
        "http://localhost:8080/api/v1/wallet/viewAddress",
        walletRequest,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      console.log(response.data);
      setWalletAddress(response.data.responseData.walletAddress);
      setAmount(response.data.responseData.amount);
      setCoin(response.data.responseData.coin);
      setNetwork(response.data.responseData.network);
      setIsModalOpen(true);
    } else {
      alert("Please select both options.");
    }
  };

  const closeModal = () => {
    setIsPopupOpen(false);
    setIsModalOpen(false);
    setFile(null);
    setButtonText("Confirm Payment");
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 10000); // Reset the copied state after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handlePaidClick = () => {
    setIsPopupOpen(true);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= 1048576) {
      // 1MB = 1048576 bytes
      setFile(selectedFile);
      setButtonText("Send");
    } else {
      alert("File size exceeds 1MB");
    }
  };
  const handleSendClick = async () => {
    if (file && firstSelect && secondSelect) {
      setButtonText("Sending...");

      try {
        const formData = new FormData();
        formData.append("currency", firstSelect);
        formData.append("networks", secondSelect);
        formData.append("imageDataUrl", file);

        const response = await axios.post(
          "http://localhost:8080/api/v1/deposit/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("accessToken"), // Assuming you need authorization
            },
          }
        );

        if (response.status === 200) {
          setButtonText("Sent!!");
          setTimeout(() => setButtonText("Confirm Payment"), 10000);
        } else {
          alert("Failed to send file");
          setButtonText("Confirm Payment");
        }
      } catch (error) {
        alert("Error sending file");
        console.error(error);
        setButtonText("Confirm Payment");
      }
    } else {
      alert("Please select currency, network, and upload a file.");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className="font-sans text-slate-800 min-h-screen bg-blue-50 ">
      <Header />
      <main className="flex items-center justify-between px-16">
        <div className="text-left max-w-lg">
          <h1 className="text-4xl mb-4">
            "Win Big, Travel Free: Enter Our Lotto for a Chance to Explore
            Europe, The World at Low Cost!"
          </h1>
          <p className="text-lg mb-6">
            Join Now for Just $50 and You Could Be Jetting Off to Europe for
            Free!
          </p>
          <div className="space-x-4 mb-6">
            <select
              value={firstSelect}
              onChange={handleFirstSelectChange}
              className="bg-blue-950 text-white hover:bg-white hover:text-black border  py-2 px-6 rounded "
            >
              <option value="" disabled>
                Select Currency
              </option>
              <option value="USDT">Usdt(Tether)</option>
              <option value="BITCOIN">Bitcoin</option>
              <option value="ETHEREUM">Ethereum</option>
            </select>
            {firstSelect && (
              <select
                value={secondSelect}
                onChange={handleSecondSelectChange}
                className=" bg-white  hover:bg-slate-100 focus:bg-white  py-2 px-6 rounded"
              >
                <option value="" disabled>
                  Select Network
                </option>
                {getSecondSelectOptions()}
              </select>
            )}
          </div>
          <button
            onClick={handleFindClick}
            className="bg-blue-950  py-2 px-5 rounded-2xl text-white  hover:bg-white hover:text-black"
          >
            Find Wallet
          </button>
        </div>
        <div className="">
          <img
            src="http://res.cloudinary.com/du9qbmvxn/image/upload/v1718113437/9282d801-f7ce-4340-bdbf-49e10c708dd2.png"
            alt="Map"
            className=""
          />
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="API Response"
        className="bg-white px-8 pb-8 pt-2 rounded-2xl shadow-lg max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50  items-center justify-center"
      >
        <button
          onClick={closeModal}
          className="bg-rose-600 text-black hover:bg-red ml-[88%] py-2 px-3 rounded"
        >
          Close
        </button>

        <div className="mb-4">
          <strong>Address:</strong>
          <p>{walletAddress}</p>
          <button
            onClick={handleCopy}
            className="bg-blue-900 text-white hover:bg-white hover:text-black border py-2 px-4 rounded mt-2"
          >
            {copied ? "Copied!" : "Copy Address"}
          </button>
        </div>

        <div className="flex justify-between items-start">
          <div className="mr-4">
            <div className="mb-4">
              <strong>Amount:</strong>
              <p>{amount}</p>
            </div>
            <div className="mb-4">
              <strong>Currency:</strong>
              <p>{coin}</p>
            </div>
            <div className="mb-4">
              <strong>Network:</strong>
              <p>{network}</p>
            </div>
          </div>
          <div className="flex items-center mt-[40%] ">
            <button
              className={`px-2 py-2 rounded ${
                buttonText === "Sent!!"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
              onClick={
                buttonText === "Confirm Payment"
                  ? handlePaidClick
                  : handleSendClick
              }
            >
              {buttonText}
            </button>

            {isPopupOpen && (
              <div
                ref={popupRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white border rounded shadow-lg z-10"
              >
                <label className="block mb-2">
                  <span className="text-red">Upload file:</span>
                  <input
                    type="file"
                    accept="*"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 pl-[15%]">
          <strong>QR Code:</strong>
          <QRCode value={walletAddress ? walletAddress : "No address found"} />
        </div>
      </Modal>

      <Footer />
    </div>
  );
};
export default UserPage;
