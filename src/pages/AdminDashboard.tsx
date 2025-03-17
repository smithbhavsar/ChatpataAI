import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import {
  BarChart3,
  Users,
  Utensils,
  Clock,
  TrendingUp,
  Share2,
  DollarSign,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    dailyOrders: 145,
    totalRevenue: 2890.50,
    averageOrderValue: 19.99,
    popularDishes: [
      { name: 'Grilled Salmon Bowl', orders: 42 },
      { name: 'Vegetarian Buddha Bowl', orders: 38 },
      { name: 'Spicy Chicken Ramen', orders: 35 },
    ],
    recentOrders: [
      { id: '1', table: 'T1', items: ['Grilled Salmon Bowl', 'Green Tea'], status: 'completed', total: 21.99 },
      { id: '2', table: 'T3', items: ['Vegetarian Buddha Bowl'], status: 'preparing', total: 14.99 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-900">Restaurant Dashboard</h1>
        <Button>Update Menu</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Utensils className="h-6 w-6" />}
          title="Daily Orders"
          value={stats.dailyOrders}
        />
        <StatCard
          icon={<DollarSign className="h-6 w-6" />}
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Avg. Order Value"
          value={`$${stats.averageOrderValue}`}
        />
        <StatCard
          icon={<Share2 className="h-6 w-6" />}
          title="Shared Orders"
          value="23"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-primary-200">
        <nav className="flex space-x-8">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<BarChart3 className="h-5 w-5" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
            icon={<Clock className="h-5 w-5" />}
            label="Orders"
          />
          <TabButton
            active={activeTab === 'menu'}
            onClick={() => setActiveTab('menu')}
            icon={<Utensils className="h-5 w-5" />}
            label="Menu"
          />
          <TabButton
            active={activeTab === 'customers'}
            onClick={() => setActiveTab('customers')}
            icon={<Users className="h-5 w-5" />}
            label="Customers"
          />
        </nav>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Popular Dishes */}
        <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Dishes</h2>
          <div className="space-y-4">
            {stats.popularDishes.map((dish, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-primary-700">{dish.name}</span>
                <span className="font-semibold">{dish.orders} orders</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Table {order.table}</p>
                  <p className="text-sm text-primary-600">
                    {order.items.join(', ')}
                  </p>
                </div>
                <span className="font-semibold">${order.total}</span>
              </div>
            ))}
          </div>
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

const TabButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
      active
        ? 'border-primary-700 text-primary-900'
        : 'border-transparent text-primary-600 hover:text-primary-900'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default AdminDashboard;