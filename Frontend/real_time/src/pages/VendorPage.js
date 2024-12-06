import React, { useState, useEffect } from "react";
import { releaseTickets, getAvailableTickets } from "../api/ticketService.js";

const VendorPage = () => {
    const [releaseCount, setReleaseCount] = useState(1);
    const [availableTickets, setAvailableTickets] = useState(null);
    const [message, setMessage] = useState(""); // For displaying messages

    // Fetch available tickets when the component mounts
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = await getAvailableTickets();
                setAvailableTickets(tickets);
            } catch (error) {
                console.error("Error fetching available tickets:", error);
            }
        };

        fetchTickets();
    }, []);  // Runs once when the component mounts

    const handleRelease = async () => {
        if (releaseCount <= 0) {
            setMessage("Please enter a valid number of tickets to release.");
            return;
        }

        try {
            await releaseTickets(releaseCount);
            setMessage(`${releaseCount} tickets released successfully.`);
            const tickets = await getAvailableTickets();
            setAvailableTickets(tickets);  // Update available tickets after release
        } catch (error) {
            setMessage("Error releasing tickets. Please try again.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <h1 style={{ fontSize: "36px", color: "#0078d4", fontWeight: "bold", marginBottom: "30px" }}>Vendor Ticket Management</h1>

            <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "450px" }}>
                <p style={{ fontSize: "18px", color: "#333", marginBottom: "20px" }}>
                    Available Tickets: {availableTickets !== null ? availableTickets : "Loading..."}
                </p>

                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="releaseCount" style={{ fontSize: "16px", color: "#333", marginBottom: "10px", display: "block" }}>
                        Number of Tickets to Release:
                    </label>
                    <input
                        type="number"
                        id="releaseCount"
                        min="1"
                        value={releaseCount}
                        onChange={(e) => setReleaseCount(parseInt(e.target.value))}
                        style={{
                            width: "100%",
                            padding: "12px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            marginBottom: "25px",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <button
                    onClick={handleRelease}
                    style={{
                        width: "100%",
                        padding: "15px",
                        backgroundColor: "#0078d4",
                        color: "white",
                        fontSize: "18px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                        fontWeight: "bold",
                    }}
                >
                    Release Tickets
                </button>

                {message && (
                    <p style={{ marginTop: "20px", color: message.includes("successfully") ? "green" : "red", fontSize: "16px", textAlign: "center" }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default VendorPage;
