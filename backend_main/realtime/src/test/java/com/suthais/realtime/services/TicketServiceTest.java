package com.suthais.realtime.services;

import com.suthais.realtime.model.Ticket;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)  // Use this annotation to initialize mocks automatically
class TicketServiceTest {

    @Mock
    private Ticket ticket;  // Mocking the Ticket class

    @InjectMocks
    private TicketService ticketService;  // Injecting the mock into TicketService

    @Test
    void testGetAvailableTickets() {
        when(ticket.getAvailableTickets()).thenReturn(100);
        int availableTickets = ticketService.getAvailableTickets();
        assertEquals(100, availableTickets);
        verify(ticket, times(1)).getAvailableTickets();
    }

    @Test
    void testGetTotalTickets() {
        when(ticket.getTotalTickets()).thenReturn(200);
        int totalTickets = ticketService.getTotalTickets();
        assertEquals(200, totalTickets);
        verify(ticket, times(1)).getTotalTickets();
    }

    @Test
    void testReleaseTickets() {
        doNothing().when(ticket).releaseTickets(50);
        String result = ticketService.releaseTickets(50);
        verify(ticket, times(1)).releaseTickets(50);
        assertEquals("Successfully released 50 tickets. Available tickets: 50", result);
    }

    @Test
    void testBuyTickets_Success() {
        when(ticket.getAvailableTickets()).thenReturn(100);
        doNothing().when(ticket).purchaseTickets(10);
        String result = ticketService.buyTickets("Ahamed", 10);
        assertEquals("Ahamed successfully bought 10 tickets. Remaining available tickets: 90", result);
        verify(ticket, times(1)).purchaseTickets(10);
    }

    @Test
    void testBuyTickets_Failure_NotEnough() {
        when(ticket.getAvailableTickets()).thenReturn(5);
        String result = ticketService.buyTickets("Ahamed", 10);
        assertEquals("Not enough tickets available!", result);
        verify(ticket, times(0)).purchaseTickets(anyInt());
    }
}
