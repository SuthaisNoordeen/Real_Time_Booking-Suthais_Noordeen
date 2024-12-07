const API_BASE_URL = "http://localhost:8080/api/tickets";

// Function to buy a ticket
export const buyTicket = async (customerName, count) => {
    try {
        const response = await fetch(`${API_BASE_URL}/buy?customerName=${customerName}&count=${count}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to buy tickets");
        }

        const message = await response.text();
        return message;
    } catch (error) {
        console.error("Error buying tickets:", error);
        throw error;
    }
};

// Function to get available tickets
export const getAvailableTickets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        if (!response.ok) {
            throw new Error("Failed to fetch available tickets");
        }

        const data = await response.json();
        return data.available;  // Return available tickets
    } catch (error) {
        console.error("Error getting available tickets:", error);
        throw error;
    }
};

// Function to release tickets (for the vendor)
export const releaseTickets = async (count) => {
    try {
        const response = await fetch(`${API_BASE_URL}/release?count=${count}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to release tickets");
        }

        const message = await response.text();
        return message;  // Return success message
    } catch (error) {
        console.error("Error releasing tickets:", error);
        throw error;  // Rethrow the error
    }
};

// Function to start the ticketing process (for the vendor)
export const startTicketingProcess = async (config) => {
    try {
        const response = await fetch(`${API_BASE_URL}/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(config)
        });

        if (!response.ok) {
            throw new Error("Failed to start ticketing process");
        }

        const message = await response.text();
        return message; // Return success message
    } catch (error) {
        console.error("Error starting ticketing process:", error);
        throw error;  // Rethrow the error
    }
};
