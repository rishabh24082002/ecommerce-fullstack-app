import { Link } from 'react-router-dom';

import useCart from '../hooks/useCart';

const CartPage = () => {

    const {
        cart,
        updateItemQuantity,
        removeItem
    } = useCart();

    if (!cart || cart.items.length === 0) {

        return (
            <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center'>

                <div className='text-center space-y-8'>

                    <div className='text-8xl'>
                        🛒
                    </div>

                    <h1 className='text-5xl font-extrabold text-slate-900'>
                        Your Cart is Empty
                    </h1>

                    <p className='text-xl text-slate-600 max-w-md mx-auto'>
                        Looks like you haven't added anything to your cart yet
                    </p>

                    <Link
                        to='/'
                        className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105'
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        );
    }

    const total = cart.items.reduce(
        (acc, item) =>
            acc +
            item.productId?.price *
            item.quantity,
        0
    );

    const subtotal = total;
    const shipping = total > 0 ? 50 : 0;
    const tax = (subtotal * 0.1).toFixed(2);
    const grandTotal = (subtotal + shipping + parseFloat(tax)).toFixed(2);

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>

                <div className='mb-12'>
                    <h1 className='text-5xl font-extrabold text-slate-900 mb-2'>
                        Shopping Cart
                    </h1>
                    <p className='text-slate-600'>
                        {cart.items.length} items in your cart
                    </p>
                </div>

                <div className='grid lg:grid-cols-3 gap-8'>

                    <div className='lg:col-span-2 space-y-4'>

                        {
                            cart.items.map(item => (
                                <div
                                    key={item.productId?._id}
                                    className='flex gap-6 items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-slate-200'
                                >

                                    <div className='flex-shrink-0'>
                                        <img
                                            src={
                                                item.productId?.images?.[0] ||
                                                'https://via.placeholder.com/150'
                                            }
                                            alt={item.productId?.name}
                                            className='w-28 h-28 object-cover rounded-xl shadow-sm'
                                            onError={(e) => {
                                                e.target.src =
                                                    'https://via.placeholder.com/150';
                                            }}
                                        />
                                    </div>

                                    <div className='flex-1 space-y-3'>

                                        <h2 className='text-xl font-bold text-slate-900 line-clamp-2'>
                                            {item.productId?.name}
                                        </h2>

                                        <p className='text-lg font-semibold text-blue-600'>
                                            ₹ {item.productId?.price?.toLocaleString()}
                                        </p>

                                        <div className='flex items-center gap-3'>
                                            <label className='text-sm font-semibold text-slate-600'>
                                                Quantity:
                                            </label>
                                            <select
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateItemQuantity(
                                                        item.productId?._id,
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className='border-2 border-slate-300 p-2 rounded-lg focus:outline-none focus:border-blue-600 font-semibold'
                                            >

                                                {
                                                    [...Array(10).keys()].map(x => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </select>
                                        </div>

                                        <p className='text-sm text-slate-600'>
                                            Subtotal: <span className='font-bold text-slate-900'>₹ {(item.productId?.price * item.quantity)?.toLocaleString()}</span>
                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            removeItem(item.productId._id)
                                        }
                                        className='flex-shrink-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105'
                                    >
                                        ✕ Remove
                                    </button>

                                </div>
                            ))
                        }

                    </div>

                    <div className='lg:col-span-1'>

                        <div className='bg-white rounded-2xl shadow-lg p-8 border border-slate-200 sticky top-4'>

                            <h2 className='text-3xl font-bold mb-8 text-slate-900'>
                                Order Summary
                            </h2>

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
                                    <span>₹ {tax}</span>
                                </div>

                            </div>

                            <div className='flex justify-between text-2xl font-bold text-slate-900 mb-8'>
                                <span>Total:</span>
                                <span className='text-blue-600'>₹ {parseFloat(grandTotal)?.toLocaleString()}</span>
                            </div>

                            <Link
                                to='/checkout'
                                className='block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center font-bold py-4 rounded-lg transition transform hover:scale-105 shadow-lg'
                            >
                                Proceed to Checkout
                            </Link>


                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CartPage;