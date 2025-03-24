import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../store/supabaseClient';
import { Button } from '../components/ui/button';
import { User, Clock, Heart, Bell } from 'lucide-react';

interface Order {
  id: number;
  date: string;
  items: string[];
  total: number;
}

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchOrderHistory = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('id, date, items, total')
          .eq('customer_phone', user.phone_number)  // Filter by logged-in user's phone number
          .order('date', { ascending: false });  // Sort by latest orders first

        if (error) {
          console.error('Error fetching orders:', error.message);
          return;
        }

        // Convert raw data into correct format
        const formattedOrders = data.map((order: any) => ({
          id: order.id,
          date: order.date,
          items: order.items.split(','), // Assuming items are stored as a comma-separated string
          total: order.total,
        }));

        setOrderHistory(formattedOrders);
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-50 p-4 rounded-full">
            <User className="h-8 w-8 text-primary-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary-900">{user?.phone_number}</h2>
            <p className="text-primary-600">Member since March 2024</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard icon={<Clock className="h-6 w-6 text-sage-700" />} title="Order History" description="View your past orders" />
        <QuickActionCard icon={<Heart className="h-6 w-6 text-sage-700" />} title="Favorites" description="Your favorite meals" />
        <QuickActionCard icon={<Bell className="h-6 w-6 text-sage-700" />} title="Notifications" description="Manage preferences" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden">
        <div className="p-6 border-b border-primary-100 bg-primary-50">
          <h3 className="text-xl font-semibold text-primary-900">Recent Orders</h3>
        </div>
        <div className="divide-y divide-primary-100">
          {loading ? (
            <p className="p-6 text-center text-primary-600">Loading order history...</p>
          ) : orderHistory.length > 0 ? (
            orderHistory.map((order) => (
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
            ))
          ) : (
            <p className="p-6 text-center text-primary-600">No orders found.</p>
          )}
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
