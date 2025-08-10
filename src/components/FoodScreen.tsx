import { useState } from 'react';
import { ArrowLeft, Search, Star, Plus, Clock, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FoodScreenProps {
  onNavigate: (screen: string) => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function FoodScreen({ onNavigate }: FoodScreenProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const categories = [
    { id: 'popular', name: 'Popular' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'Burgers' },
    { id: 'indian', name: 'Indian' },
    { id: 'chinese', name: 'Chinese' }
  ];

  const restaurants = [
    {
      id: '1',
      name: 'Pizza Hut',
      cuisine: 'Italian, Fast Food',
      rating: 4.2,
      deliveryTime: '25-30 mins',
      offer: '50% OFF',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Burger King',
      cuisine: 'Burgers, Fast Food',
      rating: 4.1,
      deliveryTime: '20-25 mins',
      offer: 'Buy 1 Get 1',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Subway',
      cuisine: 'Healthy, Sandwiches',
      rating: 4.0,
      deliveryTime: '30-35 mins',
      offer: '20% OFF',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop'
    }
  ];

  const menuItems = [
    { id: '1', name: 'Margherita Pizza', price: 299, rating: 4.5, veg: true },
    { id: '2', name: 'Chicken Burger', price: 199, rating: 4.3, veg: false },
    { id: '3', name: 'Veg Sandwich', price: 149, rating: 4.1, veg: true },
    { id: '4', name: 'Pasta Italiano', price: 249, rating: 4.4, veg: true }
  ];

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      return prev.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

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
          <h1 className="text-lg">Food Delivery</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for restaurants or dishes..."
            className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/70"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="border-b">
        <div className="flex gap-2 p-4 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Restaurants */}
        <div>
          <h2 className="mb-3">Restaurants Near You</h2>
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-32 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-600">
                      {restaurant.offer}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{restaurant.name}</h3>
                        <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <h2 className="mb-3">Popular Items</h2>
          <div className="space-y-3">
            {menuItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className={`w-3 h-3 rounded border ${
                          item.veg ? 'border-green-600' : 'border-red-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full m-0.5 ${
                            item.veg ? 'bg-green-600' : 'bg-red-600'
                          }`}></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                        <p className="font-medium">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getItemQuantity(item.id) > 0 ? (
                        <div className="flex items-center gap-2 border rounded-lg p-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm min-w-[20px] text-center">
                            {getItemQuantity(item.id)}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => addToCart(item)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div className="bg-white border-t p-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{cart.reduce((total, item) => total + item.quantity, 0)} items</p>
                  <p className="text-lg font-medium">₹{getCartTotal()}</p>
                </div>
                <Button variant="secondary">
                  View Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}