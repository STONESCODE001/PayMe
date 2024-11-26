import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Herosection from "../components/Herosection.jsx";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config.jsx";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Homepage() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    /* const SignupUser = async => {
        navigate("/Dashboard");
    };*/

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                // If the user is logged in, update the user state and navigate to Dashboard
                setUser(currentUser);
                navigate("/Dashboard"); // Redirect to Dashboard page
            } else {
                // If no user is logged in, ensure the user state is null
                setUser(null);
            }
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, [navigate]);

    const SignupUser = async e => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Sign in anonymously
            const userCredential = await signInAnonymously(auth);
            const user = auth.currentUser;
            console.log("Anonymous user signed in:", user);

            // Write user data to Firestore
            await writeUserData(user.uid);
        } catch (error) {
            console.error(
                "Error signing in anonymously:",
                error.code,
                error.message
            );
        }
    };

    const writeUserData = async userId => {
        try {
            await setDoc(doc(db, "users", userId), {
                uid: userId, // Include the user's UID
                balance: 10000 // Set the initial balance to 10,000
            });
            //navigate("/Dashboard", { state: { userId } });
            navigate("/Dashboard");
            console.log("User data written successfully.");
        } catch (error) {
            console.error("Error writing user data:", error.message);
        }
    };
    return (
        <>
            <Herosection />
            <div className="p-5 ">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-200 rounded-2xl border-1 border-gray-300">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Create a mock account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            /*action="#" method="POST"*/ className="space-y-6"
                        >
                            <div className="hidden">
                                <label
                                    htmlFor="email"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="number"
                                        name="number"
                                        type="number"
                                        required
                                        autoComplete="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    //type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={e => SignupUser(e)}
                                >
                                    Create UUID
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            We have gift for you{" "}
                            <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Hurray 🎉
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
