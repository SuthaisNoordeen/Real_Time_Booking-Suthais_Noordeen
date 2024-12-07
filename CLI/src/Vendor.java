class Vendor implements Runnable {
    private final int vendorId;  // Unique ID for the vendor (used for identification)
    private final TicketPool ticketPool;  // Reference to the TicketPool object where tickets are stored
    private final int releaseRate;  // Rate at which the vendor releases tickets (in tickets per second)

    // Constructor to initialize the Vendor object with an ID, ticket pool, and release rate
    public Vendor(int vendorId, TicketPool ticketPool, int releaseRate) {
        this.vendorId = vendorId;  // Set the vendor ID
        this.ticketPool = ticketPool;  // Set the ticket pool reference
        this.releaseRate = releaseRate;  // Set the release rate
    }

    // The run method executed when the thread starts
    @Override
    public void run() {
        // Set the name of the current thread to indicate which vendor thread it is (e.g., "Vendor-1")
        Thread.currentThread().setName("Vendor-" + vendorId);

        // Infinite loop: the vendor will continuously add tickets to the pool
        while (true) {
            try {
                // Sleep for a time calculated by the release rate (1 second divided by release rate)
                // This simulates the time delay between ticket releases based on the release rate
                Thread.sleep(1000 / releaseRate);

                // Add one ticket to the ticket pool
                ticketPool.addTickets(1);
            } catch (InterruptedException e) {
                // If the vendor thread is interrupted while sleeping, log the interruption and break the loop
                Thread.currentThread().interrupt();
                System.out.println("Vendor " + vendorId + " interrupted.");
                break;
            }
        }
    }
}
