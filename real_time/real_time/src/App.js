import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.js";  // Add .js extension here
import CustomerActions from "./components/CustomerActions.js";  // Add .js extension here
import VendorActions from "./components/VendorActions.js";  // Add .js extension here

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/customer" element={<CustomerActions />} />
                <Route path="/vendor" element={<VendorActions />} />
            </Routes>
        </Router>
    );
}

export default App;
