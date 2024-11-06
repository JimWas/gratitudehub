import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface MessageFormProps {
  onSubmit: (message: { text: string; image?: File }) => void;
  selectedCity: string;
}

const MessageForm = ({ onSubmit, selectedCity }: MessageFormProps) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ text, image: image || undefined });
    setText("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thank you message..."
        className="min-h-[100px]"
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="flex-1"
        />
        <Button type="submit" className="w-full sm:w-auto">
          Submit Thank You
        </Button>
      </div>
      <p className="text-sm text-gray-500 text-center">
        Posting from {selectedCity}
      </p>
    </form>
  );
};

export default MessageForm;