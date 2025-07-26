import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Plus, Minus, User, Package, TrendingUp, Search, Filter, MapPin, Navigation, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  unit: string;
  supplier: string;
  rating: number;
  inStock: boolean;
  image: string;
  manufactureDate?: string;
  expiryDate?: string;
}

interface NearbySupplier {
  id: string;
  name: string;
  distance: string;
  rating: number;
  speciality: string;
  deliveryTime: string;
  location: string;
}

const nearbySuppliers: NearbySupplier[] = [
  {
    id: "1",
    name: "Mumbai Fresh Supplies",
    distance: "2.5 km",
    rating: 4.8,
    speciality: "Fresh Vegetables",
    deliveryTime: "30 mins",
    location: "Dadar West"
  },
  {
    id: "2",
    name: "Spice Masters Co",
    distance: "1.8 km",
    rating: 4.6,
    speciality: "Premium Spices",
    deliveryTime: "45 mins",
    location: "Crawford Market"
  },
  {
    id: "3",
    name: "Punjab Grains Ltd",
    distance: "3.2 km",
    rating: 4.7,
    speciality: "Rice & Grains",
    deliveryTime: "1 hour",
    location: "Andheri East"
  },
  {
    id: "4",
    name: "Eco Pack Solutions",
    distance: "1.5 km",
    rating: 4.4,
    speciality: "Packaging Materials",
    deliveryTime: "25 mins",
    location: "Bandra West"
  }
];

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Fresh Onions",
    category: "Vegetables",
    price: 30,
    currency: "INR",
    unit: "kg",
    supplier: "Mumbai Fresh Supplies",
    rating: 4.5,
    inStock: true,
    image: "/placeholder.svg",
    manufactureDate: "2024-01-15",
    expiryDate: "2024-01-25"
  },
  {
    id: "2",
    name: "Red Chili Powder",
    category: "Spices",
    price: 2.20,
    currency: "USD",
    unit: "kg",
    supplier: "Spice Masters Co",
    rating: 4.8,
    inStock: true,
    image: "/placeholder.svg",
    manufactureDate: "2024-01-10",
    expiryDate: "2025-01-10"
  },
  {
    id: "3",
    name: "Basmati Rice",
    category: "Grains",
    price: 120,
    currency: "INR",
    unit: "kg",
    supplier: "Punjab Grains Ltd",
    rating: 4.6,
    inStock: true,
    image: "/placeholder.svg",
    manufactureDate: "2024-01-12",
    expiryDate: "2024-07-12"
  },
  {
    id: "4",
    name: "Paper Plates (100pcs)",
    category: "Packaging",
    price: 1.02,
    currency: "USD",
    unit: "pack",
    supplier: "Eco Pack Solutions",
    rating: 4.3,
    inStock: true,
    image: "/placeholder.svg",
    manufactureDate: "2024-01-08",
    expiryDate: "2026-01-08"
  }
];

export default function VendorDashboard() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedLocation, setSelectedLocation] = useState("mumbai");
  const [showNearbySuppliers, setShowNearbySuppliers] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState("INR");
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const convertPrice = (price: number, fromCurrency: string, toCurrency: string) => {
    if (fromCurrency === toCurrency) return price;
    // Simple conversion rate (in real app, this would come from an API)
    const rates = { INR: 1, USD: 83 }; // 1 USD = 83 INR
    if (fromCurrency === "USD" && toCurrency === "INR") {
      return price * rates.USD;
    }
    if (fromCurrency === "INR" && toCurrency === "USD") {
      return price / rates.USD;
    }
    return price;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Carousel effect for product showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % mockProducts.length);
    }, 3000); // Change product every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentProduct = mockProducts[currentProductIndex];

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const categories = ["all", ...Array.from(new Set(mockProducts.map(p => p.category.toLowerCase())))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" ||
                             product.category.toLowerCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/5 to-turmeric/5">
      {/* Header */}
      <header className="bg-white border-b border-curry/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl text-curry">Street Vendor Hub</h1>
              <Badge variant="secondary" className="bg-mint/10 text-mint border-mint/20">
                <User className="w-3 h-3 mr-1" />
                Vendor Portal
              </Badge>

              {/* Product Carousel */}
              <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-saffron/10 to-curry/10 px-4 py-2 rounded-lg border border-curry/20">
                <div className="relative w-10 h-10 bg-gradient-to-br from-saffron/20 to-turmeric/20 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-500">
                  <Package className="w-6 h-6 text-curry/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-curry/10 to-transparent" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-curry transition-all duration-500">
                    {currentProduct.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {displayCurrency === "INR" ? "₹" : "$"}
                    {convertPrice(currentProduct.price, currentProduct.currency, displayCurrency).toFixed(displayCurrency === "USD" ? 2 : 0)}
                    /{currentProduct.unit}
                  </div>
                </div>
                <div className="flex space-x-1">
                  {mockProducts.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        index === currentProductIndex ? "bg-curry" : "bg-curry/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/cart">
                <Button variant="outline" className="relative" size="sm">
                  <ShoppingCart className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Cart ({getTotalItems()})</span>
                  <span className="sm:hidden">({getTotalItems()})</span>
                  {getTotalItems() > 0 && (
                    <Badge className="ml-1 sm:ml-2 bg-chili text-white text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="p-2 sm:px-3">
                <User className="w-5 h-5 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-curry/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-curry">24</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card className="border-curry/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-curry">₹12,450</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card className="border-curry/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Suppliers</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-curry">8</div>
              <p className="text-xs text-muted-foreground">Trusted partners</p>
            </CardContent>
          </Card>
        </div>

        {/* Location & Nearby Suppliers */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-curry">Your Location</h2>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai, Maharashtra</SelectItem>
                  <SelectItem value="delhi">Delhi, NCR</SelectItem>
                  <SelectItem value="bangalore">Bangalore, Karnataka</SelectItem>
                  <SelectItem value="pune">Pune, Maharashtra</SelectItem>
                  <SelectItem value="chennai">Chennai, Tamil Nadu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowNearbySuppliers(!showNearbySuppliers)}
              className="border-curry/20 text-curry hover:bg-curry hover:text-white"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {showNearbySuppliers ? 'Hide' : 'Show'} Nearby Suppliers
            </Button>
          </div>

          {showNearbySuppliers && (
            <Card className="border-curry/20 mb-6">
              <CardHeader>
                <CardTitle className="text-curry flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Nearby Suppliers in {selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1)}
                </CardTitle>
                <CardDescription>
                  Suppliers within 5km of your location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearbySuppliers.map((supplier) => (
                    <Card key={supplier.id} className="p-4 hover:shadow-md transition-shadow border-curry/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-curry">{supplier.name}</h3>
                          <p className="text-sm text-muted-foreground">{supplier.location}</p>
                        </div>
                        <Badge variant="secondary" className="bg-mint/10 text-mint border-mint/20">
                          {supplier.distance}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-500">★</span>
                          <span>{supplier.rating}</span>
                        </div>
                        <span className="text-muted-foreground">{supplier.deliveryTime}</span>
                      </div>
                      <p className="text-sm font-medium text-curry mt-2">{supplier.speciality}</p>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-2xl font-bold text-curry mb-4 lg:mb-0">Browse Products</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={displayCurrency} onValueChange={setDisplayCurrency}>
                <SelectTrigger className="w-full sm:w-32">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">₹ INR</SelectItem>
                  <SelectItem value="USD">$ USD</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border-curry/20">
                <div className="aspect-square bg-gradient-to-br from-saffron/10 to-turmeric/10 flex items-center justify-center">
                  <Package className="w-16 h-16 text-curry/40" />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                      <Badge variant="secondary" className="text-xs bg-mint/10 text-mint border-mint/20">
                        {product.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{product.supplier}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-curry">
                            {displayCurrency === "INR" ? "₹" : "$"}
                            {convertPrice(product.price, product.currency, displayCurrency).toFixed(displayCurrency === "USD" ? 2 : 0)}
                          </span>
                          <span className="text-xs text-muted-foreground">/{product.unit}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-yellow-500">★</span>
                          <span className="text-xs">{product.rating}</span>
                        </div>
                      </div>
                      {product.expiryDate && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Exp: {formatDate(product.expiryDate)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      {cart[product.id] > 0 ? (
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeFromCart(product.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium min-w-[20px] text-center">
                            {cart[product.id]}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addToCart(product.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => addToCart(product.id)}
                          className="w-full bg-curry hover:bg-curry/90"
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
