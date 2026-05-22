import {
  useEffect,
  useState
} from 'react';

import { getOrders } from '../services/orderService';

const OrdersPage = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {

      const data = await getOrders();

      setOrders(data.orders);

    } catch (error) {

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>

        <div className='mb-12'>
          <h1 className='text-5xl font-extrabold text-slate-900 mb-2'>
            My Orders
          </h1>
          <p className='text-slate-600'>
            Track and manage all your orders
          </p>
        </div>

        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600'></div>
          </div>
        ) : orders.length === 0 ? (
          <div className='text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200'>
            <p className='text-xl text-slate-600'>No orders yet</p>
            <p className='text-slate-500 mt-2'>Start shopping to place your first order</p>
          </div>
        ) : (
          <div className='space-y-6'>

            {
              orders.map(order => (
                <div
                  key={order._id}
                  className='bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-slate-200 overflow-hidden'
                >

                  <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-slate-200'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>

                      <div>
                        <p className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>
                          Order ID
                        </p>
                        <p className='text-lg font-bold text-slate-900 mt-1'>
                          {order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>

                      <div>
                        <p className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>
                          Status
                        </p>
                        <p className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </p>
                      </div>

                      <div>
                        <p className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>
                          Total Amount
                        </p>
                        <p className='text-lg font-bold text-blue-600 mt-1'>
                          ₹ {order.totalAmount.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>
                          Date
                        </p>
                        <p className='text-lg font-bold text-slate-900 mt-1'>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className='p-6'>
                    <p className='text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4'>
                      Order Items
                    </p>

                    <div className='space-y-4'>
                      {
                        order.products.map((product, idx) => (
                          <div
                            key={idx}
                            className='flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-200'
                          >
                            <div className='flex-1'>
                              <p className='font-semibold text-slate-900'>
                                {product.name}
                              </p>
                              <p className='text-sm text-slate-600 mt-1'>
                                Quantity: <span className='font-semibold'>{product.quantity}</span>
                              </p>
                            </div>

                            <div className='text-right'>
                              <p className='font-bold text-blue-600'>
                                ₹ {(product.price * product.quantity).toLocaleString()}
                              </p>
                              <p className='text-sm text-slate-500'>
                                ₹ {product.price.toLocaleString()} each
                              </p>
                            </div>

                          </div>
                        ))
                      }
                    </div>

                  </div>

                </div>
              ))
            }

          </div>
        )}

      </div>

    </div>
  );
};

export default OrdersPage;