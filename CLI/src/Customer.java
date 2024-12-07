import java.util.logging.Logger;

class Customer implements Runnable {
    private final int customerId;  // Unique ID for the customer (used for identification)
    private final TicketPool ticketPool;  // Reference to the TicketPool object from which tickets are retrieved
    private final int retrievalRate;  // Rate at which the customer retrieves tickets (in tickets per second)
    private static final Logger logger = Logger.getLogger(Customer.class.getName());  // Logger for logging messages

    // Constructor to initialize the Customer object with an ID, ticket pool, and retrieval rate
    public Customer(int customerId, TicketPool ticketPool, int retrievalRate) {
        this.customerId = customerId;  // Set the customer ID
        this.ticketPool = ticketPool;  // Set the ticket pool reference
        this.retrievalRate = retrievalRate;  // Set the retrieval rate
    }

    // The run method executed when the thread starts
    @Override
    public void run() {
        // Set the name of the current thread to indicate which customer thread it is (e.g., "Customer-1")
        Thread.currentThread().setName("Customer-" + customerId);

        // Infinite loop: the customer will continuously try to retrieve tickets from the pool
        while (true) {
            try {
                // Sleep for a time calculated by the retrieval rate (1 second divided by retrieval rate)
                // This simulates the time delay between each ticket retrieval based on the retrieval rate
                Thread.sleep(1000 / retrievalRate);

                // Retrieve one ticket from the ticket pool
                ticketPool.removeTicket();
            } catch (InterruptedException e) {
                // If the customer thread is interrupted while sleeping or during ticket retrieval, log the interruption
                Thread.currentThread().interrupt();
                logger.severe("Customer " + customerId + " interrupted.");
                break;  // Exit the loop if interrupted
            }
        }
    }
}
