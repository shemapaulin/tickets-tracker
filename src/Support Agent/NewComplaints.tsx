import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Agent {
  id: number;
  name: string;
}

interface Complaint {
  id: number;
  customerId: number;
  customerName: string;
  title: string;
  description: string;
  status: "New" | "Assigned" | "Resolved";
  supportAgent?: string;
  feedback?: string;
}

interface NewComplaintsProps {
  complaints: Complaint[];
  agents: Agent[];
  onAssign: (
    complaintId: number,
    agentName: string
  ) => void;
}

export default function NewComplaints({
  complaints,
  agents,
  onAssign,
}: NewComplaintsProps) {
  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        🆕 New Complaints
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {complaints.map((complaint) => (

          <Card
            key={complaint.id}
            className="border-l-4 border-red-500 shadow-md hover:shadow-xl transition-all"
          >

            <CardHeader>

              <CardTitle>
                {complaint.title}
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <div>

                <p className="font-semibold">
                  Customer
                </p>

                <p>{complaint.customerName}</p>

              </div>

              <div>

                <p className="font-semibold">
                  Description
                </p>

                <p className="text-muted-foreground">
                  {complaint.description}
                </p>

              </div>

              <Badge variant="destructive">
                New Complaint
              </Badge>

              <Select
                onValueChange={(value: string | null) => {
                  if (value) {
                    onAssign(
                      complaint.id,
                      value
                    );
                  }
                }}
              >

                <SelectTrigger>

                  <SelectValue placeholder="Assign Agent" />

                </SelectTrigger>

                <SelectContent>

                  {agents.map((agent) => (

                    <SelectItem
                      key={agent.id}
                      value={agent.name}
                    >
                      {agent.name}
                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
}