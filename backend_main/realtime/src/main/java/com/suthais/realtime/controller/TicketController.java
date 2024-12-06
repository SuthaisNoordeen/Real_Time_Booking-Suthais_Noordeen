package com.suthais.realtime.controller;

import com.suthais.realtime.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")  // Allow React frontend to access this API
public class TicketController {

    private final TicketService ticketService;  // Inject the TicketService

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Get available tickets and total tickets (Updated to return JSON)
    @GetMapping
    public ResponseEntity<?> getAvailableTickets() {
        int availableTickets = ticketService.getAvailableTickets();
        int totalTickets = ticketService.getTotalTickets();
        return ResponseEntity.ok().body(new TicketResponse(availableTickets, totalTickets));
    }

    // Release tickets (Vendor action)
    @PostMapping("/release")
    public String releaseTickets(@RequestParam int count) {
        return ticketService.releaseTickets(count);
    }

    // Buy tickets and save the purchase info to a file
    @PostMapping("/buy")
    public String buyTickets(@RequestParam String customerName, @RequestParam int count) {
        String message = ticketService.buyTickets(customerName, count);

        // Save the ticket purchase details to a file after successful purchase
        if (message.contains("successfully bought")) {
            saveTicketPurchaseToFile(customerName, count);
        }

        return message;
    }

    // Save ticket purchase details to a text file
    private void saveTicketPurchaseToFile(String customerName, int count) {
        String filePath = "ticket_purchases.txt";  // Path where the file will be saved

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath, true))) {
            writer.write("Customer: " + customerName + ", Tickets Bought: " + count + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Inner class for JSON response structure
    public static class TicketResponse {
        private int available;
        private int total;

        public TicketResponse(int available, int total) {
            this.available = available;
            this.total = total;
        }

        public int getAvailable() {
            return available;
        }

        public int getTotal() {
            return total;
        }
    }
}
