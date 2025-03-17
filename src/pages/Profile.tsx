import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { User, Clock, Heart, Bell } from 'lucide-react';

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const orderHistory = [
    {
      id: 1,
      date: '2024-03-10',
      items: ['Grilled Salmon Bowl', 'Green Tea'],
      total: 21.99,
    },
    {
      id: 2,
      date: '2024-03-08',
      items: ['Vegetarian Buddha Bowl', 'Sparkling Water'],
      total: 17.99,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-50 p-4 rounded-full">
            <User className="h-8 w-8 text-primary-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary-900">{user?.phoneNumber}</h2>
            <p className="text-primary-600">Member since March 2024</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          icon={<Clock className="h-6 w-6 text-sage-700" />}
          title="Order History"
          description="View your past orders"
        />
        <QuickActionCard
          icon={<Heart className="h-6 w-6 text-sage-700" />}
          title="Favorites"
          description="Your favorite meals"
        />
        <QuickActionCard
          icon={<Bell className="h-6 w-6 text-sage-700" />}
          title="Notifications"
          description="Manage preferences"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden">
        <div className="p-6 border-b border-primary-100 bg-primary-50">
          <h3 className="text-xl font-semibold text-primary-900">Recent Orders</h3>
        </div>
        <div className="divide-y divide-primary-100">
          {orderHistory.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-primary-900">{order.items.join(', ')}</p>
                  <p className="text-sm text-primary-600">{order.date}</p>
                </div>
                <p className="font-semibold text-primary-700">${order.total}</p>
              </div>
              <Button variant="outline" size="sm">Reorder</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100 hover:border-primary-200 transition-colors">
    <div className="mb-4">{icon}</div>
    <h3 className="font-semibold mb-1 text-primary-900">{title}</h3>
    <p className="text-sm text-primary-600">{description}</p>
  </div>
);

export default Profile;