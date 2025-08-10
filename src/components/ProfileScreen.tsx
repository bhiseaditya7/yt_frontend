import { ArrowLeft, User, MapPin, CreditCard, Settings, HelpCircle, LogOut, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const menuItems = [
    {
      icon: MapPin,
      label: 'Saved Addresses',
      subtitle: 'Home, Work & Other addresses',
      action: () => console.log('Addresses')
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      subtitle: 'Cards, UPI & Wallet',
      action: () => onNavigate('payments')
    },
    {
      icon: Settings,
      label: 'Settings',
      subtitle: 'Notifications, Privacy & More',
      action: () => console.log('Settings')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      subtitle: 'FAQs, Contact Us',
      action: () => onNavigate('chat')
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-primary-foreground"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg">Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-xl font-medium">Rahul Sharma</h2>
                <p className="text-muted-foreground">+91 98765 43210</p>
                <p className="text-sm text-muted-foreground">rahul.sharma@email.com</p>
              </div>
              
              <Button size="icon" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-primary">127</h3>
              <p className="text-sm text-muted-foreground">Orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-primary">₹24K</h3>
              <p className="text-sm text-muted-foreground">Saved</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-primary">4.8</h3>
              <p className="text-sm text-muted-foreground">Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4" onClick={item.action}>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Logout */}
        <Card className="border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 text-destructive">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>SuperApp v2.1.0</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </div>
  );
}