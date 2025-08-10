import { ArrowLeft, Search, Upload, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MedicineScreenProps {
  onNavigate: (screen: string) => void;
}

export function MedicineScreen({ onNavigate }: MedicineScreenProps) {
  const categories = [
    { id: 'wellness', name: 'Wellness', color: 'bg-green-50 text-green-600' },
    { id: 'personal-care', name: 'Personal Care', color: 'bg-blue-50 text-blue-600' },
    { id: 'baby-care', name: 'Baby Care', color: 'bg-pink-50 text-pink-600' },
    { id: 'ayurveda', name: 'Ayurveda', color: 'bg-orange-50 text-orange-600' }
  ];

  const medicines = [
    { 
      id: '1', 
      name: 'Paracetamol 500mg', 
      company: 'Cipla Ltd', 
      price: 15, 
      originalPrice: 20, 
      prescription: false,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop'
    },
    { 
      id: '2', 
      name: 'Vitamin D3 Tablets', 
      company: 'Sun Pharma', 
      price: 180, 
      originalPrice: 220, 
      prescription: false,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop'
    },
    { 
      id: '3', 
      name: 'Cough Syrup', 
      company: 'Dr. Reddy\'s', 
      price: 85, 
      originalPrice: 95, 
      prescription: true,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop'
    }
  ];

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
          <h1 className="text-lg">Medicine</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search medicines..."
            className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/70"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Upload Prescription */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-medium mb-2">Upload Prescription</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get medicines delivered in 2 hours with valid prescription
            </p>
            <Button>Upload & Order</Button>
          </CardContent>
        </Card>

        {/* Quick Order */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Quick Order</h3>
                <p className="text-sm text-muted-foreground">Reorder your previous medicines</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div>
          <h2 className="mb-3">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className={`${category.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
                    <div className="w-6 h-6 bg-current rounded"></div>
                  </div>
                  <p className="text-sm font-medium">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Medicines */}
        <div>
          <h2 className="mb-3">Popular Medicines</h2>
          <div className="space-y-3">
            {medicines.map((medicine) => (
              <Card key={medicine.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <ImageWithFallback
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{medicine.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{medicine.company}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₹{medicine.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{medicine.originalPrice}</span>
                        {medicine.prescription && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Rx</span>
                        )}
                      </div>
                    </div>
                    <Button size="sm">Add</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}