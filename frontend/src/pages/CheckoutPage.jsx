import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { createOrder } from '../services/orderService';

import useCart from '../hooks/useCart';

const CheckoutPage = () => {

  const navigate = useNavigate();

  const { fetchCart, cart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const total = cart?.items?.reduce(
    (acc, item) =>
      acc +
      item.productId?.price *
      item.quantity,
    0
  );

  const subtotal = total || 0;
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = (subtotal * 0.1).toFixed(2);
  const grandTotal = (subtotal + shipping + parseFloat(tax)).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors');
      return;
    }

    try {
      await createOrder(formData);
      await fetchCart();
      toast.success('Order Placed Successfully');
      navigate('/orders');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to place order'
      );
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4'>

      <div className='max-w-6xl mx-auto mb-12'>
        <h1 className='text-5xl font-extrabold text-slate-900 mb-2'>
          Checkout
        </h1>
        <p className='text-slate-600'>
          Complete your purchase
        </p>
      </div>

      <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-8'>

        <form
          onSubmit={handleSubmit}
          className='bg-white p-8 rounded-2xl shadow-lg border border-slate-200'
        >

          <h2 className='text-3xl font-bold mb-8 text-slate-900'>
            Shipping Details
          </h2>

          <div className='space-y-6'>

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Full Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='fullName'
                placeholder='John Doe'
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full border-2 p-3 rounded-lg focus:outline-none transition ${
                  errors.fullName
                    ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                }`}
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm mt-2'>{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Delivery Address <span className='text-red-500'>*</span>
              </label>
              <textarea
                name='address'
                placeholder='123 Main Street, City, State 12345'
                value={formData.address}
                onChange={handleChange}
                rows='4'
                className={`w-full border-2 p-3 rounded-lg focus:outline-none transition resize-none ${
                  errors.address
                    ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                }`}
              />
              {errors.address && (
                <p className='text-red-500 text-sm mt-2'>{errors.address}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Phone Number <span className='text-red-500'>*</span>
              </label>
              <input
                type='tel'
                name='phone'
                placeholder='9876543210'
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border-2 p-3 rounded-lg focus:outline-none transition ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                }`}
              />
              {errors.phone && (
                <p className='text-red-500 text-sm mt-2'>{errors.phone}</p>
              )}
            </div>

          </div>

          <button
            type='submit'
            className='w-full mt-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-lg transition transform hover:scale-105 shadow-lg'
          >
            Place Order
          </button>

        </form>

        <div>

          <div className='bg-white p-8 rounded-2xl shadow-lg border border-slate-200 sticky top-4'>

            <h2 className='text-3xl font-bold mb-8 text-slate-900'>
              Order Summary
            </h2>

            <div className='space-y-4 mb-8 pb-8 border-b border-slate-200 max-h-64 overflow-y-auto'>

              {cart?.items?.length > 0 ? (
                cart.items.map(item => (
                  <div
                    key={item.productId?._id}
                    className='flex justify-between items-start p-4 bg-slate-50 rounded-lg border border-slate-200'
                  >

                    <div className='flex-1'>
                      <h3 className='font-semibold text-slate-900 line-clamp-2'>
                        {item.productId?.name}
                      </h3>
                      <p className='text-sm text-slate-600 mt-1'>
                        Qty: <span className='font-semibold'>{item.quantity}</span>
                      </p>
                    </div>

                    <p className='font-bold text-blue-600 ml-4'>
                      ₹ {(item.productId?.price * item.quantity)?.toLocaleString()}
                    </p>

                  </div>
                ))
              ) : (
                <p className='text-slate-500 text-center py-8'>No items in cart</p>
              )}

            </div>

            <div className='space-y-4 mb-8 pb-8 border-b border-slate-200'>

              <div className='flex justify-between text-slate-700'>
                <span className='font-semibold'>Subtotal:</span>
                <span>₹ {subtotal?.toLocaleString()}</span>
              </div>

              <div className='flex justify-between text-slate-700'>
                <span className='font-semibold'>Shipping:</span>
                <span className='text-green-600 font-semibold'>₹ {shipping}</span>
              </div>

              <div className='flex justify-between text-slate-700'>
                <span className='font-semibold'>Tax (10%):</span>
                <span>₹ {parseFloat(tax)?.toLocaleString()}</span>
              </div>

            </div>

            <div className='flex justify-between text-2xl font-bold text-slate-900 bg-blue-50 p-4 rounded-lg border border-blue-200'>
              <span>Total:</span>
              <span className='text-blue-600'>₹ {parseFloat(grandTotal)?.toLocaleString()}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckoutPage;