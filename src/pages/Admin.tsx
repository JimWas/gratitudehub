import React from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const { toast } = useToast();
  const [messages, setMessages] = React.useState([
    {
      id: "1",
      text: "To the kind stranger who helped me change my tire...",
      status: "pending",
      reportCount: 0,
      createdAt: "2024-02-14 15:30",
    },
    // Add more mock data as needed
  ]);

  const handleApprove = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: 'approved' } : msg
    ));
    toast({
      title: "Message Approved",
      description: "The message has been approved and is now visible.",
    });
  };

  const handleReject = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: 'rejected' } : msg
    ));
    toast({
      title: "Message Rejected",
      description: "The message has been rejected and hidden from view.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <Card className="p-6">
        <h2 className="text-xl mb-4">Pending Messages</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Message</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Reports</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="max-w-md truncate">
                  {message.text}
                </TableCell>
                <TableCell>{message.createdAt}</TableCell>
                <TableCell>{message.reportCount}</TableCell>
                <TableCell>{message.status}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(message.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleReject(message.id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Admin;