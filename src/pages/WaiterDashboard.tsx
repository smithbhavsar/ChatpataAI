import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { 
  Clock, 
  CheckCircle2, 
  XCircle,
  Coffee,
  Timer,
  CheckCheck,
  AlertCircle
} from 'lucide-react';

interface TableOrder {
  id: string;
  tableNumber: string;
  items: string[];
  status: 'pending' | 'preparing' | 'ready' | 'served';
  specialRequests?: string;
  timestamp: string;
}

const SAMPLE_ORDERS: TableOrder[] = [
  {
    id: '1',
    tableNumber: 'T1',
    items: ['Grilled Salmon Bowl', 'Green Tea'],
    status: 'pending',
    timestamp: '2024-03-15 14:30',
  },
  {
    id: '2',
    tableNumber: 'T3',
    items: ['Vegetarian Buddha Bowl', 'Fresh Juice'],
    status: 'preparing',
    specialRequests: 'Extra spicy',
    timestamp: '2024-03-15 14:25',
  },
  {
    id: '3',
    tableNumber: 'T5',
    items: ['Spicy Ramen', 'Miso Soup'],
    status: 'ready',
    timestamp: '2024-03-15 14:20',
  },
];

const WaiterDashboard = () => {
  const [orders, setOrders] = useState<TableOrder[]>(SAMPLE_ORDERS);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'preparing':
        return <Timer className="h-5 w-5 text-blue-500" />;
      case 'ready':
        return <Coffee className="h-5 w-5 text-green-500" />;
      case 'served':
        return <CheckCheck className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: TableOrder['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-900">Waiter Dashboard</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-500" />
            <span>Preparing</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-green-500" />
            <span>Ready</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-primary-100 overflow-hidden"
          >
            <div className="p-4 border-b border-primary-100 bg-primary-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary-900">
                  Table {order.tableNumber}
                </span>
                {getStatusIcon(order.status)}
              </div>
              <span className="text-sm text-primary-600">
                <Clock className="h-4 w-4 inline mr-1" />
                {order.timestamp.split(' ')[1]}
              </span>
            </div>

            <div className="p-4">
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <p key={index} className="text-primary-700">{item}</p>
                ))}
                {order.specialRequests && (
                  <p className="text-orange-600 text-sm mt-2">
                    Note: {order.specialRequests}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(order.id, 'preparing')}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleUpdateStatus(order.id, 'served')}
                      className="flex items-center gap-1"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
                {order.status === 'ready' && (
                  <Button
                    size="sm"
                    onClick={() => handleUpdateStatus(order.id, 'served')}
                    className="w-full"
                  >
                    Mark as Served
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaiterDashboard;