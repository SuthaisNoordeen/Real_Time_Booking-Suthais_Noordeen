import React, { useState, useEffect } from "react";
import { releaseTickets, getAvailableTickets, startTicketingProcess } from "../api/ticketService.js"; // Add startTicketingProcess to API functions

const VendorPage = () => {
    const [releaseCount, setReleaseCount] = useState(1);  // Default to 1 ticket
    const [availableTickets, setAvailableTickets] = useState(null);
    const [totalTickets, setTotalTickets] = useState(0);
    const [ticketReleaseRate, setTicketReleaseRate] = useState(1);  // Tickets per second
    const [customerRetrievalRate, setCustomerRetrievalRate] = useState(1);  // Customers per second
    const [maxCapacity, setMaxCapacity] = useState(5);  // Max ticket capacity
    const [message, setMessage] = useState(""); // Message for success/error
    const [isStarted, setIsStarted] = useState(false); // Track if the process has started

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
    }, []);  // Empty dependency array ensures this runs once after component mounts

    // Handle release action
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

    // Start the ticketing process (Release and buy tickets automatically)
    const handleStart = async () => {
        if (totalTickets <= 0 || ticketReleaseRate <= 0 || customerRetrievalRate <= 0) {
            setMessage("Please enter valid values for all fields.");
            return;
        }

        try {
            // Send configuration to backend to start the process
            const config = {
                totalTickets,
                ticketReleaseRate,
                customerRetrievalRate,
                maxCapacity,
            };

            await startTicketingProcess(config);
            setMessage("Ticketing process started successfully.");
            setIsStarted(true);  // Mark the process as started
        } catch (error) {
            setMessage("Error starting ticketing process: " + error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Vendor Ticket Management</h2>

            <div style={styles.formContainer}>
                <p style={styles.ticketCount}>Available Tickets: {availableTickets !== null ? availableTickets : "Loading..."}</p>
                <p style={styles.ticketCount}>Total Tickets: {totalTickets !== null ? totalTickets : "Loading..."}</p>

                {message && <p style={message.includes("success") ? styles.successMessage : styles.errorMessage}>{message}</p>}

                <div style={styles.inputContainer}>
                    <label htmlFor="releaseCount" style={styles.inputLabel}>Tickets to Release: </label>
                    <input
                        type="number"
                        id="releaseCount"
                        min="1"
                        value={releaseCount}
                        onChange={(e) => setReleaseCount(Math.max(1, parseInt(e.target.value)))}
                        style={styles.inputField}
                    />
                </div>

                <div style={styles.inputContainer}>
                    <label htmlFor="ticketReleaseRate" style={styles.inputLabel}>Ticket Release Rate (tickets/sec): </label>
                    <input
                        type="number"
                        id="ticketReleaseRate"
                        min="1"
                        value={ticketReleaseRate}
                        onChange={(e) => setTicketReleaseRate(parseInt(e.target.value))}
                        style={styles.inputField}
                    />
                </div>

                <div style={styles.inputContainer}>
                    <label htmlFor="customerRetrievalRate" style={styles.inputLabel}>Customer Retrieval Rate (tickets/sec): </label>
                    <input
                        type="number"
                        id="customerRetrievalRate"
                        min="1"
                        value={customerRetrievalRate}
                        onChange={(e) => setCustomerRetrievalRate(parseInt(e.target.value))}
                        style={styles.inputField}
                    />
                </div>

                <div style={styles.inputContainer}>
                    <label htmlFor="maxCapacity" style={styles.inputLabel}>Maximum Ticket Capacity: </label>
                    <input
                        type="number"
                        id="maxCapacity"
                        min="1"
                        value={maxCapacity}
                        onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
                        style={styles.inputField}
                    />
                </div>

                <button onClick={handleRelease} style={styles.releaseButton}>
                    Release Tickets
                </button>

                <button onClick={handleStart} style={styles.startButton} disabled={isStarted}>
                    {isStarted ? "Process Started" : "Start Ticketing Process"}
                </button>
            </div>
        </div>
    );
};

// Inline styles for the component
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f5f5f5",  // Light gray background
        minHeight: "100vh",
    },
    title: {
        fontSize: "36px",
        color: "#0078d4",
        fontWeight: "bold",
        marginBottom: "30px",
        textAlign: "center",
    },
    formContainer: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "450px",
    },
    ticketCount: {
        fontSize: "18px",
        color: "#333",
        marginBottom: "20px",
    },
    successMessage: {
        color: "green",
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "20px",
    },
    errorMessage: {
        color: "red",
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "20px",
    },
    inputContainer: {
        marginBottom: "20px",
    },
    inputLabel: {
        fontSize: "16px",
        color: "#333",
        marginBottom: "10px",
        display: "block",
    },
    inputField: {
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "25px",
        boxSizing: "border-box",
    },
    releaseButton: {
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
    },
    startButton: {
        width: "100%",
        padding: "15px",
        backgroundColor: "#28a745",
        color: "white",
        fontSize: "18px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        fontWeight: "bold",
        marginTop: "20px",
    },
};

export default VendorPage;
