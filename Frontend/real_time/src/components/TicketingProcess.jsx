import React, { useState, useEffect } from "react";
import { getAvailableTickets } from "../api/ticketService.jsx";

const TicketingProcess = () => {
    const [availableTickets, setAvailableTickets] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            getAvailableTickets()
                .then((tickets) => setAvailableTickets(tickets))
                .catch((error) => console.error("Error fetching available tickets:", error));
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div>
            <p>Available Tickets: {availableTickets}</p>
        </div>
    );
};

export default TicketingProcess;
