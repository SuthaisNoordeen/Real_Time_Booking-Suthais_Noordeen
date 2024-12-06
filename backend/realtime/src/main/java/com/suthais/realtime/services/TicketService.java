package com.suthais.realtime.services;

import com.suthais.realtime.model.TicketingConfig;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Service
public class TicketService {

    private int availableTickets = 0;
    private int totalTickets = 0;

    public TicketService() {
        // Initialize the ticketing system with default values if needed.
    }

    // Method to start the ticketing process based on the provided configuration
    public void startTicketingProcess(TicketingConfig config) {
        this.totalTickets = config.getTotalTickets();
        this.availableTickets = config.getTotalTickets();

        // Start a background process to release tickets based on ticket release rate
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(() -> {
            // Release tickets at the specified rate
            releaseTicketsAtRate(config.getTicketReleaseRate());
        }, 0, 1, TimeUnit.SECONDS);

        // Simulate customer purchases based on the customer retrieval rate
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(() -> {
            // Customers try to buy tickets at the specified rate
            buyTicketsAtRate(config.getCustomerRetrievalRate());
        }, 0, 1, TimeUnit.SECONDS);
    }

    // Simulate the release of tickets
    private void releaseTicketsAtRate(int releaseRate) {
        if (availableTickets < totalTickets) {
            availableTickets += releaseRate;
            if (availableTickets > totalTickets) {
                availableTickets = totalTickets;
            }
        }
    }

    // Simulate customer ticket purchases
    private void buyTicketsAtRate(int retrievalRate) {
        if (availableTickets > 0) {
            availableTickets -= retrievalRate;
            if (availableTickets < 0) {
                availableTickets = 0;
            }
        }
    }

    // Method to get the current available tickets
    public int getAvailableTickets() {
        return availableTickets;
    }

    // Method to get the total number of tickets
    public int getTotalTickets() {
        return totalTickets;
    }

    // Method to release a specified number of tickets (manual vendor action)
    public void releaseTickets(int count) {
        if (count > 0 && availableTickets + count <= totalTickets) {
            availableTickets += count;
        }
    }
}
