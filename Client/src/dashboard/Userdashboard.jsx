import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api.get('/orders/my').then(res => setOrders(res.data));
  }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <div className="bg-cardbg rounded-2xl p-4">
        <h2 className="text-xl">Recent Orders</h2>
        {orders.map(order => (
          <div key={order._id} className="border-b border-gray-700 py-3 flex justify-between">
            <span>{order.orderId}</span>
            <span>₹{order.amount}</span>
            <span className={order.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}>{order.paymentStatus}</span>
            <Link to={`/invoice/${order._id}`} className="text-primary">Download Invoice</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
