import java.util.List;
import java.util.LinkedList;
import java.util.Collections;

class TicketPool {
    private final List<String> tickets;
    private final int maxCapacity;

    public TicketPool(int maxCapacity) {
        this.tickets = Collections.synchronizedList(new LinkedList<>());
        this.maxCapacity = maxCapacity;
    }

    public synchronized void addTickets(int count) {
        while (tickets.size() + count > maxCapacity) {
            try {
                wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Vendor interrupted while waiting to add tickets.");
            }
        }
        for (int i = 0; i < count; i++) {
            tickets.add("Ticket " + (tickets.size() + 1));
        }
        System.out.println(Thread.currentThread().getName() + " added " + count + " tickets. Total tickets: " + tickets.size());
        notifyAll();
    }

    public synchronized void removeTicket() {
        while (tickets.isEmpty()) {
            try {
                wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Customer interrupted while waiting to remove a ticket.");
            }
        }
        String ticket = tickets.remove(0);
        System.out.println(Thread.currentThread().getName() + " purchased " + ticket + ". Tickets left: " + tickets.size());
        notifyAll();
    }
}