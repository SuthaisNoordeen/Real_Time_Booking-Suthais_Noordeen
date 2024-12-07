import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

public class TicketingSystemCLI {
    private static int totalTickets;               // Total number of tickets available in the system.
    private static int ticketReleaseRate;          // Rate at which tickets are released (tickets per second).
    private static int customerRetrievalRate;      // Rate at which customers retrieve tickets (tickets per second).
    private static int maxTicketCapacity;          // Maximum capacity of tickets that can be stored in the pool.


    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Welcome to the Real-Time Event Ticketing System CLI Configuration");

        // Configure system parameters
        System.out.print("Enter the total number of tickets: ");
        totalTickets = validateInput(scanner);

        //the user to enter the ticket release rate (in tickets per second
        System.out.print("Enter the ticket release rate (tickets/second): ");
        ticketReleaseRate = validateInput(scanner);// Validate the input to ensure it's a positive integer and assign it to ticketReleaseRate

        System.out.print("Enter the customer retrieval rate (tickets/second): ");
        customerRetrievalRate = validateInput(scanner);

        System.out.print("Enter the maximum ticket capacity: ");
        maxTicketCapacity = validateInput(scanner);

        // Display the configuration
        System.out.println("\nConfiguration Summary:");
        System.out.println("Total Tickets: " + totalTickets);
        System.out.println("Ticket Release Rate: " + ticketReleaseRate + " tickets/second");
        System.out.println("Customer Retrieval Rate: " + customerRetrievalRate + " tickets/second");
        System.out.println("Maximum Ticket Capacity: " + maxTicketCapacity);

        System.out.println("\nInitialization complete. Starting the ticketing system...");

        TicketPool ticketPool = new TicketPool(maxTicketCapacity);// Creating  a new TicketPool object with the specified maximum capacity

        // Start vendor threads
        for (int i = 1; i <= 2; i++) {
            new Thread(new Vendor(i, ticketPool, ticketReleaseRate)).start(); // Create and start a new Vendor thread, passing the vendor ID, ticket pool, and ticket release rate
        }

        // Start customer threads
        for (int i = 1; i <= 3; i++) {
            new Thread(new Customer(i, ticketPool, customerRetrievalRate)).start(); // Create and start a new Customer thread, passing the customer ID, ticket pool, and retrieval rate
        }

        scanner.close();
    }

    // Defining the validateInput method which takes a Scanner object as input to read user input.
    private static int validateInput(Scanner scanner) {
        int value;
        while (true) { // Start an infinite loop to keep asking for input until it is valid.
            try {
                value = Integer.parseInt(scanner.nextLine());
                if (value > 0) {
                    break;
                } else {
                    System.out.print("Invalid input. Please enter a positive integer: ");
                }
            } catch (NumberFormatException e) {
                System.out.print("Invalid input. Please enter a valid integer: ");
            }
        }
        return value;
    }
}