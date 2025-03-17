import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Search, MessageCircle } from 'lucide-react';

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Grilled Salmon Bowl',
    description: 'Fresh salmon, quinoa, avocado, and seasonal vegetables',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    category: 'Healthy',
    calories: 520,
  },
  {
    id: 2,
    name: 'Vegetarian Buddha Bowl',
    description: 'Roasted vegetables, chickpeas, brown rice, and tahini dressing',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    category: 'Vegetarian',
    calories: 450,
  },
  {
    id: 3,
    name: 'Spicy Chicken Ramen',
    description: 'Rich broth, tender chicken, soft-boiled egg, and fresh noodles',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800',
    category: 'Asian',
    calories: 680,
  },
];

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);

  const filteredItems = MENU_ITEMS.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search meals, ingredients, or dietary preferences..."
            className="w-full pl-10 pr-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden hover:border-primary-200 transition-colors">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-primary-900">{item.name}</h3>
                <span className="text-lg font-bold text-primary-700">${item.price}</span>
              </div>
              <p className="text-primary-600 text-sm mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-sage-50 text-sage-700 rounded-full text-xs">
                    {item.category}
                  </span>
                  <span className="px-2 py-1 bg-sage-50 text-sage-700 rounded-full text-xs">
                    {item.calories} cal
                  </span>
                </div>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-primary-700 text-white p-4 rounded-full shadow-lg hover:bg-primary-800 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* AI Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-lg border border-primary-200 overflow-hidden">
          <div className="p-4 border-b border-primary-100 flex justify-between items-center bg-primary-50">
            <h3 className="font-semibold text-primary-900">AI Assistant</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-primary-500 hover:text-primary-700"
            >
              ×
            </button>
          </div>
          <div className="h-96 p-4 bg-white">
            <div className="bg-primary-50 rounded-lg p-3 mb-3">
              <p className="text-primary-800">Hello! I can help you find the perfect meal. What are you in the mood for today?</p>
            </div>
            {/* Add chat messages here */}
          </div>
          <div className="p-4 border-t border-primary-100 bg-white">
            <input
              type="text"
              placeholder="Ask about menu items..."
              className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;