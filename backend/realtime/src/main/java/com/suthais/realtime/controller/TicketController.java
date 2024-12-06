package com.suthais.realtime.controller;

import com.suthais.realtime.services.TicketService;
import com.suthais.realtime.model.TicketingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")  // Allow React frontend to access this API
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Start ticketing process with configuration
    @PostMapping("/start")
    public ResponseEntity<String> startTicketingProcess(@RequestBody TicketingConfig config) {
        // Delegate the logic to the TicketService
        ticketService.startTicketingProcess(config);
        return ResponseEntity.ok("Ticketing process started successfully.");
    }

    // Get the current available tickets
    @GetMapping
    public ResponseEntity<?> getAvailableTickets() {
        int availableTickets = ticketService.getAvailableTickets();
        int totalTickets = ticketService.getTotalTickets();
        return ResponseEntity.ok().body(new TicketResponse(availableTickets, totalTickets));
    }

    // Release tickets (Vendor action)
    @PostMapping("/release")
    public ResponseEntity<String> releaseTickets(@RequestParam int count) {
        ticketService.releaseTickets(count);
        return ResponseEntity.ok("Released " + count + " tickets.");
    }

    // Inner class for ticket response structure
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
