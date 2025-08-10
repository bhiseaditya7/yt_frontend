import { useState } from 'react';
import { ArrowLeft, QrCode, Send, Download, CreditCard, Smartphone, Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PaymentsScreenProps {
  onNavigate: (screen: string) => void;
}

export function PaymentsScreen({ onNavigate }: PaymentsScreenProps) {
  const [showBalance, setShowBalance] = useState(false);
  const [amount, setAmount] = useState('');

  const quickAmounts = ['100', '200', '500', '1000'];
  
  const recentTransactions = [
    { id: '1', type: 'sent', amount: 150, name: 'Priya Sharma', time: '2 hours ago', status: 'success' },
    { id: '2', type: 'received', amount: 300, name: 'Amit Kumar', time: '5 hours ago', status: 'success' },
    { id: '3', type: 'bill', amount: 1200, name: 'Electricity Bill', time: 'Yesterday', status: 'success' },
    { id: '4', type: 'recharge', amount: 199, name: 'Mobile Recharge', time: '2 days ago', status: 'success' },
  ];

  const billCategories = [
    { icon: Zap, label: 'Electricity', color: 'bg-yellow-50 text-yellow-600' },
    { icon: Smartphone, label: 'Mobile', color: 'bg-blue-50 text-blue-600' },
    { icon: CreditCard, label: 'Credit Card', color: 'bg-purple-50 text-purple-600' },
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
          <h1 className="text-lg">Payments</h1>
        </div>

        {/* Wallet Balance */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Wallet Balance</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl">
                    {showBalance ? '₹2,450.00' : '₹••••••'}
                  </h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-primary-foreground"
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button size="sm" variant="secondary">
                Add Money
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="send" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Send Money Tab */}
          <TabsContent value="send" className="space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <QrCode className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm">Scan QR</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Smartphone className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm">To Mobile</p>
                </CardContent>
              </Card>
            </div>

            {/* Send Money Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Money</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Enter UPI ID or Mobile Number" />
                
                <div>
                  <Input
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    {quickAmounts.map((amt) => (
                      <Button
                        key={amt}
                        size="sm"
                        variant="outline"
                        onClick={() => setAmount(amt)}
                      >
                        ₹{amt}
                      </Button>
                    ))}
                  </div>
                </div>

                <Input placeholder="Add a note (optional)" />
                
                <Button className="w-full" disabled={!amount}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Money
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bills Tab */}
          <TabsContent value="bills" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {billCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className={`${category.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-sm">{category.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Bills */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Electricity Bill</p>
                    <p className="text-sm text-muted-foreground">Due: Mar 15</p>
                  </div>
                  <div className="text-right">
                    <p>₹1,240</p>
                    <Button size="sm">Pay Now</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Internet Bill</p>
                    <p className="text-sm text-muted-foreground">Due: Mar 20</p>
                  </div>
                  <div className="text-right">
                    <p>₹899</p>
                    <Button size="sm">Pay Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transaction History Tab */}
          <TabsContent value="history" className="space-y-4">
            {recentTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'sent' ? 'bg-red-50' :
                        transaction.type === 'received' ? 'bg-green-50' :
                        'bg-blue-50'
                      }`}>
                        {transaction.type === 'sent' ? (
                          <Send className="h-4 w-4 text-red-600" />
                        ) : transaction.type === 'received' ? (
                          <Download className="h-4 w-4 text-green-600" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p>{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`${
                        transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount}
                      </p>
                      <p className="text-xs text-green-600">Success</p>
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