import { useState } from 'react';
import { Home, MessageCircle, QrCode, Package, User } from 'lucide-react';
import { Button } from './components/ui/button';
import { cn } from './components/ui/utils';
import { HomeScreen } from './components/HomeScreen';
import { ChatScreen } from './components/ChatScreen';
import { PaymentsScreen } from './components/PaymentsScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { QRScanner } from './components/QRScanner';
import { FoodScreen } from './components/FoodScreen';
import { GroceryScreen } from './components/GroceryScreen';
import { MedicineScreen } from './components/MedicineScreen';
import { RideScreen } from './components/RideScreen';
import { HomeServicesScreen } from './components/HomeServicesScreen';
import { SubscriptionsScreen } from './components/SubscriptionsScreen';
// import { PatchRoutesOnNavigationFunction } from 'react-router-dom';

type Screen = 
  | 'home' 
  | 'chat' 
  | 'orders' 
  | 'profile' 
  | 'payments' 
  | 'food' 
  | 'grocery' 
  | 'medicine' 
  | 'ride' 
  | 'home-services' 
  | 'subscriptions';

export default function Home1() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [showQRScanner, setShowQRScanner] = useState(false);

  // Wrapper function to handle navigation with proper type conversion
  const handleNavigate = (screen: string) => {
    setActiveScreen(screen as Screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatScreen onNavigate={handleNavigate} />;
      case 'orders':
        return <OrdersScreen onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      case 'payments':
        return <PaymentsScreen onNavigate={handleNavigate} />;
      case 'food':
        return <FoodScreen onNavigate={handleNavigate} />;
      case 'grocery':
        return <GroceryScreen onNavigate={handleNavigate} />;
      case 'medicine':
        return <MedicineScreen onNavigate={handleNavigate} />;
      case 'ride':
        return <RideScreen onNavigate={handleNavigate} />;
      case 'home-services':
        return <HomeServicesScreen onNavigate={handleNavigate} />;
      case 'subscriptions':
        return <SubscriptionsScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'chat' as Screen, icon: MessageCircle, label: 'Chat' },
    { id: 'orders' as Screen, icon: Package, label: 'Orders' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' },
  ];

  return (
    <div className="h-screen bg-background flex flex-col relative">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>

      {/* QR Scanner Overlay */}
      {showQRScanner && (
        <QRScanner onClose={() => setShowQRScanner(false)} />
      )}

      {/* Bottom Navigation */}
      <div className="relative bg-white border-t border-border">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center gap-1 p-2 h-auto min-w-0",
                  activeScreen === item.id ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setActiveScreen(item.id)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Floating QR Scanner Button */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <Button
            size="lg"
            className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-lg"
            onClick={() => setShowQRScanner(true)}
          >
            <QrCode className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}