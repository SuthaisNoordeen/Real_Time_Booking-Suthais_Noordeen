import java.text.SimpleDateFormat; // Import to format dates into a readable string.
import java.util.Date; // Import to get the current system date and time.
import java.util.List; // Import the List interface to store tickets dynamically.
import java.util.LinkedList; // Import the LinkedList class to implement List for efficient operations.
import java.util.Collections; // Import for thread-safe operations on lists.
import java.util.logging.Logger; // Import for logging messages, warnings, and errors

class TicketPool {
    // List to hold tickets, synchronized to handle concurrent access
    private final List<String> tickets;
    // Maximum capacity of the ticket pool
    private final int maxCapacity;
    // Logger to track the activities in the TicketPool class
    private static final Logger logger = Logger.getLogger(TicketPool.class.getName());

    // Custom method to get the current time in a formatted way
    private String getCurrentTime() {
        // Command: Create a SimpleDateFormat to format the date in 'yyyy-MM-dd HH:mm:ss' format
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // Command: Return the formatted current date and time
        return sdf.format(new Date());
    }

    // Constructor to initialize the ticket pool with the given capacity
    public TicketPool(int maxCapacity) {
        // Command: Create a synchronized list to store tickets
        this.tickets = Collections.synchronizedList(new LinkedList<>());
        // Command: Set the maximum capacity for the ticket pool
        this.maxCapacity = maxCapacity;
    }

    // Method to add tickets to the pool
    public synchronized void addTickets(int count) {
        // Command: Wait if the number of tickets to be added exceeds the pool's max capacity
        while (tickets.size() + count > maxCapacity) {
            try {
                // Command: Wait for available space if tickets cannot be added due to capacity
                wait();
            } catch (InterruptedException e) {
                // Command: Interrupt handling in case the thread is interrupted while waiting
                Thread.currentThread().interrupt();
                // Command: Log the interruption message with timestamp
                logger.severe(getCurrentTime() + " Vendor interrupted while waiting to add tickets.");
            }
        }

        // Command: Add tickets to the pool
        for (int i = 0; i < count; i++) {
            // Command: Add a new ticket with a unique identifier (Ticket X)
            tickets.add("Ticket " + (tickets.size() + 1));
        }

        // Command: Log the addition of tickets to the pool by the vendor
        logger.info(getCurrentTime() + " " + Thread.currentThread().getName() + " added " + count + " tickets. Available tickets: " + tickets.size());

        // Command: Notify all waiting threads that tickets have been added
        notifyAll();
    }

    // Method to remove a ticket from the pool
    public synchronized void removeTicket() {
        // Command: Wait if there are no tickets available in the pool
        while (tickets.isEmpty()) {
            try {
                // Command: Log the warning if no tickets are available for customers to retrieve
                logger.warning(getCurrentTime() + " No tickets available for customer to retrieve. Waiting for tickets...");
                // Command: Wait until there are tickets available in the pool
                wait();
            } catch (InterruptedException e) {
                // Command: Interrupt handling in case the thread is interrupted while waiting
                Thread.currentThread().interrupt();
                // Command: Log the interruption message with timestamp
                logger.severe(getCurrentTime() + " Customer interrupted while waiting to remove a ticket.");
            }
        }

        // Command: Remove the first ticket from the pool (FIFO - First In First Out)
        String ticket = tickets.remove(0);

        // Command: Log the ticket retrieval by the customer
        logger.info(getCurrentTime() + " " + Thread.currentThread().getName() + " purchased " + ticket + ". Tickets left: " + tickets.size());

        // Command: Notify all waiting threads that a ticket has been removed from the pool
        notifyAll();
    }
}
