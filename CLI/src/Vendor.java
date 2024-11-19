class Vendor implements Runnable {
    private final int vendorId;
    private final TicketPool ticketPool;
    private final int releaseRate;

    public Vendor(int vendorId, TicketPool ticketPool, int releaseRate) {
        this.vendorId = vendorId;
        this.ticketPool = ticketPool;
        this.releaseRate = releaseRate;
    }

    @Override
    public void run() {
        Thread.currentThread().setName("Vendor-" + vendorId);
        while (true) {
            try {
                Thread.sleep(1000 / releaseRate);
                ticketPool.addTickets(1);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Vendor " + vendorId + " interrupted.");
                break;
            }
        }
    }
}