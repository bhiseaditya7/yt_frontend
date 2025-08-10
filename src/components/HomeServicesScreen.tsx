import { ArrowLeft, Search, Wrench, Zap, Droplets, Wind, Paintbrush, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface HomeServicesScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeServicesScreen({ onNavigate }: HomeServicesScreenProps) {
  const services = [
    { 
      id: 'electrician', 
      name: 'Electrician', 
      icon: Zap, 
      price: '₹199 onwards', 
      rating: 4.5,
      color: 'bg-yellow-50 text-yellow-600'
    },
    { 
      id: 'plumber', 
      name: 'Plumber', 
      icon: Droplets, 
      price: '₹179 onwards', 
      rating: 4.3,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      id: 'ac-repair', 
      name: 'AC Repair', 
      icon: Wind, 
      price: '₹299 onwards', 
      rating: 4.4,
      color: 'bg-cyan-50 text-cyan-600'
    },
    { 
      id: 'carpenter', 
      name: 'Carpenter', 
      icon: Wrench, 
      price: '₹249 onwards', 
      rating: 4.2,
      color: 'bg-orange-50 text-orange-600'
    },
    { 
      id: 'painter', 
      name: 'Painter', 
      icon: Paintbrush, 
      price: '₹399 onwards', 
      rating: 4.6,
      color: 'bg-green-50 text-green-600'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: Shield, 
      price: '₹500 onwards', 
      rating: 4.7,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];

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
          <h1 className="text-lg">Home Services</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search services..."
            className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/70"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Emergency Services */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-medium text-red-900">Emergency Services</h3>
                <p className="text-sm text-red-700">Available 24/7 for urgent repairs</p>
              </div>
              <Button size="sm" variant="destructive" className="ml-auto">
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div>
          <h2 className="mb-3">Popular Services</h2>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className={`${service.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-3`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <h3 className="font-medium mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{service.price}</p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        ⭐ {service.rating}
                      </Badge>
                      <Button size="sm">Book</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Today's Available Slots */}
        <div>
          <h2 className="mb-3">Today's Available Slots</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {timeSlots.map((slot, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <h2 className="mb-3">Recent Bookings</h2>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Plumber Service</h3>
                      <p className="text-sm text-muted-foreground">Completed • 2 days ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹280</p>
                    <Button size="sm" variant="outline">Rebook</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-50 rounded-lg p-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Electrician</h3>
                      <p className="text-sm text-muted-foreground">Completed • 1 week ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹350</p>
                    <Button size="sm" variant="outline">Rebook</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}