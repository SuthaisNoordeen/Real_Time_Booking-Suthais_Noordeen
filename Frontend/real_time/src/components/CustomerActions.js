import React, { useState, useEffect } from "react";
import { buyTicket, getAvailableTickets } from "../api/ticketService.jsx";

const CustomerActions = () => {
    const [availableTickets, setAvailableTickets] = useState(0);  // Available tickets state
    const [isPurchasing, setIsPurchasing] = useState(false); // Flag to control auto-purchase
    const [purchaseHistory, setPurchaseHistory] = useState([]); // Purchase history
    const [successMessage, setSuccessMessage] = useState(""); // Success message
    const [errorMessage, setErrorMessage] = useState(""); // Error message

    useEffect(() => {
        // Fetch available tickets when the component mounts
        const fetchTickets = async () => {
            try {
                const tickets = await getAvailableTickets();  // Fetch available tickets from the backend
                setAvailableTickets(tickets);  // Update state with available tickets
            } catch (error) {
                console.error("Error fetching available tickets:", error);
            }
        };

        fetchTickets();  // Fetch available tickets when the component mounts

        // Auto-buy tickets if isPurchasing is true
        let autoPurchaseInterval;
        if (isPurchasing) {
            autoPurchaseInterval = setInterval(() => {
                if (availableTickets > 0) {
                    const customerName = `Customer-${Math.floor(Math.random() * 1000)}`;  // Random customer name
                    handleBuy(customerName);  // Trigger the purchase
                }
            }, 2000);  // Every 2 seconds
        } else {
            clearInterval(autoPurchaseInterval);  // Stop auto-buying if isPurchasing is false
        }

        return () => clearInterval(autoPurchaseInterval);  // Cleanup on component unmount
    }, [availableTickets, isPurchasing]);  // Re-run when availableTickets or isPurchasing changes

    // Handle ticket purchase
    const handleBuy = async (customerName) => {
        if (availableTickets <= 0) {
            setErrorMessage("No tickets available.");
            return;  // If no tickets are available, do not proceed with purchase
        }

        try {
            const message = await buyTicket(customerName, 1); // Auto-generate customer name

            // Update available tickets and purchase history
            const tickets = await getAvailableTickets();
            setAvailableTickets(tickets);
            setSuccessMessage(message);  // Show success message
            setErrorMessage("");  // Clear error message

            // Record the purchase in history
            setPurchaseHistory((prevHistory) => [
                ...prevHistory,
                `${customerName} purchased 1 ticket. Tickets left: ${tickets}`
            ]);
        } catch (error) {
            setErrorMessage("Error buying tickets: " + error.message);  // Show error message
        }
    };

    // Start auto-purchasing
    const startAutoPurchase = () => {
        setIsPurchasing(true); // Enable auto-purchase
        setSuccessMessage("Auto-purchase started.");
    };

    // Stop auto-purchasing
    const stopAutoPurchase = () => {
        setIsPurchasing(false); // Disable auto-purchase
        setSuccessMessage("Auto-purchase stopped.");
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Customer Ticket Purchase</h2>

            <div style={styles.formContainer}>
                <p style={styles.availableTickets}>Available Tickets: {availableTickets !== null ? availableTickets : "Loading..."}</p>

                {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

                {/* Start and Stop Auto Purchase Buttons */}
                {!isPurchasing ? (
                    <button onClick={startAutoPurchase} style={styles.button}>Start Auto Purchase</button>
                ) : (
                    <button onClick={stopAutoPurchase} style={styles.button}>Stop Auto Purchase</button>
                )}

                <h3 style={styles.historyTitle}>Purchase History</h3>
                <ul style={styles.historyList}>
                    {purchaseHistory.length > 0 ? (
                        purchaseHistory.map((history, index) => (
                            <li key={index} style={styles.historyItem}>{history}</li>
                        ))
                    ) : (
                        <li style={styles.historyItem}>No purchases made yet.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f8ff",  // Light background color
        fontFamily: "'Arial', sans-serif",
        padding: "20px",
    },
    title: {
        fontSize: "32px",
        color: "#0078d4",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "500px",
        textAlign: "center",
    },
    availableTickets: {
        fontSize: "18px",
        color: "#333",
        marginBottom: "15px",
    },
    successMessage: {
        color: "green",
        fontWeight: "bold",
        fontSize: "16px",
        marginBottom: "20px",
    },
    errorMessage: {
        color: "red",
        fontWeight: "bold",
        fontSize: "16px",
        marginBottom: "20px",
    },
    button: {
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
        marginBottom: "20px",
    },
    historyTitle: {
        fontSize: "18px",
        color: "#0078d4",
        marginBottom: "10px",
    },
    historyList: {
        listStyleType: "none",
        paddingLeft: "0",
    },
    historyItem: {
        fontSize: "16px",
        color: "#333",
        marginBottom: "10px",
    },
};

export default CustomerActions;
