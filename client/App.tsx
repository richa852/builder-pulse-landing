import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VendorDashboard from "./pages/VendorDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import Cart from "./pages/Cart";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/supplier" element={<SupplierDashboard />} />
          <Route path="/products" element={<Placeholder title="Product Catalog" description="Browse all available products from verified suppliers" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Placeholder title="Order Tracking" description="Track your current and past orders" />} />
          <Route path="/admin" element={<Placeholder title="Admin Panel" description="Manage users, orders, and platform settings" />} />
          <Route path="/login" element={<Placeholder title="Login" description="Sign in to your account" />} />
          <Route path="/signup" element={<Placeholder title="Sign Up" description="Create a new account" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
