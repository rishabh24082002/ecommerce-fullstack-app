import {
  useEffect,
  useState
} from 'react';

import toast from 'react-hot-toast';

import {
  getAllOrders,
  updateOrderStatus
} from '../services/adminService';

const OrderManagement = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const data = await getAllOrders();

      setOrders(data.orders);

    } catch (error) {

      console.log(error);
    }
  };

  const handleStatusUpdate = async (
    orderId,
    status
  ) => {

    try {

      await updateOrderStatus(
        orderId,
        status
      );

      toast.success('Order Updated');

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className='container mx-auto py-10'>

      <h1 className='text-4xl font-bold mb-10'>
        Order Management
      </h1>

      <div className='space-y-6'>

        {
          orders.map(order => (
            <div
              key={order._id}
              className='bg-white p-6 rounded shadow'
            >

              <div className='flex justify-between items-center'>

                <div>

                  <h2 className='font-bold'>
                    {order._id}
                  </h2>

                  <p>
                    ₹ {order.totalAmount}
                  </p>

                </div>

                <div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        order._id,
                        e.target.value
                      )
                    }
                    className='border p-2'
                  >

                    <option value='pending'>
                      Pending
                    </option>

                    <option value='shipped'>
                      Shipped
                    </option>

                    <option value='delivered'>
                      Delivered
                    </option>

                  </select>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default OrderManagement;