const API_BASE_URL = "http://localhost:8080/api/tickets";  // Backend URL

// Function to buy a ticket
export const buyTicket = async (customerName, count) => {
    try {
        const response = await fetch(`${API_BASE_URL}/buy?customerName=${customerName}&count=${count}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to buy tickets");
        }

        const message = await response.text();  // Get the response message
        return message;  // Return success message
    } catch (error) {
        console.error("Error buying tickets:", error);
        throw error;  // Throw error to be caught in the frontend component
    }
};

// Function to get available tickets
export const getAvailableTickets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);

        if (!response.ok) {
            throw new Error("Failed to fetch available tickets");
        }

        const data = await response.json();  // Parse the response as JSON
        return data.available;  // Return the available tickets from the JSON response
    } catch (error) {
        console.error("Error getting available tickets:", error);
        throw error;
    }
};

// Function to release tickets (for Vendor)
export const releaseTickets = async (count) => {
    try {
        const response = await fetch(`${API_BASE_URL}/release?count=${count}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to release tickets");
        }

        const message = await response.text();  // Get the success message
        return message;  // Return the success message
    } catch (error) {
        console.error("Error releasing tickets:", error);
        throw error;
    }
};
