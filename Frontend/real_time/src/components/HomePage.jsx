import React from "react";
import { Link } from "react-router-dom";
import '../components/HomePage.css';

const HomePage = () => (
    <div className="homepage-container">
        <div className="content-container">
            <h1 className="title">Welcome to the Ticket Booking System</h1>
            <p className="subtitle">Please select your role to continue</p>

            <div className="role-selection">
                <Link to="/vendor" className="role-link">
                    <button className="role-button">Vendor</button>
                </Link>
                <Link to="/customer" className="role-link">
                    <button className="role-button">Customer</button>
                </Link>
            </div>
        </div>
    </div>
);

export default HomePage;
