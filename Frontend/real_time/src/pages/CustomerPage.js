import React, { useState, useEffect } from "react";
import CustomerActions from "./CustomerActions"; // Import the CustomerActions component
import { getAvailableTickets } from "../api/ticketService"; // Ensure correct path

const CustomerPage = () => {
    const [availableTickets, setAvailableTickets] = useState(0);  // Track available tickets

    useEffect(() => {
        const fetchAvailableTickets = async () => {
            try {
                const tickets = await getAvailableTickets();  // Fetch available tickets from the backend
                setAvailableTickets(tickets);  // Update available tickets state
            } catch (error) {
                console.error("Error fetching available tickets:", error);
            }
        };
        fetchAvailableTickets();  // Call API when the page loads
    }, []);

    const containerStyle = {
        textAlign: "center",
        maxWidth: "800px",
        width: "100%",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    };

    const pageTitleStyle = {
        fontSize: "36px",
        color: "#0078d4",
        marginBottom: "20px",
    };

    const availableTicketsStyle = {
        fontSize: "18px",
        marginBottom: "30px",
        color: "#333",
    };

    return (
        <div className="customer-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f8ff", fontFamily: "'Arial', sans-serif" }}>
            <div style={containerStyle}>
                <h1 style={pageTitleStyle}>Customer Ticket Booking</h1>
                <p style={availableTicketsStyle}>
                    Available Tickets: {availableTickets || "Loading..."}
                </p>
                <CustomerActions availableTickets={availableTickets} /> {/* Pass available tickets to CustomerActions */}
            </div>
        </div>
    );
};

export default CustomerPage;
