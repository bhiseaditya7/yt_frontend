import { useState } from 'react';
import { Send, Plus, Car, UtensilsCrossed, CreditCard, Phone, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

interface ChatScreenProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot' | 'service';
  content: string;
  timestamp: Date;
  serviceAction?: {
    type: string;
    label: string;
    action: () => void;
  };
}

export function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello Rahul! How can I help you today?',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      type: 'user',
      content: 'I need to book a ride',
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      type: 'service',
      content: 'I can help you book a ride. Where would you like to go?',
      timestamp: new Date(Date.now() - 180000),
      serviceAction: {
        type: 'ride',
        label: 'Book Ride',
        action: () => onNavigate('ride'),
      },
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const smartReplies = [
    { text: 'Book a ride', action: () => onNavigate('ride') },
    { text: 'Order food', action: () => onNavigate('food') },
    { text: 'Recharge mobile', action: () => onNavigate('payments') },
    { text: 'Pay bills', action: () => onNavigate('payments') },
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I understand you need help with that. Let me assist you.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
        <Button 
          size="icon" 
          variant="ghost" 
          className="text-primary-foreground"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1>Support Chat</h1>
          <p className="text-sm opacity-90">Online • Typically replies instantly</p>
        </div>
        <Button size="icon" variant="ghost" className="text-primary-foreground">
          <Phone className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                {message.serviceAction && (
                  <Button
                    size="sm"
                    className="mt-2 w-full"
                    onClick={message.serviceAction.action}
                  >
                    {message.serviceAction.label}
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 px-1">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Smart Replies */}
      <div className="p-4 border-t">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
          {smartReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={reply.action}
            >
              {reply.text}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
          </div>
          <Button 
            size="icon"
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-muted/30">
        <h3 className="mb-2">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => onNavigate('ride')}
          >
            <Car className="h-4 w-4" />
            Ride
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => onNavigate('food')}
          >
            <UtensilsCrossed className="h-4 w-4" />
            Food
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => onNavigate('payments')}
          >
            <CreditCard className="h-4 w-4" />
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
}