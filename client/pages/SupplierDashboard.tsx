import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, Plus, DollarSign, Users, TrendingUp, CheckCircle } from "lucide-react";

export default function SupplierDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [manufactureDate, setManufactureDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to database
    console.log('Adding product:', {
      name: productName,
      category: productCategory,
      price: productPrice,
      unit: productUnit,
      description: productDescription
    });

    // Reset form
    setProductName("");
    setProductCategory("");
    setProductPrice("");
    setProductUnit("");
    setProductDescription("");
    setCurrency("INR");
    setManufactureDate("");
    setExpiryDate("");
    setIsDialogOpen(false);

    // Show success (you could add a toast here)
    alert('Product added successfully!');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/5 to-curry/5">
      {/* Header */}
      <header className="bg-white border-b border-curry/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-curry">Street Vendor Hub</h1>
              <Badge variant="secondary" className="bg-mint/10 text-mint border-mint/20">
                <Package className="w-3 h-3 mr-1" />
                Supplier Portal
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-curry">Add New Product</DialogTitle>
                    <DialogDescription>
                      Add a new product to your inventory for street food vendors to purchase.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="e.g., Fresh Tomatoes"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={productCategory} onValueChange={setProductCategory} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="spices">Spices</SelectItem>
                            <SelectItem value="grains">Grains & Rice</SelectItem>
                            <SelectItem value="packaging">Packaging</SelectItem>
                            <SelectItem value="dairy">Dairy Products</SelectItem>
                            <SelectItem value="oils">Oils & Fats</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="INR">₹ INR</SelectItem>
                              <SelectItem value="USD">$ USD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price ({currency === "INR" ? "₹" : "$"})</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder={currency === "INR" ? "e.g., 50" : "e.g., 0.60"}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="unit">Unit</Label>
                          <Select value={productUnit} onValueChange={setProductUnit} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">per kg</SelectItem>
                              <SelectItem value="pack">per pack</SelectItem>
                              <SelectItem value="piece">per piece</SelectItem>
                              <SelectItem value="liter">per liter</SelectItem>
                              <SelectItem value="gram">per gram</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="manufactureDate">Manufacture Date</Label>
                          <Input
                            id="manufactureDate"
                            type="date"
                            value={manufactureDate}
                            onChange={(e) => setManufactureDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Input
                          id="description"
                          value={productDescription}
                          onChange={(e) => setProductDescription(e.target.value)}
                          placeholder="Brief description of your product"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-curry hover:bg-curry/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-curry/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-curry">₹45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="border-curry/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-curry">23</div>
              <p className="text-xs text-muted-foreground">+4 new orders today</p>
            </CardContent>
          </Card>
          <Card className="border-curry/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-curry">127</div>
              <p className="text-xs text-muted-foreground">+12 this week</p>
            </CardContent>
          </Card>
          <Card className="border-curry/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-curry">156</div>
              <p className="text-xs text-muted-foreground">Across 8 categories</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-16">
          <Package className="w-24 h-24 text-curry/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-curry mb-2">Supplier Dashboard</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Manage your product listings, track orders, and connect with street vendors across India.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-curry hover:bg-curry/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
