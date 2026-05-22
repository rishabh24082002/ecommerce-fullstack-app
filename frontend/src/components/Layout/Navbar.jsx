import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

const Navbar = () => {

    const { user, logout } = useAuth();
    const { cart } = useCart();

    return (
        <nav className='bg-blue-600 text-white p-4'>

            <div className='container mx-auto flex justify-between items-center'>

                <Link
                    to='/'
                    className='text-2xl font-bold'
                >
                    ShopHub
                </Link>

                <div className='flex gap-4 items-center'>

                    <Link to='/'>
                        Home
                    </Link>

                    <Link to='/cart'>
                        Cart (
                        {cart?.items?.length || 0}
                        )
                    </Link>

                    {
                        user ? (
                            <>
                                <Link to='/orders'>
                                   My Orders
                                </Link>

                                {
                                    user.role === 'admin' && (
                                        <>
                                            <Link to='/admin'>
                                                Dashboard
                                            </Link>

                                            <Link to='/admin/products'>
                                                Products
                                            </Link>

                                            <Link to='/admin/orders'>
                                                Orders
                                            </Link>
                                        </>
                                    )
                                }

                                <button
                                    onClick={logout}
                                    className='bg-red-500 px-4 py-2 rounded'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    Login
                                </Link>

                                <Link to='/register'>
                                    Register
                                </Link>
                            </>
                        )
                    }

                </div>

            </div>

        </nav>
    );
};

export default Navbar;