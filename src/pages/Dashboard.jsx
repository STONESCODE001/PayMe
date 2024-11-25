import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle
} from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    CreditCardIcon
} from "@heroicons/react/24/solid";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [qrModal, setQrModal] = useState(false);
    const [payQrModal, setPayQrModal] = useState(false);
    const [qrValue, setQrValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [requestedAmount, setRequestedAmount] = useState("");
    const [requesterUid, setRequesterUid] = useState("");
    //const [scannedData, setScannedData] = useState("");
    const [error, setError] = useState("");
    const [showScanner, setShowScanner] = useState(false);

    {
        /* passing data */
    }
    const location = useLocation();
    const { userId } = location.state || {};
    //console.log(userId);

    const generateQRCode = userId => {
        const UUID = JSON.stringify(userId);
        console.log(UUID);
        if (inputValue.trim()) {
            console.log(inputValue + ";" + UUID);
            setQrValue(inputValue + ";" + UUID);
            setQrModal(true); // Open the modal
            console.log("QR Code generated for:", inputValue);
        } else {
            console.error("Input value is empty or invalid!");
        }
    };

    // Handles when a QR code is successfully scanned
    const handleScan = result => {
        console.log(result);
        let scannedData = result;
        let dataValue = scannedData.text;
        console.log(dataValue);

        let parts = dataValue.split(";"); // Split at the semicolon
        let numberPart = parseInt(parts[0]); // Convert the first part to a number
        let stringPart = parts[1].replace(/"/g, ""); // Remove double quotes from the second part
        console.log(numberPart);
        console.log(stringPart);

        setRequestedAmount(numberPart);
        setRequesterUid(stringPart);
        setError("");
        setShowScanner(false); // Hide the scanner after a successful scan
        setPayQrModal(true);

        /*if (numberPart && stringPart) {
            //setScannedData(cleanedText);
        }*/
    };

    const payFunction = () => {
        alert(
            requesterUid + " " + requestedAmount + " current user uid" + userId
        );
    };

    // Handles errors during the scanning process (e.g., camera access issues)
    const handleError = err => {
        console.error(err + "from camera error");
        setError("Unable to access camera. Please check your permissions.");
    };

    // Button click handler to show the scanner
    const handleShowCamera = () => {
        setShowScanner(true); // Show the camera (QR scanner)
        setScannedData(""); // Clear any previous scanned data
        setError(""); // Clear any previous errors
    };

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
                        Dashboard
                    </h1>
                </div>
            </header>
            <main className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4  py-6 sm:px-6 lg:px-8">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-sm/9 font-bold tracking-tight text-gray-400 truncate">
                                UUID {userId}
                            </h2>
                            <h2 className="text-balance  text-center text-5xl font-black tracking-tight text-gray-900 sm:text-7xl">
                                &#8358; 10,000
                            </h2>
                        </div>

                        <div className="mt-24 sm:mx-auto sm:w-full sm:max-w-sm ">
                            <form
                                /* action="#"
                                method="POST"*/
                                className="space-y-36"
                            >
                                <div>
                                    <div className="flex items-center justify-between p-2.5">
                                        <button
                                            type="button"
                                            className="block text-sm/6 font-semibold text-gray-100 bg-indigo-400 p-1 px-2.5 border-2 border-indigo-500 rounded-xl"
                                            onClick={handleShowCamera}
                                            //onClick={() => setPayQrModal(true)}
                                        >
                                            Scan Code
                                        </button>
                                        <div className="">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(true)}
                                                className="block text-sm/6 font-semibold text-gray-100 bg-indigo-400 p-1 px-2.5 border-2 border-indigo-500 rounded-xl"
                                            >
                                                Create Code
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden">
                                    <button
                                        // type="submit"
                                        className="flex w-full py-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/7 font-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() => setOpen(true)}
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm/6 text-gray-500 hidden">
                                Not a member?{" "}
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Start a 14 day free trial
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* the dialog for the recieve button to add amount */}
            <div className="mb-10">
                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-400 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                                            <CreditCardIcon
                                                aria-hidden="true"
                                                className="size-6 text-green-600"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle
                                                as="h3"
                                                className="text-base font-bold text-gray-900 "
                                            >
                                                Input the amount that you are
                                                requesting to get paid
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to
                                                    deactivate your account? All
                                                    of your data will be
                                                    permanently removed. This
                                                    action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <div className="">
                                        <label
                                            htmlFor="amount"
                                            className="block text-sm/6 font-medium text-gray-600 hidden"
                                        >
                                            Amount
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                                                <span className="text-gray-500 text-center sm:text-lg">
                                                    &#8358;
                                                </span>
                                            </div>
                                            <input
                                                id="amount"
                                                name="amount"
                                                type="number"
                                                placeholder="0.00"
                                                value={inputValue}
                                                onChange={e =>
                                                    setInputValue(
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md text-center border-0 p-4 text-gray-900 font-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl "
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center">
                                                <label
                                                    htmlFor="currency"
                                                    className="sr-only hidden"
                                                >
                                                    Currency
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => generateQRCode(userId)}
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto mt-6"
                                    >
                                        Continue
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => setOpen(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>

            {/* The modal to show the qrcode*/}
            <div className="mb-10">
                <Dialog
                    open={qrModal}
                    onClose={setQrModal}
                    className="relative z-20"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-400 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-6 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden p-5 rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left p-5">
                                            <DialogTitle className="text-base font-bold text-gray-900 ">
                                                <div>
                                                    {qrValue && (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <QRCode
                                                                value={qrValue}
                                                                size={200}
                                                                bgColor="#ffffff"
                                                                fgColor="#000000"
                                                            />
                                                            <p className="text-sm text-gray-400">
                                                                QR Code for:{" "}
                                                                {qrValue}
                                                            </p>
                                                            <p className="text-sm mt-3 font-semibold text-gray-600">
                                                                Show this qrcode
                                                                to the other
                                                                person
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </DialogTitle>
                                            <div className="mt-2 hidden">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to
                                                    deactivate your account? All
                                                    of your data will be
                                                    permanently removed. This
                                                    action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setQrModal(false)}
                                    className="mt-3 mb-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>

            {/* the dialog to pay money wheb you scab the qrcode*/}
            <div className="mb-10">
                <Dialog
                    open={payQrModal}
                    onClose={setPayQrModal}
                    className="relative z-10"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-400 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                                            <CreditCardIcon
                                                aria-hidden="true"
                                                className="size-6 text-green-600"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                                            <DialogTitle
                                                as="h3"
                                                className="text-base font-bold text-gray-900"
                                            >
                                                Confirm Payment
                                            </DialogTitle>
                                            <div className="mt-2 ">
                                                <p className="text-sm text-gray-500">
                                                    You are about to make a
                                                    payment. Please review the
                                                    details and confirm the
                                                    amount before proceeding.
                                                    This action cannot be undone
                                                    once completed.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <div className="">
                                        <label
                                            htmlFor="amount"
                                            className="block text-sm/6 font-medium text-gray-600 hidden"
                                        >
                                            Amount
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                                                <span className="text-gray-500 text-center sm:text-lg">
                                                    &#8358;
                                                </span>
                                            </div>
                                            <input
                                                id="requestedAmount"
                                                name="requestedAmount"
                                                type="number"
                                                disabled="true"
                                                //placeholder="0.00"
                                                value={requestedAmount}
                                                className="block w-full rounded-md text-center border-0 p-4 text-gray-900 font-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl "
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center">
                                                <label
                                                    htmlFor="currency"
                                                    className="sr-only hidden"
                                                >
                                                    Currency
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={payFunction}
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto mt-6 "
                                    >
                                        Pay
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => setPayQrModal(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>

            {/* The modal for the camera*/}
            <div className="mb-10">
                <Dialog
                    open={showScanner}
                    onClose={setShowScanner}
                    className="relative z-20"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-400 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-6 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden p-5 rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left p-5">
                                            <DialogTitle className="text-base font-bold text-gray-900 flex justify-center ">
                                                <div className="w-80 h-50 bg-white border-2 border-gray-300 rounded-lg shadow-lg mt-4 flex justify-center items-center">
                                                    <QrReader
                                                        onResult={(
                                                            result,
                                                            error
                                                        ) => {
                                                            if (result)
                                                                handleScan(
                                                                    result
                                                                ); // Handle successful scan
                                                            if (error)
                                                                handleError(
                                                                    error
                                                                ); // Handle errors
                                                        }}
                                                        constraints={{
                                                            facingMode:
                                                                "environment" // Use the rear camera
                                                        }}
                                                        scanDelay={500} // Scan every 500ms
                                                        videoId="qr-video" // Custom video element ID
                                                        containerStyle={{
                                                            width: "100%",
                                                            height: "135%"
                                                        }}
                                                        videoStyle={{
                                                            objectFit: "cover", // Maintain aspect ratio
                                                            width: "100%",
                                                            height: "135%"
                                                        }}
                                                        className="qr-reader-container"
                                                    />
                                                </div>
                                            </DialogTitle>
                                            <div className="mt-2 hidden">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to
                                                    deactivate your account? All
                                                    of your data will be
                                                    permanently removed. This
                                                    action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setShowScanner(false)}
                                    className="mt-3 mb-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    );
}
