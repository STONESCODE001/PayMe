import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "../src/firebase-config.jsx";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc, updateDoc, increment } from "firebase/firestore";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
