package com.suthais.realtime.services;

import org.springframework.stereotype.Service;

@Service
public class TicketService {

    private int availableTickets = 0;

    public int getAvailableTickets() {
        return availableTickets;
    }

    public String releaseTickets(int count) {
        availableTickets += count;
        return "Released " + count + " tickets";
    }

    // Accept customer name and count as parameters
    public String buyTickets(String customerName, int count) {
        if (availableTickets >= count) {
            availableTickets -= count;
            return customerName + " successfully bought " + count + " tickets.";
        } else {
            return "Not enough tickets available for " + customerName;
        }
    }
}
