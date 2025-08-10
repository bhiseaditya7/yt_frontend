import { useState } from 'react';
import { ArrowLeft, Search, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GroceryScreenProps {
  onNavigate: (screen: string) => void;
}

export function GroceryScreen({ onNavigate }: GroceryScreenProps) {
  const [cart, setCart] = useState<any[]>([]);

  const categories = [
    { id: 'vegetables', name: 'Vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop' },
    { id: 'fruits', name: 'Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop' },
    { id: 'dairy', name: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop' },
    { id: 'snacks', name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop' }
  ];

  const products = [
    { id: '1', name: 'Fresh Tomatoes', price: 30, unit: 'per kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop' },
    { id: '2', name: 'Bananas', price: 50, unit: 'per dozen', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop' },
    { id: '3', name: 'Milk', price: 60, unit: 'per liter', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop' },
    { id: '4', name: 'Bread', price: 25, unit: 'per loaf', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop' }
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getItemQuantity = (productId: string) => {
    const item = cart.find(item => item.id === productId);
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
          <h1 className="text-lg">Grocery</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search groceries..."
            className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/70"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Categories */}
        <div>
          <h2 className="mb-3">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                  />
                  <p className="text-sm font-medium">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="mb-3">Fresh Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-3">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-sm font-medium mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.unit}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">₹{product.price}</p>
                    {getItemQuantity(product.id) > 0 ? (
                      <div className="flex items-center gap-1 border rounded p-1">
                        <Button size="icon" variant="ghost" className="h-6 w-6">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm min-w-[20px] text-center">
                          {getItemQuantity(product.id)}
                        </span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    )}
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
                  <p className="text-lg font-medium">₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
                </div>
                <Button variant="secondary">
                  Proceed to Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}