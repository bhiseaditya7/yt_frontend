import { Search, Bell, Wallet, Car, UtensilsCrossed, ShoppingCart, Pill, Tv, Wrench, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const services = [
    { id: 'ride', icon: Car, label: 'Ride', color: 'bg-blue-50 text-blue-600' },
    { id: 'food', icon: UtensilsCrossed, label: 'Food', color: 'bg-orange-50 text-orange-600' },
    { id: 'grocery', icon: ShoppingCart, label: 'Grocery', color: 'bg-green-50 text-green-600' },
    { id: 'medicine', icon: Pill, label: 'Medicine', color: 'bg-red-50 text-red-600' },
    { id: 'subscriptions', icon: Tv, label: 'Subscriptions', color: 'bg-purple-50 text-purple-600' },
    { id: 'home-services', icon: Wrench, label: 'Home Services', color: 'bg-indigo-50 text-indigo-600' },
  ];

  const quickActions = [
    { label: 'Pay Bills', action: () => onNavigate('payments') },
    { label: 'Recharge', action: () => onNavigate('payments') },
    { label: 'Send Money', action: () => onNavigate('payments') },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg">Good morning, Rahul!</h1>
            <p className="text-sm opacity-90">How can we help you today?</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-primary-foreground">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for services..."
            className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/70"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="mb-3">Quick Actions</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="whitespace-nowrap"
                onClick={action.action}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h2 className="mb-3">Services</h2>
          <div className="grid grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate(service.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`${service.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm">{service.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* My Orders */}
        <Card className="cursor-pointer" onClick={() => onNavigate('orders')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3>My Orders</h3>
                  <p className="text-sm text-muted-foreground">Track your orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary">3 Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div>
          <h2 className="mb-3">Recent Activity</h2>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 rounded-lg p-2">
                    <UtensilsCrossed className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Food order delivered</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <p className="text-sm">₹240</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <Car className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Ride completed</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                  <p className="text-sm">₹180</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}