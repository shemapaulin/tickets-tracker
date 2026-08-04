import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface Complaint {
    id: number;
    customerId: number;
    title: string;
    description: string;
    status: string;
    supportAgent: string;
}

interface MyComplaintsProps {
    complaints: Complaint[];
}

export default function MyComplaints({
    complaints,
}: MyComplaintsProps) {
    return (
        <div>

            <h2 className="text-3xl font-bold mb-6">
                My Complaints
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {complaints.map((complaint) => (

                    <Card key={complaint.id}>

                        <CardHeader>

                            <CardTitle>
                                #{complaint.id} - {complaint.title}
                            </CardTitle>

                        </CardHeader>

                        <CardContent className="space-y-3">

                            <p>
                                <strong>Customer:</strong>{" "}
                                {complaint.customerId}
                            </p>

                            <p>
                                {complaint.description}
                            </p>

                            <Badge>
                                {complaint.status}
                            </Badge>

                            <p className="text-sm text-gray-500">
                                Assigned to:{" "}
                                {complaint.supportAgent}
                            </p>

                        </CardContent>

                    </Card>

                ))}

            </div>

        </div>
    );
}