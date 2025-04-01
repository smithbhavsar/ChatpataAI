import React, { useState } from 'react';
import { fetchAllRestaurants } from '../api/index';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Search, Leaf } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo: string;
  cuisine: string;
  is_vegetarian: boolean;
  rating: number;
  price_range: string;
}

const Restaurants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showVegOnly, setShowVegOnly] = useState(false);
  
  const { data: restaurants = [], isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchAllRestaurants,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes
    retry: 1, // Retry failed requests up to 2 times
  });

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

    return showVegOnly ? matchesSearch && restaurant.is_vegetarian : matchesSearch;
  });

  if (isLoading) return <p className="text-center text-primary-700">Loading restaurants...</p>;
  if (error) return <p className="text-center text-red-600">Error: {(error as Error).message}</p>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-900">Restaurants</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full pl-10 pr-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant={showVegOnly ? 'default' : 'outline'}
            className="flex items-center gap-2"
            onClick={() => setShowVegOnly(!showVegOnly)}
          >
            <Leaf className="h-5 w-5" />
            Veg Only
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden hover:border-primary-200 transition-colors">
              <div className="relative">
                <img
                  src={restaurant.logo || 'https://source.unsplash.com/400x300/?restaurant,food'}
                  alt={restaurant.logo}
                  className="w-full h-48 object-cover"
                />
                {restaurant.is_vegetarian && (
                  <div className="absolute top-2 right-2 bg-sage-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Leaf className="h-4 w-4" />
                    <span>Pure Veg</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-primary-900">{restaurant.name}</h3>
                  <span className="text-primary-700">{restaurant.price_range}</span>
                </div>
                <p className="text-primary-600 text-sm mb-3">{restaurant.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                    {restaurant.cuisine}
                  </span>
                  <div className="flex items-center text-primary-700">
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span className="ml-1">★</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
