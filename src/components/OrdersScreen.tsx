import { ArrowLeft, Package, Clock, CheckCircle, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface OrdersScreenProps {
  onNavigate: (screen: string) => void;
}

export function OrdersScreen({ onNavigate }: OrdersScreenProps) {
  const activeOrders = [
    {
      id: 'ORD001',
      type: 'food',
      restaurant: 'Burger King',
      items: 'Whopper Meal + 2 Items',
      status: 'preparing',
      estimatedTime: '25-30 mins',
      amount: 299,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop'
    },
    {
      id: 'ORD002',
      type: 'grocery',
      store: 'BigBasket',
      items: 'Vegetables & Fruits',
      status: 'packed',
      estimatedTime: '2-3 hours',
      amount: 845,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop'
    },
    {
      id: 'ORD003',
      type: 'medicine',
      pharmacy: 'Apollo Pharmacy',
      items: 'Paracetamol & 3 Items',
      status: 'out_for_delivery',
      estimatedTime: '45 mins',
      amount: 156,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'
    }
  ];

  const pastOrders = [
    {
      id: 'ORD004',
      type: 'ride',
      service: 'Uber',
      route: 'Home to Office',
      completedAt: '2 hours ago',
      amount: 180,
      rating: 5
    },
    {
      id: 'ORD005',
      type: 'food',
      restaurant: 'Dominos',
      items: 'Margherita Pizza',
      completedAt: 'Yesterday',
      amount: 399,
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'packed': return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'Preparing';
      case 'packed': return 'Packed';
      case 'out_for_delivery': return 'Out for Delivery';
      default: return status;
    }
  };

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
          <h1 className="text-lg">My Orders</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="active" className="h-full">
          <div className="border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Orders</TabsTrigger>
              <TabsTrigger value="past">Past Orders</TabsTrigger>
            </TabsList>
          </div>

          {/* Active Orders Tab */}
          <TabsContent value="active" className="p-4 space-y-4">
            {activeOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <img
                      src={order.image}
                      alt={order.type}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{order.restaurant || order.store || order.pharmacy}</h3>
                          <p className="text-sm text-muted-foreground">{order.items}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{order.estimatedTime}</span>
                        </div>
                        <p className="font-medium">₹{order.amount}</p>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {activeOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Active Orders</h3>
                <p className="text-muted-foreground">When you place orders, they'll appear here</p>
              </div>
            )}
          </TabsContent>

          {/* Past Orders Tab */}
          <TabsContent value="past" className="p-4 space-y-4">
            {pastOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{order.restaurant || order.service}</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.items || order.route}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.amount}</p>
                      <p className="text-sm text-muted-foreground">{order.completedAt}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Delivered</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Reorder</Button>
                      <Button size="sm" variant="outline">Rate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}