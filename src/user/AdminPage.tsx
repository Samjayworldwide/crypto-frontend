import {useState} from "react";
import * as React from "react";
import {RiAccountCircleFill} from "react-icons/ri";
import axios from "axios";

function AdminPage(props: any) {


    type User = {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        gender: string;
        address: string;
        isVerified: boolean;
        listOfPayments: number[];
    };

    type Payment = {
        id: number;
        name: string;
        currency: string;
        networks: string;
        status: string;
        imageDataUrl: string;
    };

    const [modalOpen, setModalOpen] = useState<string | null>(null);
    const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
    const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);


    const [email, setEmail] = useState<string>('');
    const [number, setNumber] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [payment, setPayment] = useState<Payment | null>(null);
    const [paymentId, setPaymentId] = useState<number | null>(null);
    const [selectedCoin, setSelectedCoin] = useState<string>('');
    const [selectedNetwork, setSelectedNetwork] = useState<string>('');
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [amount, setAmount] = useState<string | null>(null);

    const firstName2 = localStorage.getItem("firstName")

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            });

            if (response.ok) {
                localStorage.clear();
                window.location.href = '/login';
            } else {
                alert('Failed to logout. Please try again.');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('An error occurred. Please try again.');
        }
    };


    const coins = ['USDT', 'Ethereum', 'BITCOIN'];
    const networksByCoin: { [key: string]: string[] } = {
        USDT: ['TRON', 'ETHEREUM', 'BNB_SMART_CHAIN'],
        ETHEREUM: ['ETHEREUM', 'BNB_SMART_CHAIN', 'BNB_BEACON_CHAIN'],
        BITCOIN: ['BITCOIN', 'ETHEREUM', 'BNB_BEACON_CHAIN','BNB_SMART_CHAIN'],
    };
    const openModal = (field: string) => {
        setModalOpen(field);
    };

    const closeModal = () => {
        setModalOpen(null);
        setUserModalOpen(false);
        setPaymentModalOpen(false);
        setImageModalOpen(false);
        setSelectedCoin('');
        setSelectedNetwork('');
        setWalletAddress('');
        setAmount(null);
    };

    const handleEmailSubmit = async () => {
        
    const response = await axios.get(
        `http://localhost:8080/api/v1/admin/fetchUser/${email}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const data = response.data;
      console.log(data);
      

        const fetchedUser: User = {
            id: data.responseData.id,
            firstName: data.responseData.firstName,
            lastName:data.responseData.lastName,
            email: data.responseData.email,
            phoneNumber: data.responseData.phoneNumber,
            gender: data.responseData.gender,
            address: data.responseData.address,
            isVerified: data.responseData.verified,
            listOfPayments: data.responseData.listOfPayments || [],
        };

        setUser(fetchedUser);
        setModalOpen(null);
        setUserModalOpen(true);
    };

    const handlePaymentIdSubmit = async () => {
         
        const response = await axios.get(
            `http://localhost:8080/api/v1/admin/search_id/${paymentId}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );

        console.log(response.data.responseData)
        // Simulate a fetch request
        const fetchedPayment: Payment = {
            id: response.data.responseData.id,
            name: response.data.responseData.name,
            currency: response.data.responseData.currency,
            networks: response.data.responseData.networks,
            status: response.data.responseData.status,
            imageDataUrl: response.data.responseData.imageDataUrl,
        };

        setPayment(fetchedPayment);
        setModalOpen(null);
        setPaymentModalOpen(true);
    };


    const handlePaymentAction = async (action: 'confirm' | 'decline') => {
        // Determine API endpoint based on action
        const apiUrl = action === 'confirm'
            ? `http://localhost:8080/api/v1/admin/approvePayment?id=${paymentId}&status=CONFIRMED`
            : `http://localhost:8080/api/v1/admin/approvePayment?id=${paymentId}&status=DECLINED`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify({ action }), 
            });

            if (response.ok) {
                const result = await response.json();
                alert("payment "+ result.responseMessage); 
            } else {
                alert('Failed to perform payment action');
            }
        } catch (error) {
            console.error('Error performing payment action:', error);
            alert('An error occurred while performing payment action');
        }
    };


    const handleCoinChange = (coin: string) => {
        setSelectedCoin(coin);
        setSelectedNetwork('');
    };

    const handleNetworkChange = (network: string) => {
        setSelectedNetwork(network);
    };

    const handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWalletAddress(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleSendAmountRequest = async () => {
        if (!selectedCoin || amount === null) {
            alert('Please select coin and enter amount');
            return;
        }

        const requestData = {
            coin: selectedCoin,
            amount: amount,
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/admin/change_amount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.responseMessage); 
                closeModal();
            } else {
                alert('Failed to change amount');
            }
        } catch (error) {
            console.error('Error changing amount:', error);
            alert('An error occurred while changing amount');
        }
    };

    const handleSendRequest = async () => {
        if (!selectedCoin || !selectedNetwork || !walletAddress) {
            alert('Please select coin, network, and enter wallet address');
            return;
        }

        const requestData = {
            coin: selectedCoin,
            network: selectedNetwork,
            walletAddress: walletAddress,
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/admin/changeWallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                },
                body: JSON.stringify(requestData),
            });

            console.log(response)

            if (response.ok) {
                const result = await response.json();
                alert(result.responseMessage);
                closeModal();
            } else {
                alert('Failed to change wallet'); 
            }
        } catch (error) {
            console.error('Error changing wallet:', error);
            alert('An error occurred while changing wallet');
        }
    };


    return (
        <div className="min-h-screen flex flex-col bg-white">

            <div className="w-full bg-sky text-white">
                <header className="flex justify-between items-center py-5 px-16">
                    <div className="logo">
                        <img src="https://res.cloudinary.com/djzlwrhxq/image/upload/v1700902029/spjuhathw6q8wkzwdj3y.png" alt="Logo" className="w-20" />
                    </div>
                    <nav className="space-x-6">
                        <h2 className="text-5xl font-semibold">Euro</h2>
                        <h2 className="text-5xl font-serif">Lotto</h2>
                    </nav>
                    <div className="space-x-4 flex items-center">
                        <span>Hi, {firstName2}</span>
                        <a href="#logout" onClick={handleLogout} className="block px-4 py-2 text-rose-600 hover:text-red">Logout</a>
                    </div>
                </header>
            </div>

            <div className="flex flex-grow items-center justify-center">
                <div className="grid grid-cols-4 gap-4 bg-slate-100 border-black p-6 rounded-lg shadow-lg">
                    {['Get User', 'View Payment Id', 'Change Wallet', 'Change Amount'].map((field) => (
                        <div
                            key={field}
                            className="p-4 bg-green-500 text-black text-center rounded-lg cursor-pointer"
                            onClick={() => openModal(field)}
                        >
                            {field}
                        </div>
                    ))}
                </div>
            </div>

            {modalOpen === 'Get User' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">{modalOpen}</h2>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 mb-4 w-full"
                        />
                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={handleEmailSubmit}
                        >
                            Enter
                        </button>
                        <button
                            className="mt-4 bg-red text-white p-2 ml-10 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {modalOpen === 'View Payment Id' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">{modalOpen}</h2>
                        <input
                            type="number"
                            placeholder="Enter payment ID"
                            value={paymentId || ''}
                            onChange={(e) => setPaymentId(Number(e.target.value))}
                            className="border p-2 mb-4 w-full"
                        />
                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={handlePaymentIdSubmit}
                        >
                            Enter
                        </button>
                        <button
                            className="mt-4 bg-red text-white p-2 ml-10 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {modalOpen === 'Change Wallet' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white w-[30%] p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">{modalOpen}</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Select Coin
                            </label>
                            <select
                                value={selectedCoin}
                                onChange={(e) => handleCoinChange(e.target.value)}
                                className="border p-2 w-full"
                            >
                                <option value="">Select Coin</option>
                                {coins.map((coin) => (
                                    <option key={coin} value={coin}>
                                        {coin}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedCoin && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Select Network
                                </label>
                                <select
                                    value={selectedNetwork}
                                    onChange={(e) => handleNetworkChange(e.target.value)}
                                    className="border p-2 w-full"
                                >
                                    <option value="">Select Network</option>
                                    {networksByCoin[selectedCoin].map((network) => (
                                        <option key={network} value={network}>
                                            {network}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {selectedNetwork && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Enter Wallet Address
                                </label>
                                <input
                                    type="text"
                                    value={walletAddress}
                                    onChange={handleWalletAddressChange}
                                    placeholder="Enter wallet address"
                                    className="border p-2 w-full"
                                />
                            </div>
                        )}

                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={handleSendRequest}
                            disabled={!selectedCoin || !selectedNetwork || !walletAddress}
                        >
                            Send
                        </button>
                        <button
                            className="mt-4 bg-red ml-10 text-white p-2 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {modalOpen === 'Change Amount' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">{modalOpen}</h2>
                        <div className="mb-4">
                            <select
                                value={selectedCoin}
                                onChange={(e) => handleCoinChange(e.target.value)}
                                className="border p-2 w-full"
                            >
                                <option value="">Select Coin</option>
                                {coins.map((coin) => (
                                    <option key={coin} value={coin}>
                                        {coin}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedCoin && (
                            <div className="mb-4">
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount || ''}
                                    onChange={handleAmountChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                        )}
                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={handleSendAmountRequest}
                        >
                            Send
                        </button>
                        <button
                            className="mt-4 bg-red ml-10 text-white p-2 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {userModalOpen && user && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">User Details</h2>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>First Name:</strong> {user.firstName}</p>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Verified:</strong> {user.isVerified ? 'YES' : 'NO'}</p>
                        <p><strong>Payments:</strong> {user.listOfPayments.length > 0 ? user.listOfPayments.join(', ') : 'No payments'}</p>
                        <button
                            className="mt-4 bg-red text-white p-2 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {paymentModalOpen && payment && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">Payment Details</h2>
                        <p><strong>ID:</strong> {payment.id}</p>
                        <p><strong>Name:</strong> {payment.name}</p>
                        <p><strong>Currency:</strong> {payment.currency}</p>
                        <p><strong>Networks:</strong> {payment.networks}</p>
                        <p><strong>Status:</strong> {payment.status}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white p-2 rounded"
                            onClick={() => setImageModalOpen(true)}
                        >
                            View Image
                        </button>

                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-green-500 text-white p-2 rounded"
                                onClick={() => handlePaymentAction('confirm')}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-orange-900 text-white p-2 rounded"
                                onClick={() => handlePaymentAction('decline')}
                            >
                                Decline
                            </button>
                        </div>

                        <button
                            className="mt-4 bg-red text-white p-2 ml-1 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {imageModalOpen && payment && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <h2 className="text-2xl mb-4">Payment Image</h2>
                        <img src={payment.imageDataUrl} alt="Payment" className="mb-4" />
                        <button
                            className="bg-red text-white p-2 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {modalOpen && modalOpen !== 'Get User' && modalOpen !== 'View Payment Id' && modalOpen !== 'Change Wallet' && modalOpen !== 'Change Amount' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">{modalOpen}</h2>

                        <button
                            className="mt-4 bg-red text-white p-2 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>


    );
}
export default AdminPage;