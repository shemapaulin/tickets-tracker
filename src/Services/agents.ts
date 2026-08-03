//agents should have name, email, phone number, and department. The department should be a dropdown with the following options: Sales, Support, and Billing. The agent should also have a status of Active or Inactive. The status should be a dropdown with the following options: Active and Inactive. and also assagned complaints.

export const agents = [
  {
    id: 1,
    name: "Charles Murava",
    email: "i2DyS@example.com",
    password: "password123",
    phone: "0781234567",
    department: "Sales",
    status: "Active",
    assignedComplaintsIds: [1, 2],
  },
    {
    id: 2,
    name: "Shingiro Audran",
    email: "customer2@example.com",
    password: "password456",
    phone: "0781234568",
    department: "Support",
    status: "Active",
    assignedComplaintsIds: [3, 4],
  }
]