package com.suthais.realtime.controller;

import com.suthais.realtime.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketingController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/start")
    public String startTicketingProcess(@RequestBody TicketingConfig config) {
        // Release tickets sequentially based on the release rate
        for (int i = 0; i < config.getTotalTickets(); i++) {
            ticketService.releaseTickets(1);  // Release 1 ticket at a time
            try {
                Thread.sleep(1000 / config.getReleaseRate());  // Release rate control (in seconds)
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();  // Handle the interruption
            }
        }

        // Simulate customers purchasing tickets sequentially
        for (int i = 0; i < config.getTotalTickets(); i++) {
            String customerName = "Customer-" + (i + 1);  // Example customer names
            ticketService.buyTickets(customerName, 1);  // Each customer buys 1 ticket
            try {
                Thread.sleep(1000 / config.getRetrievalRate());  // Customer retrieval rate control
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();  // Handle the interruption
            }
        }

        return "Ticketing process started";
    }

    @GetMapping
    public TicketResponse getAvailableTickets() {
        return new TicketResponse(ticketService.getAvailableTickets());
    }

    @PostMapping("/buy")
    public String buyTickets(@RequestParam String customerName, @RequestParam int count) {
        return ticketService.buyTickets(customerName, count);
    }

    @PostMapping("/release")
    public String releaseTickets(@RequestParam int count) {
        return ticketService.releaseTickets(count);
    }

    public static class TicketResponse {
        private int available;

        public TicketResponse(int available) {
            this.available = available;
        }

        public int getAvailable() {
            return available;
        }
    }

    // Ticketing configuration class to store the settings for the ticketing process
    public static class TicketingConfig {
        private int totalTickets;
        private int releaseRate;
        private int retrievalRate;
        private int maxCapacity;

        // Getters and setters for all fields
        public int getTotalTickets() {
            return totalTickets;
        }

        public void setTotalTickets(int totalTickets) {
            this.totalTickets = totalTickets;
        }

        public int getReleaseRate() {
            return releaseRate;
        }

        public void setReleaseRate(int releaseRate) {
            this.releaseRate = releaseRate;
        }

        public int getRetrievalRate() {
            return retrievalRate;
        }

        public void setRetrievalRate(int retrievalRate) {
            this.retrievalRate = retrievalRate;
        }

        public int getMaxCapacity() {
            return maxCapacity;
        }

        public void setMaxCapacity(int maxCapacity) {
            this.maxCapacity = maxCapacity;
        }
    }
}
