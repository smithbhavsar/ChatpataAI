import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import { Clock, Share2, Download, Star } from 'lucide-react';

const SAMPLE_ORDERS = [
  {
    id: '1',
    restaurantName: 'Green Earth Kitchen',
    date: '2024-03-10',
    status: 'completed',
    items: ['Grilled Salmon Bowl', 'Green Tea'],
    total: 21.99,
  },
  {
    id: '2',
    restaurantName: 'The Fusion House',
    date: '2024-03-08',
    status: 'completed',
    items: ['Vegetarian Buddha Bowl', 'Sparkling Water'],
    total: 17.99,
  },
];

const OrderHistory = () => {
  const user = useAuthStore((state) => state.user);

  const handleShareOrder = (orderId: string) => {
    // In a real app, this would generate a unique sharing URL
    console.log('Sharing order:', orderId);
  };

  const handleDownloadReceipt = (orderId: string) => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for order:', orderId);
  };

  const handleLeaveReview = (orderId: string) => {
    // In a real app, this would open a review modal
    console.log('Opening review for order:', orderId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-900">Order History</h1>
        <div className="text-primary-700">
          <span className="font-semibold">{user?.loyaltyPoints || 0}</span> Loyalty Points
        </div>
      </div>

      <div className="space-y-6">
        {SAMPLE_ORDERS.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden"
          >
            <div className="p-6 border-b border-primary-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary-900">
                    {order.restaurantName}
                  </h3>
                  <p className="text-primary-600 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {order.date}
                  </p>
                </div>
                <span className="font-bold text-primary-700">
                  ${order.total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <p key={index} className="text-primary-700">{item}</p>
                ))}
              </div>
            </div>

            <div className="p-4 bg-primary-50 flex flex-wrap gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShareOrder(order.id)}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Order
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadReceipt(order.id)}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLeaveReview(order.id)}
                className="flex items-center gap-2"
              >
                <Star className="h-4 w-4" />
                Leave Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;