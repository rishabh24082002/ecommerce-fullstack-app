import {
  useEffect,
  useState
} from 'react';

import {
  getAllOrders,
  getAllUsers
} from '../services/adminService';

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {

      const usersData = await getAllUsers();

      const ordersData = await getAllOrders();

      setUsers(usersData.users);

      setOrders(ordersData.orders);

    } catch (error) {

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const revenue = orders.reduce(
    (acc, order) =>
      acc + order.totalAmount,
    0
  );

  const totalOrdersValue = orders.length;

  const avgOrderValue = totalOrdersValue > 0 ? (revenue / totalOrdersValue).toFixed(2) : 0;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>

        <div className='mb-12'>
          <h1 className='text-5xl font-extrabold text-slate-900 mb-2'>
            Admin Dashboard
          </h1>
          <p className='text-slate-600'>
            Welcome back! Here's your business overview
          </p>
        </div>

        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600'></div>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>

              <div className='bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:scale-105'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-blue-100 text-sm font-semibold uppercase tracking-wide'>
                      Total Users
                    </p>
                    <p className='text-5xl font-extrabold mt-4'>
                      {users.length}
                    </p>
                  </div>
                  <div className='text-5xl opacity-20'>
                    👥
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:scale-105'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-purple-100 text-sm font-semibold uppercase tracking-wide'>
                      Total Orders
                    </p>
                    <p className='text-5xl font-extrabold mt-4'>
                      {orders.length}
                    </p>
                  </div>
                  <div className='text-5xl opacity-20'>
                    📦
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:scale-105'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-green-100 text-sm font-semibold uppercase tracking-wide'>
                      Total Revenue
                    </p>
                    <p className='text-5xl font-extrabold mt-4'>
                      ₹ {revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className='text-5xl opacity-20'>
                    💰
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:scale-105'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-orange-100 text-sm font-semibold uppercase tracking-wide'>
                      Avg Order Value
                    </p>
                    <p className='text-5xl font-extrabold mt-4'>
                      ₹ {avgOrderValue.toLocaleString()}
                    </p>
                  </div>
                  <div className='text-5xl opacity-20'>
                    📊
                  </div>
                </div>
              </div>

            </div>

            <div className='bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200'>

              <div className='bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6'>
                <h2 className='text-2xl font-bold'>
                  Recent Orders
                </h2>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>

                  <thead className='bg-slate-100 border-b border-slate-200'>
                    <tr>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900'>
                        Order ID
                      </th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900'>
                        Items
                      </th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900'>
                        Amount
                      </th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900'>
                        Status
                      </th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-slate-900'>
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      orders.slice(0, 5).map(order => (
                        <tr
                          key={order._id}
                          className='border-b border-slate-200 hover:bg-slate-50 transition'
                        >

                          <td className='px-6 py-4 text-sm font-semibold text-slate-900'>
                            {order._id.slice(-8).toUpperCase()}
                          </td>

                          <td className='px-6 py-4 text-sm text-slate-600'>
                            {order.products?.length || 0} items
                          </td>

                          <td className='px-6 py-4 text-sm font-bold text-blue-600'>
                            ₹ {order.totalAmount.toLocaleString()}
                          </td>

                          <td className='px-6 py-4 text-sm'>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status?.toLowerCase() === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status?.toLowerCase() === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status?.toLowerCase() === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>

                          <td className='px-6 py-4 text-sm text-slate-600'>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>

                        </tr>
                      ))
                    }
                  </tbody>

                </table>
              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;