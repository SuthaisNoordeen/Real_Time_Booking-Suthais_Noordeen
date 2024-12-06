package com.suthais.realtime.model;

import org.springframework.stereotype.Component;

@Component  // Make this a Spring-managed bean
public class Ticket {

    private int availableTickets = 0;  // Initially 0 available tickets
    private int totalTickets = 100;    // Initially 100 total tickets

    // Getter for available tickets
    public int getAvailableTickets() {
        return availableTickets;
    }

    // Getter for total tickets
    public int getTotalTickets() {
        return totalTickets;
    }

    // Method to release tickets (increase available tickets)
    public void releaseTickets(int count) {
        if (count > 0) {
            availableTickets += count;
            totalTickets += count;
        }
    }

    // Method to purchase tickets (decrease available tickets)
    public void purchaseTickets(int count) {
        if (count <= availableTickets) {
            availableTickets -= count;
        }
    }
}
