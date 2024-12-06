package com.suthais.realtime.services;

import org.springframework.stereotype.Service;

@Service
public class TicketService {

    private int availableTickets = 0;  // Initially no tickets available
    private int totalTickets = 0;      // Initially no tickets released

    // Get available tickets
    public int getAvailableTickets() {
        return availableTickets;
    }

    // Get total tickets
    public int getTotalTickets() {
        return totalTickets;
    }

    // Method to release tickets
    public String releaseTickets(int count) {
        if (count > 0) {
            availableTickets += count;
            totalTickets += count;
        }
        return "Tickets released successfully";
    }

    // Method to buy tickets
    public String buyTickets(String customerName, int count) {
        if (count <= availableTickets) {
            availableTickets -= count;
            System.out.println(customerName + " bought " + count + " tickets.");
        } else {
            System.out.println("Not enough tickets available for " + customerName);
        }
        return customerName + " successfully bought " + count + " tickets.";
    }
}
