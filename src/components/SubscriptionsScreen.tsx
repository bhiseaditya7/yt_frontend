import { ArrowLeft, Search, Play, Tv, Music, BookOpen, Gamepad2, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SubscriptionsScreenProps {
  onNavigate: (screen: string) => void;
}

export function SubscriptionsScreen({ onNavigate }: SubscriptionsScreenProps) {
  const subscriptions = [
    {
      id: 'netflix',
      name: 'Netflix',
      category: 'Video Streaming',
      price: 649,
      period: 'month',
      icon: Tv,
      color: 'bg-red-50 text-red-600',
      status: 'active',
      renewsOn: 'Mar 15, 2024',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=200&fit=crop'
    },
    {
      id: 'spotify',
      name: 'Spotify Premium',
      category: 'Music Streaming',
      price: 119,
      period: 'month',
      icon: Music,
      color: 'bg-green-50 text-green-600',
      status: 'active',
      renewsOn: 'Mar 22, 2024',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop'
    },
    {
      id: 'prime',
      name: 'Amazon Prime',
      category: 'Shopping & Video',
      price: 1499,
      period: 'year',
      icon: Crown,
      color: 'bg-blue-50 text-blue-600',
      status: 'active',
      renewsOn: 'Sep 10, 2024',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop'
    }
  ];

  const availableServices = [
    {
      id: 'hotstar',
      name: 'Disney+ Hotstar',
      category: 'Video Streaming',
      price: 299,
      period: 'month',
      icon: Play,
      color: 'bg-indigo-50 text-indigo-600',
      offer: '50% OFF'
    },
    {
      id: 'kindle',
      name: 'Kindle Unlimited',
      category: 'Books & Reading',
      price: 149,
      period: 'month',
      icon: BookOpen,
      color: 'bg-orange-50 text-orange-600',
      offer: 'Free Trial'
    },
    {
      id: 'gamepass',
      name: 'Xbox Game Pass',
      category: 'Gaming',
      price: 489,
      period: 'month',
      icon: Gamepad2,
      color: 'bg-green-50 text-green-600',
      offer: '3 Months Free'
    }
  ];

  const totalMonthlySpend = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => {
      return total + (sub.period === 'month' ? sub.price : sub.price / 12);
    }, 0);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-primary-foreground"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg">Subscriptions</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search subscriptions..."
            className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/70"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Spending Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Monthly Spending</h3>
            <p className="text-2xl font-bold text-primary mb-1">₹{Math.round(totalMonthlySpend)}</p>
            <p className="text-sm text-muted-foreground">Across {subscriptions.filter(s => s.status === 'active').length} active subscriptions</p>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        <div>
          <h2 className="mb-3">Active Subscriptions</h2>
          <div className="space-y-3">
            {subscriptions.map((subscription) => {
              const Icon = subscription.icon;
              return (
                <Card key={subscription.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={subscription.image}
                        alt={subscription.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{subscription.name}</h3>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{subscription.category}</p>
                        <p className="text-xs text-muted-foreground">Renews on {subscription.renewsOn}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">₹{subscription.price}</p>
                        <p className="text-xs text-muted-foreground">per {subscription.period}</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Available Services */}
        <div>
          <h2 className="mb-3">Discover New Services</h2>
          <div className="space-y-3">
            {availableServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="border-dashed">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`${service.color} rounded-lg p-3`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{service.name}</h3>
                          {service.offer && (
                            <Badge className="text-xs bg-orange-100 text-orange-700">
                              {service.offer}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{service.category}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">₹{service.price}</p>
                        <p className="text-xs text-muted-foreground">per {service.period}</p>
                        <Button size="sm" className="mt-2">
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Tv className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Manage All</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="bg-green-50 rounded-lg p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Crown className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium">Upgrade Plans</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}