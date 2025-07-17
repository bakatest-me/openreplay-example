import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
// In a real application, you would use a database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tickets: any[] = [
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
]

export async function GET() {
  return NextResponse.json(tickets)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newTicket = {
      id: (tickets.length + 1).toString(),
      ...body,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    tickets.push(newTicket)

    return NextResponse.json(newTicket, { status: 201 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}
