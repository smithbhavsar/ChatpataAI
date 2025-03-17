import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import {
  Building2,
  Users,
  Activity,
  TrendingUp,
  Settings,
  Search,
  MoreVertical,
  AlertCircle,
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('restaurants');

  const stats = {
    totalRestaurants: 48,
    activeUsers: 1250,
    totalOrders: 4580,
    revenue: 89750.50,
    restaurants: [
      { id: '1', name: 'Green Earth Kitchen', status: 'active', orders: 145, revenue: 2890.50 },
      { id: '2', name: 'The Fusion House', status: 'active', orders: 132, revenue: 2650.75 },
      { id: '3', name: 'Pure Veg Delight', status: 'inactive', orders: 0, revenue: 0 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-900">Platform Overview</h1>
        <Button>Add Restaurant</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Building2 className="h-6 w-6" />}
          title="Total Restaurants"
          value={stats.totalRestaurants}
        />
        <StatCard
          icon={<Users className="h-6 w-6" />}
          title="Active Users"
          value={stats.activeUsers}
        />
        <StatCard
          icon={<Activity className="h-6 w-6" />}
          title="Total Orders"
          value={stats.totalOrders}
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Total Revenue"
          value={`$${stats.revenue.toFixed(2)}`}
        />
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full pl-10 pr-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          />
        </div>
        <Button variant="outline">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Restaurants Table */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Restaurant</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Orders</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Revenue</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {stats.restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary-700" />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-primary-900">{restaurant.name}</div>
                      <div className="text-sm text-primary-600">ID: {restaurant.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    restaurant.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {restaurant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-primary-900">{restaurant.orders}</td>
                <td className="px-6 py-4 text-primary-900">${restaurant.revenue.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          System Alerts
        </h2>
        <div className="space-y-4">
          <Alert
            title="High Order Volume"
            message="The Fusion House is experiencing unusually high order volume"
            type="warning"
          />
          <Alert
            title="New Restaurant Pending"
            message="3 new restaurant applications pending review"
            type="info"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | number }) => (
  <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6">
    <div className="flex items-center gap-4">
      <div className="bg-primary-50 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-primary-600">{title}</p>
        <p className="text-2xl font-bold text-primary-900">{value}</p>
      </div>
    </div>
  </div>
);

const Alert = ({ title, message, type }: { title: string; message: string; type: 'warning' | 'info' }) => (
  <div className={`p-4 rounded-lg ${
    type === 'warning' ? 'bg-orange-50' : 'bg-blue-50'
  }`}>
    <h3 className={`font-medium ${
      type === 'warning' ? 'text-orange-800' : 'text-blue-800'
    }`}>{title}</h3>
    <p className={`text-sm ${
      type === 'warning' ? 'text-orange-600' : 'text-blue-600'
    }`}>{message}</p>
  </div>
);

export default SuperAdminDashboard;