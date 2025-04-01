"use client"

import { useState } from "react"
import { Search, ShoppingCart, User, Menu, Star, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data
const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Toys", "Beauty", "Automotive"]

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 1247,
    seller: "TechGear Pro",
    trustScore: 92,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 856,
    seller: "Fashion Forward",
    trustScore: 85,
    category: "Clothing",
  },
  {
    id: 3,
    name: "Smart Home Security Camera",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 2103,
    seller: "SecureHome Tech",
    trustScore: 96,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Organic Coffee Beans 2lb",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 743,
    seller: "Mountain Roasters",
    trustScore: 89,
    category: "Food",
  },
  {
    id: 5,
    name: "Yoga Mat Premium Quality",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 512,
    seller: "FitLife Essentials",
    trustScore: 83,
    category: "Sports",
  },
  {
    id: 6,
    name: "LED Desk Lamp with USB Charging",
    price: 34.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 328,
    seller: "Office Solutions",
    trustScore: 78,
    category: "Home & Garden",
  },
]

function TrustBadge({ score }: { score: number }) {
  const getScoreData = (score: number) => {
    if (score >= 90)
      return {
        color: "bg-emerald-50 border-emerald-200 text-emerald-800",
        icon: "🛡️",
        label: "Excellent",
        barColor: "bg-emerald-500",
      }
    if (score >= 80)
      return {
        color: "bg-blue-50 border-blue-200 text-blue-800",
        icon: "✅",
        label: "Very Good",
        barColor: "bg-blue-500",
      }
    if (score >= 70)
      return {
        color: "bg-amber-50 border-amber-200 text-amber-800",
        icon: "⚠️",
        label: "Good",
        barColor: "bg-amber-500",
      }
    return {
      color: "bg-red-50 border-red-200 text-red-800",
      icon: "❌",
      label: "Poor",
      barColor: "bg-red-500",
    }
  }

  const scoreData = getScoreData(score)

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${scoreData.color}`}>
      <span className="text-sm">{scoreData.icon}</span>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Trust Score</span>
          <span className="text-sm font-bold">{score}%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${scoreData.barColor} transition-all duration-300`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-xs opacity-75">{scoreData.label}</span>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          {product.originalPrice && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </Badge>
          )}
        </div>

        <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        <div className="text-xs text-gray-600 mb-3">
          by <span className="text-blue-600 hover:underline">{product.seller}</span>
        </div>

        <div className="mb-3">
          <TrustBadge score={product.trustScore} />
        </div>

        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Add to Cart</Button>
      </CardContent>
    </Card>
  )
}

export default function BuyerHomepage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [trustScore, setTrustScore] = useState([70])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="text-xl font-bold">Amazonian</div>
            </div>

            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Input placeholder="Search products..." className="w-full pl-4 pr-12 py-2 rounded-md" />
                <Button size="sm" className="absolute right-1 top-1 bg-yellow-400 hover:bg-yellow-500 text-black">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white">
                <ShoppingCart className="w-5 h-5" />
                <span className="ml-1 hidden sm:inline">Cart (2)</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-white">
                <User className="w-5 h-5" />
                <span className="ml-1 hidden sm:inline">Account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside
            className={`w-64 bg-white rounded-lg p-6 h-fit sticky top-24 ${sidebarOpen ? "block" : "hidden md:block"}`}
          >
            <h3 className="font-semibold mb-4">Filters</h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <label htmlFor={category} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="mb-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Trust Score */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Minimum Trust Score</h4>
              <Slider value={trustScore} onValueChange={setTrustScore} max={100} step={5} className="mb-2" />
              <div className="text-sm text-gray-600">{trustScore[0]}% and above</div>
            </div>

            {/* Seller Rating */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Seller Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                      <div className="flex">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="ml-1">& up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Featured Products</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">1-24 of 1,000+ results</span>
                <select className="border rounded-md px-3 py-1 text-sm">
                  <option>Best Match</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Rating</option>
                  <option>Trust Score</option>
                </select>
              </div>
            </div>

            {/* Trust Score Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">AI Trust Scoring</span>
              </div>
              <p className="text-sm text-blue-800">
                Our AI analyzes seller history, product authenticity, and review quality to provide trust scores. Higher
                scores indicate more reliable sellers and authentic products.
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load More Products
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
