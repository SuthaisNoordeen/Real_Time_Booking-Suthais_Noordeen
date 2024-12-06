import React, { useState, useEffect } from "react";
import { releaseTickets, getAvailableTickets } from "../api/ticketService.js";

const VendorActions = () => {
    const [releaseCount, setReleaseCount] = useState(1);  // Default to 1 ticket
    const [availableTickets, setAvailableTickets] = useState(0);  // Initialize available tickets to 0
    const [totalTickets, setTotalTickets] = useState(0);  // Initialize total tickets to 0
    const [successMessage, setSuccessMessage] = useState("");  // Success message after releasing tickets
    const [errorMessage, setErrorMessage] = useState("");  // Error message if something goes wrong

    useEffect(() => {
        // Fetch available tickets when the component mounts
        const fetchTickets = async () => {
            try {
                const tickets = await getAvailableTickets();  // Fetch the available tickets from the backend
                setAvailableTickets(tickets.available);  // Update state with available tickets
                setTotalTickets(tickets.total);  // Update state with total tickets
            } catch (error) {
                console.error("Error fetching available tickets:", error);
            }
        };

        fetchTickets();  // Fetch available tickets when the component mounts
    }, []);  // Empty dependency array ensures this runs once after component mounts

    const handleRelease = async () => {
        if (releaseCount <= 0) {
            setErrorMessage("Cannot release 0 or negative tickets.");
            return;
        }

        try {
            // Call the backend API to release tickets
            const message = await releaseTickets(releaseCount);
            setSuccessMessage(message);  // Show success message
            setErrorMessage("");  // Clear error message
            // Fetch updated available tickets after releasing
            const tickets = await getAvailableTickets();
            setAvailableTickets(tickets.available);  // Update available tickets state
            setTotalTickets(tickets.total);  // Update total tickets state
        } catch (error) {
            setErrorMessage("Error releasing tickets: " + error.message);  // Show error message if request fails
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Vendor Actions</h2>

            <div style={styles.formContainer}>
                <p style={styles.ticketCount}>Available Tickets: {availableTickets !== null ? availableTickets : "Loading..."}</p>
                <p style={styles.ticketCount}>Total Tickets: {totalTickets !== null ? totalTickets : "Loading..."}</p>

                {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

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

                <button
                    onClick={handleRelease}
                    style={styles.releaseButton}
                    disabled={releaseCount <= 0}  // Disable if invalid release count
                >
                    Release Tickets
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
};

export default VendorActions;
