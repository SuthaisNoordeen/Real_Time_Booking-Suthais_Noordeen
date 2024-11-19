import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

public class TicketingSystemCLI {
    private static int totalTickets;
    private static int ticketReleaseRate;
    private static int customerRetrievalRate;
    private static int maxTicketCapacity;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Welcome to the Real-Time Event Ticketing System CLI Configuration");

        // Configure system parameters
        System.out.print("Enter the total number of tickets: ");
        totalTickets = validateInput(scanner);

        System.out.print("Enter the ticket release rate (tickets/second): ");
        ticketReleaseRate = validateInput(scanner);

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

        TicketPool ticketPool = new TicketPool(maxTicketCapacity);

        // Start vendor threads
        for (int i = 1; i <= 2; i++) {
            new Thread(new Vendor(i, ticketPool, ticketReleaseRate)).start();
        }

        // Start customer threads
        for (int i = 1; i <= 3; i++) {
            new Thread(new Customer(i, ticketPool, customerRetrievalRate)).start();
        }

        scanner.close();
    }

    private static int validateInput(Scanner scanner) {
        int value;
        while (true) {
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