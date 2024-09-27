import React, { useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import axios from "axios";
import "./header.css";
const Header = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [firstName1, setFirstName1] = useState<string>("");
  const [numberOfStakes, setNumberOfStakes] = useState<number>(0);

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const loggedInUserName = localStorage.getItem("firstname");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });

      if (response.ok) {
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login page or homepage
      } else {
        alert("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleProfileClick = async () => {
    // Mock API call to fetch user profile data
    const response = await axios.get(
      "http://localhost:8080/api/v1/user/fetchUser",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = response.data;
    console.log(data);
    setFirstName1(data.responseData.firstName);
    setLastName(data.responseData.lastName);
    setPhoneNumber(data.responseData.phoneNumber);
    setEmail(data.responseData.email);
    setGender(data.responseData.gender);
    setNumberOfStakes(data.responseData.numberOfStakes);
    setIsProfileModalOpen(true);
  };

  return (
    <div>
      <header className="flex bg-blue-950 text-white  justify-between items-center py-5 mb-[10%] px-16">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700902029/spjuhathw6q8wkzwdj3y.png"
            alt="Logo"
            className="w-20"
          />
        </div>
        <nav className="space-x-6">
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            About Us
          </a>
          <span
            className="hover:underline"
            onClick={() => setIsTermsModalOpen(true)}
          >
            {" "}
            Terms & Conditions
          </span>
          <span
            className="hover:underline"
            onClick={() => setIsContactModalOpen(true)}
          >
            Contact Us
          </span>
        </nav>
        <div className=" space-x-4 flex items-center">
          <span>Hi, {loggedInUserName}</span>

          <RiAccountCircleFill
            onClick={toggleDropdown}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            className=" cursor-pointer"
          />

          {isDropdownOpen && (
            <div
              className="absolute mt-[9.5%] right-[1%] w-48 bg-white text-black rounded-lg shadow-lg"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                onClick={handleProfileClick}
                className="block text-center w-full px-4 py-2 hover:text-blue-600"
              >
                My Profile
              </button>
              <button className="block text-center px-4 w-full py-2 hover:text-blue-600">
                Contact us
              </button>
              <button
                onClick={handleLogout}
                className="block text-center w-full  px-4 py-2 text-rose-600 hover:text-red"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {isContactModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              onClick={closeContactModal}
              className="absolute bg-rose-800 text-white hover:bg-red top-2 right-2 py-2 px-3 rounded "
            >
              x
            </button>
            <h2 className="text-2xl mb-4">Contact Us</h2>
            <p>Telegram: **************</p>
            <p>Email: *****************</p>
          </div>
        </div>
      )}

      {isTermsModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          // onClick={closeTermsModal}
        >
          <div className="bg-white px-8 pb-8 pt-2 rounded-2xl shadow-lg w-[90%] h-[80%] mx-auto overflow-auto">
            <button
              onClick={closeTermsModal}
              className="bg-rose-800 text-white hover:bg-red ml-[97%] mb-4 py-2 px-3 rounded"
            >
              X
            </button>
            <h2 className="text-2xl mb-4 first-header">Terms and Conditions</h2>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Introduction</h3>
              <p className="paragraph">
                Welcome to EuroLotto Adventures. These Terms and Conditions
                govern your use of our website and participation in our lottery
                draws. By accessing our website and purchasing tickets, you
                agree to comply with and be bound by these terms.
              </p>
            </div>


            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Eligibility</h3>
              <p className="paragraph">
                <strong>Age Requirement:</strong> You must be at least 18 years
                old to participate in our lottery.
              </p>
              <p className="paragraph">
                <strong>Legal Compliance:</strong> Participation is void where
                prohibited by law. It is your responsibility to ensure that your
                participation does not violate any local laws or regulations.
              </p>
            </div>


            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Ticket Purchase</h3>
              <p className="paragraph">
                <strong>Purchase Process:</strong> Tickets can be purchased
                online through our website. All purchases are final and
                non-refundable.
              </p>
              <p className="paragraph">
                <strong>Payment Methods:</strong> We accept various payment
                methods, including credit cards, debit cards, and other online
                payment systems.
              </p>
              <p className="paragraph">
                <strong>Limitations:</strong> We reserve the right to limit the
                number of tickets purchased by any individual.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Draw and Prizes</h3>
              <p className="paragraph">
                <strong>Draw Process:</strong> All draws are conducted using a
                random number generator under strict supervision to ensure
                fairness.
              </p>
              <p className="paragraph">
                <strong>Notification of Winners:</strong> Winners will be
                notified via email and their names may be published on our
                website, subject to privacy policies.
              </p>
              <p className="paragraph">
                <strong>Prize Redemption:</strong> Winners must claim their
                prizes within a specified period, typically 30 days. Unclaimed
                prizes may be forfeited.
              </p>
              <p className="paragraph">
                <strong>Prize Substitution:</strong> We reserve the right to
                substitute any prize with another prize of equal or greater
                value if the original prize becomes unavailable.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Trip Prizes</h3>
              <p className="paragraph">
                <strong>Travel Arrangements:</strong> Winners of trip prizes
                will be contacted to arrange travel details. Trips must be taken
                within the time frame specified.
              </p>
              <p className="paragraph">
                <strong>Travel Requirements:</strong> Winners are responsible
                for ensuring they have valid passports, visas, and any other
                required travel documents.
              </p>
              <p className="paragraph">
                <strong>Expenses:</strong> The trip prize includes all major
                travel expenses (flights, accommodations, and specified
                activities). Any additional expenses (meals, personal expenses)
                are the responsibility of the winner.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">User Conduct</h3>
              <p className="paragraph">
                <strong>Prohibited Activities:</strong> You agree not to use the
                website for any unlawful purpose or in any way that could harm
                or impair the functionality of the website.
              </p>
              <p className="paragraph">
                <strong>Account Security:</strong> You are responsible for
                maintaining the confidentiality of your account information and
                for all activities that occur under your account.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Intellectual Property</h3>
              <p className="paragraph">
                <strong>Ownership:</strong> All content on the website,
                including text, graphics, logos, and images, is the property of
                EuroLotto Adventures and is protected by copyright laws.
              </p>
              <p className="paragraph">
                <strong>Usage Rights:</strong> You may not reproduce,
                distribute, or create derivative works from any content on the
                website without our express written permission.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Limitation of Liability</h3>
              <p className="paragraph">
                <strong>No Guarantee of Winning:</strong> Participation in the
                lottery does not guarantee any winnings. The outcome is entirely
                based on chance.
              </p>
              <p className="paragraph">
                <strong>Website Availability:</strong> We do not guarantee that
                the website will be available at all times or free from errors
                or interruptions.
              </p>
              <p className="paragraph">
                <strong>Damages:</strong> In no event shall EuroLotto Adventures
                be liable for any indirect, incidental, or consequential damages
                arising from the use of our website or participation in our
                lottery.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Privacy Policy</h3>
              <p className="paragraph">
                Please refer to our Privacy Policy for information on how we
                collect, use, and protect your personal data.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Modifications</h3>
              <p className="paragraph">
                We reserve the right to modify these Terms and Conditions at any
                time. Changes will be posted on this page, and your continued
                use of the website constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Governing Law</h3>
              <p className="paragraph">
                These Terms and Conditions are governed by and construed in
                accordance with the laws of [Your Country/State], and you
                irrevocably submit to the exclusive jurisdiction of the courts
                in that location.
              </p>
            </div>

            <div className="mb-4 inner-container">
              <h3 className="text-lg font-bold header">Contact Us</h3>
              <p className="paragraph">
                If you have any questions or concerns about these Terms and
                Conditions, please contact us at:
              </p>
              <p className="paragraph">
                Email: support@eurolottoadventures.com
                <br />
                Phone: +4488888888888
                <br />
                Address: No.30 Manchester Avenue, London, United Kingdom
              </p>
            </div>
            <p className="paragraph"> 
              By participating in EuroLotto Adventures, you acknowledge that you
              have read, understood, and agreed to these Terms and Conditions.
            </p>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  ">
          <div className="bg-white px-8 pb-8 pt-2 rounded-2xl shadow-lg max-w-md mx-auto my-20">
            <button
              onClick={closeProfileModal}
              className="bg-rose-800 text-white hover:bg-red ml-[97%] mb-4 py-2 px-3 rounded"
            >
              X
            </button>
            <h2 className="text-2xl  mb-4">My Profile</h2>
            <div className="mb-4 flex space-x-4">
              <input
                type="text"
                value={firstName1}
                readOnly
                className="border p-2 w-1/2"
              />
              <input
                type="text"
                value={lastName}
                readOnly
                className="border p-2 w-1/2"
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <input
                type="text"
                value={gender}
                readOnly
                className="border p-2 w-1/2"
              />
              <input
                type="text"
                value={phoneNumber}
                readOnly
                className="border p-2 w-1/2"
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <input
                type="text"
                value={numberOfStakes + " stakes"}
                readOnly
                className="border p-2 w-1/2"
              />
              <input
                type="text"
                value={email}
                readOnly
                className="border p-2 w-1/2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
