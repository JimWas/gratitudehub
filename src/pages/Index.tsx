import React, { useState } from 'react';
import CitySelector from '../components/CitySelector';
import ThankYouMessage from '../components/ThankYouMessage';
import MessageForm from '../components/MessageForm';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("Houston, Texas");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "To the kind stranger who helped me change my tire on Westheimer Road - your kindness made my day. Thank you!",
      timestamp: "2024-02-14 15:30",
      location: "Houston, Texas",
    },
    {
      id: "2",
      text: "Thank you to the person who returned my wallet at Memorial Park. You restored my faith in humanity!",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      timestamp: "2024-02-14 14:15",
      location: "Houston, Texas",
    },
  ]);

  const { toast } = useToast();

  const handleSubmit = (messageData: { text: string; image?: File }) => {
    const newMessage = {
      id: Date.now().toString(),
      text: messageData.text,
      imageUrl: messageData.image ? URL.createObjectURL(messageData.image) : undefined,
      timestamp: new Date().toLocaleString(),
      location: selectedCity,
    };

    setMessages([newMessage, ...messages]);
    toast({
      title: "Thank you!",
      description: "Your message has been posted successfully.",
    });
  };

  return (
    <div className="container px-4 py-8 max-w-4xl">
      <h1 className="drudge-title">ThankYou4.us</h1>
      
      <CitySelector 
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      <div className="mb-12">
        <MessageForm onSubmit={handleSubmit} selectedCity={selectedCity} />
      </div>

      <div className="space-y-6">
        {messages.map((message) => (
          <ThankYouMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Index;