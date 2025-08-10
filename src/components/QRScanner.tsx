import { useState, useEffect } from 'react';
import { X, QrCode, CreditCard, Gift, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface QRScannerProps {
  onClose: () => void;
}

export function QRScanner({ onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(true);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  // Simulate QR scanning after 3 seconds
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        setScannedResult('upi://pay?pa=merchant@paytm&pn=Test Merchant&am=150.00&cu=INR');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  const quickActions = [
    { 
      icon: CreditCard, 
      label: 'Pay Bills', 
      description: 'Scan QR for quick payments',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      icon: Gift, 
      label: 'Offers', 
      description: 'Scan for exclusive deals',
      color: 'bg-green-50 text-green-600'
    },
    { 
      icon: FileText, 
      label: 'Menu/Catalog', 
      description: 'Scan restaurant menus',
      color: 'bg-orange-50 text-orange-600'
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <h1 className="text-lg">Scan QR Code</h1>
        <Button size="icon" variant="ghost" className="text-white" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative">
          {/* Camera Preview Simulation */}
          <div className="w-80 h-80 bg-gray-800 rounded-lg overflow-hidden relative">
            {isScanning ? (
              <>
                {/* Scanning Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                
                {/* Scanner Frame */}
                <div className="absolute inset-4 border-2 border-white rounded-lg">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                </div>

                {/* Scanning Line */}
                <div className="absolute inset-x-4 top-1/2 h-0.5 bg-primary animate-bounce"></div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4">
                  <QrCode className="h-16 w-16 text-black mx-auto" />
                </div>
              </div>
            )}
          </div>

          {/* Instruction Text */}
          <p className="text-white text-center mt-4">
            {isScanning ? 'Point your camera at a QR code' : 'QR Code detected!'}
          </p>
        </div>
      </div>

      {/* Result or Quick Actions */}
      {scannedResult ? (
        <div className="p-4 bg-white rounded-t-lg">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-50 rounded-lg p-2">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3>Payment Request</h3>
                  <p className="text-sm text-muted-foreground">Test Merchant</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="text-lg">₹150.00</span>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">Pay Now</Button>
                  <Button variant="outline" onClick={() => setScannedResult(null)}>
                    Scan Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="p-4 bg-white rounded-t-lg">
          <h3 className="text-center mb-4">Quick QR Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`${action.color} rounded-lg p-3`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4>{action.label}</h4>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}