package com.suthais.realtime.services;

import com.suthais.realtime.model.Ticket;
import org.springframework.stereotype.Service;

@Service
public class TicketService {

    private final Ticket ticket;

    public TicketService(Ticket ticket) {
        this.ticket = ticket;
    }

    public String buyTickets(String customerName, int count) {
        if (ticket.getAvailableTickets() >= count) {
            ticket.purchaseTickets(count);
            return customerName + " successfully bought " + count + " tickets. Remaining available tickets: " + ticket.getAvailableTickets();
        } else {
            return "Not enough tickets available!";
        }
    }

    public int getAvailableTickets() {
        return ticket.getAvailableTickets();
    }

    public int getTotalTickets() {
        return ticket.getTotalTickets();
    }

    public String releaseTickets(int count) {
        ticket.releaseTickets(count);
        return "Successfully released " + count + " tickets. Available tickets: " + ticket.getAvailableTickets();
    }
}
