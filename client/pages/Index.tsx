import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Users, Package, Star, ArrowRight, CheckCircle, TruckIcon, Sparkles, Zap, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Package,
    title: "Verified Suppliers",
    description: "Connect with trusted suppliers offering quality ingredients at wholesale prices"
  },
  {
    icon: ShoppingCart,
    title: "Easy Ordering",
    description: "Browse, compare prices, and order everything you need in one place"
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    description: "Get your supplies delivered quickly to keep your business running"
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "All products are quality-checked and rated by fellow vendors"
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    business: "Mumbai Vada Pav Stall",
    review: "This app has transformed my business! I now get the best prices for spices and vegetables.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    business: "Delhi Chaat Corner",
    review: "Reliable suppliers and fast delivery. My customers love the improved quality!",
    rating: 5
  }
];

export default function Index() {
  const [currentStat, setCurrentStat] = useState(0);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    // Animate stats counter
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 3);
    }, 3000);

    // Generate floating elements
    const elements = Array.from({length: 12}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setFloatingElements(elements);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/5 via-turmeric/3 to-curry/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-saffron/20 to-curry/20 rounded-full animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-saffron/10 to-curry/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-r from-mint/10 to-turmeric/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-curry/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-saffron to-curry rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-curry bg-gradient-to-r from-curry to-chili bg-clip-text text-transparent">Street Vendor Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/vendor">
                <Button variant="outline" className="border-curry/20 text-curry hover:bg-curry hover:text-white transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                  Vendor Login
                </Button>
              </Link>
              <Link to="/supplier">
                <Button className="bg-gradient-to-r from-curry to-chili hover:from-chili hover:to-curry transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                  Supplier Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-mint/10 text-mint border-mint/20 hover:bg-mint/20 animate-bounce shadow-lg">
            🇮🇳 Made for Indian Street Food Vendors
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-curry mb-6 leading-tight">
            <span className="inline-block animate-pulse">Premium Raw Materials for</span>
            <br className="hidden sm:block" />
            <span className="text-transparent bg-gradient-to-r from-saffron via-chili to-curry bg-clip-text animate-gradient-x inline-block transform hover:scale-105 transition-transform duration-300">
              Street Food Excellence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with verified suppliers across India to source quality vegetables, spices,
            and packaging materials at wholesale prices. Built specifically for street food vendors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/vendor">
              <Button size="lg" className="bg-gradient-to-r from-curry via-chili to-saffron hover:from-saffron hover:to-curry text-white px-8 transform hover:scale-110 hover:rotate-1 transition-all duration-300 shadow-xl hover:shadow-2xl group">
                <Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Start as Vendor
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/supplier">
              <Button size="lg" variant="outline" className="border-curry/20 text-curry hover:bg-gradient-to-r hover:from-curry hover:to-chili hover:text-white px-8 transform hover:scale-110 hover:-rotate-1 transition-all duration-300 shadow-xl hover:shadow-2xl group">
                <Package className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Join as Supplier
              </Button>
            </Link>
          </div>

          {/* Interactive Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className={`text-center transform transition-all duration-500 hover:scale-110 ${currentStat === 0 ? 'scale-110 opacity-100' : 'opacity-80'}`}>
              <div className="text-3xl font-bold bg-gradient-to-r from-curry to-chili bg-clip-text text-transparent flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-saffron animate-pulse" />
                500+
              </div>
              <div className="text-muted-foreground font-medium">Active Vendors</div>
            </div>
            <div className={`text-center transform transition-all duration-500 hover:scale-110 ${currentStat === 1 ? 'scale-110 opacity-100' : 'opacity-80'}`}>
              <div className="text-3xl font-bold bg-gradient-to-r from-mint to-curry bg-clip-text text-transparent flex items-center justify-center gap-2">
                <Award className="w-8 h-8 text-mint animate-pulse" />
                150+
              </div>
              <div className="text-muted-foreground font-medium">Verified Suppliers</div>
            </div>
            <div className={`text-center transform transition-all duration-500 hover:scale-110 ${currentStat === 2 ? 'scale-110 opacity-100' : 'opacity-80'}`}>
              <div className="text-3xl font-bold bg-gradient-to-r from-chili to-saffron bg-clip-text text-transparent flex items-center justify-center gap-2">
                <Zap className="w-8 h-8 text-chili animate-pulse" />
                10,000+
              </div>
              <div className="text-muted-foreground font-medium">Orders Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-white/50 via-mint/5 to-white/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-curry to-chili bg-clip-text text-transparent mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From fresh vegetables to premium spices, get everything for your street food business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center border-curry/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 group bg-gradient-to-br from-white to-saffron/5">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-saffron/30 to-curry/30 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-8 h-8 text-curry group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-curry group-hover:text-chili transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="group-hover:text-curry/80 transition-colors">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-curry to-chili bg-clip-text text-transparent mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-muted-foreground">
              Browse our most popular product categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Vegetables", items: "200+ items", color: "from-mint/20 to-mint/10" },
              { name: "Spices", items: "150+ items", color: "from-chili/20 to-chili/10" },
              { name: "Grains & Rice", items: "80+ items", color: "from-turmeric/20 to-turmeric/10" },
              { name: "Packaging", items: "120+ items", color: "from-curry/20 to-curry/10" }
            ].map((category, index) => (
              <Card key={index} className="text-center border-curry/20 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-110 hover:rotate-2 group bg-gradient-to-br from-white to-turmeric/5">
                <CardContent className="p-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                    <Package className="w-10 h-10 text-curry group-hover:scale-125 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-curry mb-1 group-hover:text-chili transition-colors">{category.name}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-curry/70 transition-colors">{category.items}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-white/50 via-curry/5 to-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-curry to-chili bg-clip-text text-transparent mb-4">
              Trusted by Street Food Vendors
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our vendors say about their experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-curry/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group bg-gradient-to-br from-white to-mint/5">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic group-hover:text-curry/80 transition-colors">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-saffron/20 to-curry/20 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-curry group-hover:fill-current transition-all" />
                    </div>
                    <div>
                      <div className="font-semibold text-curry group-hover:text-chili transition-colors">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-saffron/20 via-curry/15 to-chili/20 border-curry/30 shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-saffron/10 to-curry/10 animate-pulse" />
            <CardContent className="p-12 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-curry to-chili bg-clip-text text-transparent mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of street food vendors who are already saving money and time
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/vendor">
                  <Button size="lg" className="bg-gradient-to-r from-curry via-chili to-saffron hover:from-saffron hover:to-curry text-white px-8 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl group">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                    Get Started Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-curry/30 text-curry hover:bg-gradient-to-r hover:from-curry hover:to-chili hover:text-white px-8 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-curry text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Street Vendor Hub</h3>
              </div>
              <p className="text-white/80">
                Empowering street food vendors across India with quality supplies and fair prices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Vendors</h4>
              <ul className="space-y-2 text-white/80">
                <li>Browse Products</li>
                <li>Track Orders</li>
                <li>Manage Account</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Suppliers</h4>
              <ul className="space-y-2 text-white/80">
                <li>List Products</li>
                <li>Manage Inventory</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms & Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
            <p>&copy; 2024 Street Vendor Hub. Made with ❤️ for Indian Street Food Vendors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
