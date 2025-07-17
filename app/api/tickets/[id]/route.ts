import { type NextRequest, NextResponse } from "next/server";

// Define proper types for the ticket structure
interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: string;
  updatedAt: string;
  customerName: string;
  customerEmail: string;
}

// In-memory storage for demo purposes
const tickets: Ticket[] = [
  {
    id: "1",
    title: "Login Issues",
    description:
      'Unable to log into my account. Getting error message "Invalid credentials" even with correct password.',
    status: "open",
    priority: "high",
    category: "technical",
    createdAt: new Date("2024-01-15T10:30:00Z").toISOString(),
    updatedAt: new Date("2024-01-15T10:30:00Z").toISOString(),
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
  },
  {
    id: "2",
    title: "Billing Question",
    description: "I was charged twice for my subscription this month. Can you please help me understand why?",
    status: "in-progress",
    priority: "medium",
    category: "billing",
    createdAt: new Date("2024-01-14T14:20:00Z").toISOString(),
    updatedAt: new Date("2024-01-15T09:15:00Z").toISOString(),
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
  },
  {
    id: "3",
    title: "Feature Request: Dark Mode",
    description:
      "Would love to see a dark mode option in the application. Many users have been requesting this feature.",
    status: "resolved",
    priority: "low",
    category: "feature-request",
    createdAt: new Date("2024-01-10T16:45:00Z").toISOString(),
    updatedAt: new Date("2024-01-13T11:30:00Z").toISOString(),
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@example.com",
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(ticket);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const ticketIndex = tickets.findIndex((t) => t.id === id);

    if (ticketIndex === -1) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(tickets[ticketIndex]);
  } catch {
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ticketIndex = tickets.findIndex((t) => t.id === id);

  if (ticketIndex === -1) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  tickets.splice(ticketIndex, 1);

  return NextResponse.json({ message: "Ticket deleted successfully" });
}
