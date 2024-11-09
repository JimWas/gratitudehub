import React from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
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
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: api.getMessages
  });

  const updateMessageMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'approved' | 'rejected' }) => 
      api.updateMessageStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  const handleApprove = (id: string) => {
    updateMessageMutation.mutate(
      { id, status: 'approved' },
      {
        onSuccess: () => {
          toast({
            title: "Message Approved",
            description: "The message has been approved and is now visible.",
          });
        }
      }
    );
  };

  const handleReject = (id: string) => {
    updateMessageMutation.mutate(
      { id, status: 'rejected' },
      {
        onSuccess: () => {
          toast({
            title: "Message Rejected",
            description: "The message has been rejected and hidden from view.",
          });
        }
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            {messages.map((message: any) => (
              <TableRow key={message.id}>
                <TableCell className="max-w-md truncate">
                  {message.text}
                </TableCell>
                <TableCell>{message.created_at}</TableCell>
                <TableCell>{message.report_count}</TableCell>
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