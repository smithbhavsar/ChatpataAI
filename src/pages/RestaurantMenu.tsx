import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { Search, MessageCircle, ThumbsUp, X, Plus, Minus } from 'lucide-react';
import { fetchAllRestaurants, fetchMenuByRestaurant } from '../api/index';
import { Switch } from '@headlessui/react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchAllRestaurants,
    staleTime: 1000 * 60 * 5,
  });

  const restaurant = restaurants?.find(r => r.id.toString() === restaurantId);
  const restaurantName = restaurant ? restaurant.name : 'Loading...';

  const { data: menuItems = [], isLoading, isError } = useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: () => fetchMenuByRestaurant(restaurantId!),
    staleTime: 1000 * 60 * 5,
    enabled: !!restaurantId,
  });

  const { addToCart, updateQuantity, clearCart, cart } = useCartStore();

  useEffect(() => {
    if (currentRestaurant && currentRestaurant !== restaurantName) {
      if (window.confirm('Switching restaurants will clear your cart. Do you want to proceed?')) {
        clearCart(); 
      } else {
        return; 
      }
    }
    setCurrentRestaurant(restaurantName);
  }, [restaurantName, currentRestaurant, clearCart]);

  const filteredItems = menuItems
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(item => !vegOnly || item.is_vegetarian);

  if (isLoading) return <p className="text-center text-primary-700">Loading menu...</p>;
  if (isError) return <p className="text-center text-red-600">Error fetching menu</p>;

  return (
    <div className="relative">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-900">{restaurantName} Menu</h1>
        <div className="flex items-center gap-3">
          <span className="text-primary-900 font-medium">Veg Only</span>
          <Switch
            checked={vegOnly}
            onChange={setVegOnly}
            className={`${vegOnly ? 'bg-green-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${vegOnly ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const cartItem = cart.find(cartItem => cartItem.id === item.id);
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden hover:border-primary-200 transition-colors">
              <img src={item.image || '/placeholder-food.jpg'} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary-900">{item.name}</h3>
                <p className="text-primary-600 text-sm mb-2">{item.description}</p>
                <span className="text-lg font-bold text-primary-700">₹{item.price}</span>
                <div className="mt-4">
                  {cartItem ? (
                    <div className="flex items-center gap-3">
                      <Button 
                        size="sm" 
                        onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                        // Remove disabled prop since we want it to go to 0
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-bold">{cartItem.quantity}</span>
                      <Button 
                        size="sm" 
                        onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        addToCart({ 
                          id: item.id, 
                          name: item.name, 
                          price: item.price, 
                          image: item.image, 
                          quantity: 1 
                        });
                        toast.success(`${item.name} added to cart!`);
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-primary-700 text-white px-6 py-3 rounded-full shadow-lg cursor-pointer hover:bg-primary-800 transition" onClick={() => setShowCartModal(true)}>
          View Order ({cart.length} items) - ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </div>
      )}

      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors" 
              onClick={() => setShowCartModal(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-primary-900">Your Order</h2>
            
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-semibold text-primary-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">₹{item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="xs" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-primary-200 hover:bg-primary-300 text-primary-800"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-bold text-primary-900">{item.quantity}</span>
                  <Button 
                    size="xs" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-primary-200 hover:bg-primary-300 text-primary-800"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-primary-900">
                  Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                </h3>
              </div>
              <div className="flex justify-between gap-3">
                <Button 
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                  onClick={() => {
                    // Add your place order logic here
                    console.log("Order placed!");
                    setShowCartModal(false);
                  }}
                >
                  Place Order
                </Button>
              </div>
              <div className="text-center mt-3">
                <button 
                  className="text-sm text-primary-600 hover:text-primary-800 underline transition-colors"
                  onClick={() => {
                    clearCart();
                    setShowCartModal(false);
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showChat && (
        <div className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-lg border border-primary-200 overflow-hidden">
          <div className="p-4 border-b border-primary-100 flex justify-between items-center bg-primary-50">
            <h3 className="font-semibold text-primary-900">AI Assistant</h3>
            <button onClick={() => setShowChat(false)} className="text-primary-500 hover:text-primary-700 focus:outline-none">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="h-96 p-4 bg-white">
            <p className="text-primary-800">Welcome! Based on your past orders, I recommend trying the Grilled Salmon Bowl.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
