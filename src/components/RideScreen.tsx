import { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Clock, Car, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';

interface RideScreenProps {
  onNavigate: (screen: string) => void;
}

export function RideScreen({ onNavigate }: RideScreenProps) {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const rideTypes = [
    { 
      id: 'auto', 
      name: 'Auto', 
      price: '₹45-55', 
      time: '2 mins', 
      icon: Car,
      capacity: '3 people'
    },
    { 
      id: 'bike', 
      name: 'Bike', 
      price: '₹25-35', 
      time: '1 min', 
      icon: Car,
      capacity: '1 person'
    },
    { 
      id: 'cab', 
      name: 'Cab', 
      price: '₹85-95', 
      time: '3 mins', 
      icon: Car,
      capacity: '4 people'
    },
    { 
      id: 'share', 
      name: 'Share', 
      price: '₹35-45', 
      time: '5 mins', 
      icon: Users,
      capacity: 'Shared'
    }
  ];

  const savedPlaces = [
    { name: 'Home', address: 'Sector 18, Noida', icon: '🏠' },
    { name: 'Office', address: 'Connaught Place, Delhi', icon: '🏢' },
    { name: 'Mall', address: 'DLF Mall, Gurgaon', icon: '🛒' }
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
          <h1 className="text-lg">Book a Ride</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Location Inputs */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
              <Input
                placeholder="Pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-600" />
              <Input
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Saved Places */}
        <div>
          <h2 className="mb-3">Saved Places</h2>
          <div className="space-y-2">
            {savedPlaces.map((place, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{place.icon}</span>
                    <div>
                      <h3 className="font-medium">{place.name}</h3>
                      <p className="text-sm text-muted-foreground">{place.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ride Types */}
        <div>
          <h2 className="mb-3">Choose Ride Type</h2>
          <div className="space-y-3">
            {rideTypes.map((ride) => {
              const Icon = ride.icon;
              return (
                <Card key={ride.id} className="cursor-pointer hover:shadow-md transition-shadow border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{ride.name}</h3>
                          <p className="text-sm text-muted-foreground">{ride.capacity}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">{ride.price}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{ride.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Book Button */}
        <Button size="lg" className="w-full" disabled={!pickup || !destination}>
          Book Ride
        </Button>
      </div>
    </div>
  );
}