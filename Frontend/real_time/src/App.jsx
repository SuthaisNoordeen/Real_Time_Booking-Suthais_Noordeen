import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import CustomerActions from "./components/CustomerActions.js"; // Customer page
import VendorActions from "./components/VendorActions.js";   // Vendor page

function App() {
    return (
        <Router>
            <Routes>
                {/* HomePage route */}
                <Route path="/" element={<HomePage />} />

                {/* Customer page route */}
                <Route path="/customer" element={<CustomerActions />} />

                {/* Vendor page route */}
                <Route path="/vendor" element={<VendorActions />} />
            </Routes>
        </Router>
    );
}

export default App;
