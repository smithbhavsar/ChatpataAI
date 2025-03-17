import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { Search, MessageCircle, ThumbsUp, X } from 'lucide-react';
import { fetchAllRestaurants, fetchMenuByRestaurant } from '../api/index';
import { Switch } from '@headlessui/react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  calories: number;
  recommended?: boolean;
  is_vegetarian: boolean;
}

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [vegOnly, setVegOnly] = useState(false); // Veg-Only Toggle

  // Fetch restaurant details with caching
  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchAllRestaurants,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Find the current restaurant name
  const restaurant = restaurants?.find((r: any) => r.id.toString() === restaurantId);
  const restaurantName = restaurant ? restaurant.name : 'Loading...';

  // Fetch menu items with caching
  const { data: menuItems = [], isLoading, isError } = useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: () => fetchMenuByRestaurant(restaurantId!),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!restaurantId, // Only fetch when restaurantId is available
  });

  // Apply search and veg filter
  const filteredItems = menuItems
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(item => !vegOnly || item.is_vegetarian); // Apply Veg-Only Filter

  if (isLoading) return <p className="text-center text-primary-700">Loading menu...</p>;
  if (isError) return <p className="text-center text-red-600">Error fetching menu</p>;

  return (
    <div className="relative">
      {/* 📌 Header with Veg Toggle */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-900">{restaurantName} Menu</h1>
        <div className="flex items-center gap-3">
          <span className="text-primary-900 font-medium">Veg Only</span>
          <Switch
            checked={vegOnly}
            onChange={setVegOnly}
            className={`${vegOnly ? 'bg-green-600' : 'bg-gray-300'}
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${vegOnly ? 'translate-x-6' : 'translate-x-1'}
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>

      {/* 📌 Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search meals, ingredients, or dietary preferences..."
          className="w-full pl-10 pr-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 📌 Menu Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden hover:border-primary-200 transition-colors">
            {/* 📌 Image Section */}
            <div className="relative">
              <img
                src={item.image || '/placeholder-food.jpg'} // Fallback image
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.recommended && (
                <div className="absolute top-2 right-2 bg-primary-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Recommended</span>
                </div>
              )}
            </div>

            {/* 📌 Content Section */}
            <div className="p-4">
              {/* Name & Price */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-primary-900">{item.name}</h3>
                <span className="text-lg font-bold text-primary-700">₹{item.price}</span>
              </div>

              {/* Description */}
              <p className="text-primary-600 text-sm mb-3">{item.description}</p>

              {/* Tags (Category, Calories, Veg/Non-Veg) */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {item.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {item.calories} cal
                  </span>
                  {item.is_vegetarian ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Veg
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      Non-Veg
                    </span>
                  )}
                </div>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📌 Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-primary-700 text-white p-4 rounded-full shadow-lg hover:bg-primary-800 transition-colors focus:outline-none"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* 📌 AI Chat Popup */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-lg border border-primary-200 overflow-hidden">
          <div className="p-4 border-b border-primary-100 flex justify-between items-center bg-primary-50">
            <h3 className="font-semibold text-primary-900">AI Assistant</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-primary-500 hover:text-primary-700 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="h-96 p-4 bg-white">
            <div className="bg-primary-50 rounded-lg p-3 mb-3">
              <p className="text-primary-800">
                Welcome! Based on your past orders, I recommend trying the Grilled Salmon Bowl.
                You seem to enjoy healthy, protein-rich meals with fresh ingredients.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
