import React, { useState, useEffect } from "react";
import { buyTicket, getAvailableTickets } from "../api/ticketService.js";  // Ensure correct imports

const CustomerActions = ({ resetRole }) => {
    const [availableTickets, setAvailableTickets] = useState(0);  // Initialize available tickets to 0
    const [customerName, setCustomerName] = useState("Ahamed");  // Default customer name
    const [ticketsToBuy, setTicketsToBuy] = useState(1);  // Default to 1 ticket for purchase
    const [successMessage, setSuccessMessage] = useState("");  // Success message for ticket purchase
    const [errorMessage, setErrorMessage] = useState("");  // Error message for failed purchase

    useEffect(() => {
        // Fetch available tickets when the component mounts
        const fetchTickets = async () => {
            try {
                const tickets = await getAvailableTickets();  // Fetch the available tickets from the backend
                setAvailableTickets(tickets);  // Update state with available tickets
            } catch (error) {
                console.error("Error fetching available tickets:", error);
            }
        };

        fetchTickets();  // Fetch available tickets when the component mounts
    }, []);  // Empty dependency array ensures this runs once after component mounts

    const handleBuy = async () => {
        // Validate if tickets to buy are available and not exceeding the limit
        if (ticketsToBuy <= 0 || ticketsToBuy > availableTickets) {
            setErrorMessage("Cannot buy more tickets than available.");
            return;
        }

        try {
            // Call the backend API to buy tickets
            const message = await buyTicket(customerName, ticketsToBuy);
            setSuccessMessage(message);  // Show success message
            setErrorMessage("");  // Clear error message
            // Fetch updated available tickets after purchase
            const tickets = await getAvailableTickets();
            setAvailableTickets(tickets);  // Update available tickets state
        } catch (error) {
            setErrorMessage("Error buying tickets: " + error.message);  // Show error message if request fails
        }
    };

    const smallButtonStyle = {
        padding: "8px 16px",  // Smaller padding for a smaller button
        fontSize: "14px",  // Reduced font size
        backgroundColor: "#0078d4",
        color: "white",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        fontWeight: "bold",
        display: "inline-block",
        marginTop: "10px",
    };

    const inputFieldStyle = {
        padding: "12px",
        fontSize: "16px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",  // Ensure padding doesn't mess up with the width
    };

    const messageStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
        marginTop: "20px",
    };

    return (
        <div className="customer-actions" style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "center", maxWidth: "500px", margin: "0 auto" }}>
            <h2 style={{ color: "#0078d4" }}>Customer Actions</h2>

            <button onClick={resetRole} className="action-button" style={smallButtonStyle}>
                Back
            </button>

            <div>
                <p>Available Tickets: {availableTickets !== null ? availableTickets : "Loading..."}</p>
                {successMessage && <p>{successMessage}</p>}  {/* Display success message */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Display error message */}

                <div>
                    <label htmlFor="customerName">Customer Name: </label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="input-field"
                        style={inputFieldStyle}
                    />
                </div>

                <div>
                    <label htmlFor="ticketsToBuy">Tickets to Buy: </label>
                    <input
                        type="number"
                        id="ticketsToBuy"
                        min="1"
                        value={ticketsToBuy}
                        onChange={(e) => {
                            const newValue = Math.min(parseInt(e.target.value) || 0, availableTickets);
                            setTicketsToBuy(newValue);
                        }}
                        className="input-field"
                        style={inputFieldStyle}
                    />
                </div>

                <button
                    onClick={handleBuy}
                    className="action-button"
                    style={smallButtonStyle}
                    disabled={availableTickets === 0 || ticketsToBuy <= 0}
                >
                    {successMessage ? "Ticket Purchased" : "Buy Ticket"}
                </button>
            </div>
        </div>
    );
};

export default CustomerActions;
