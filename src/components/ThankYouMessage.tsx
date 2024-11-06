import React from 'react';
import { Card } from "@/components/ui/card";

interface ThankYouMessageProps {
  message: {
    id: string;
    text: string;
    imageUrl?: string;
    timestamp: string;
    location: string;
  };
}

const ThankYouMessage = ({ message }: ThankYouMessageProps) => {
  return (
    <Card className="message-card">
      <div className="flex flex-col md:flex-row gap-4">
        {message.imageUrl && (
          <div className="md:w-1/3">
            <img 
              src={message.imageUrl} 
              alt="Thank you moment" 
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        <div className={message.imageUrl ? "md:w-2/3" : "w-full"}>
          <p className="text-lg mb-2">{message.text}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="message-timestamp">{message.timestamp}</span>
            <span className="text-sm">{message.location}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThankYouMessage;