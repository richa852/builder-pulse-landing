import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Truck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  supplier: string;
  quantity: number;
  image: string;
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Fresh Onions",
    category: "Vegetables",
    price: 30,
    unit: "kg",
    supplier: "Mumbai Fresh Supplies",
    quantity: 5,
    image: "/placeholder.svg"
  },
  {
    id: "2", 
    name: "Red Chili Powder",
    category: "Spices",
    price: 180,
    unit: "kg",
    supplier: "Spice Masters Co",
    quantity: 2,
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Paper Plates (100pcs)",
    category: "Packaging",
    price: 85,
    unit: "pack",
    supplier: "Eco Pack Solutions",
    quantity: 3,
    image: "/placeholder.svg"
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const deliveryFee = 50;
  const total = getSubtotal() + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-saffron/5 to-turmeric/5">
        {/* Header */}
        <header className="bg-white border-b border-curry/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-curry">Street Vendor Hub</h1>
                <Badge variant="secondary" className="bg-mint/10 text-mint border-mint/20">
                  Shopping Cart
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingCart className="w-24 h-24 text-curry/40 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-curry mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add some products to get started with your order</p>
          <Link to="/vendor">
            <Button className="bg-curry hover:bg-curry/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/5 to-turmeric/5">
      {/* Header */}
      <header className="bg-white border-b border-curry/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-curry">Street Vendor Hub</h1>
              <Badge variant="secondary" className="bg-mint/10 text-mint border-mint/20">
                <ShoppingCart className="w-3 h-3 mr-1" />
                Shopping Cart
              </Badge>
            </div>
            <Link to="/vendor">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-curry/20">
              <CardHeader>
                <CardTitle className="text-curry flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart Items ({cartItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-curry/10">
                    <div className="w-16 h-16 bg-gradient-to-br from-saffron/10 to-turmeric/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-curry/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-curry truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.supplier}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs bg-mint/10 text-mint border-mint/20">
                          {item.category}
                        </Badge>
                        <span className="text-sm font-medium text-curry">₹{item.price}/{item.unit}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-curry">₹{item.price * item.quantity}</div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Checkout */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-curry/20">
              <CardHeader>
                <CardTitle className="text-curry">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">₹{getSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Delivery Fee
                  </span>
                  <span className="font-medium">₹{deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold text-curry">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="border-curry/20">
              <CardHeader>
                <CardTitle className="text-curry">Delivery Information</CardTitle>
                <CardDescription>Enter your delivery details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your complete address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Card className="border-curry/20 bg-gradient-to-r from-saffron/5 to-curry/5">
              <CardContent className="p-6">
                <Button
                  className="w-full bg-curry hover:bg-curry/90 text-white h-12 text-sm sm:text-lg"
                  disabled={!deliveryAddress || !phoneNumber}
                >
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Proceed to Payment - ₹{total}</span>
                  <span className="sm:hidden">Pay ₹{total}</span>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  By placing an order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>

            {/* Estimated Delivery */}
            <Card className="border-curry/20 bg-mint/5">
              <CardContent className="p-4 text-center">
                <Truck className="w-8 h-8 text-mint mx-auto mb-2" />
                <p className="font-semibold text-mint">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">2-4 hours after order confirmation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
