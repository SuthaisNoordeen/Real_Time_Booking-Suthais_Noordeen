
class Customer implements Runnable {
    private final int customerId;
    private final TicketPool ticketPool;
    private final int retrievalRate;

    public Customer(int customerId, TicketPool ticketPool, int retrievalRate) {
        this.customerId = customerId;
        this.ticketPool = ticketPool;
        this.retrievalRate = retrievalRate;
    }

    @Override
    public void run() {
        Thread.currentThread().setName("Customer-" + customerId);
        while (true) {
            try {
                Thread.sleep(1000 / retrievalRate);
                ticketPool.removeTicket();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Customer " + customerId + " interrupted.");
                break;
            }
        }
    }
}