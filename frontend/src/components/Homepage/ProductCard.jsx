import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const ProductCard = ({ product }) => {

  const { addItemToCart } =
    useCart();

  return (

    <div className='bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition duration-300'>

      <img
        src={
          product.images?.[0] ||
          'https://via.placeholder.com/300'
        }
        alt={product.name}
        className='h-52 w-full object-cover rounded-lg'
      />

      <h2 className='text-xl font-semibold mt-4 line-clamp-1'>
        {product.name}
      </h2>

      <div className='flex items-center gap-2 my-3'>

        <span className='text-yellow-500 text-xl'>
          ⭐
        </span>

        <span className='text-lg font-semibold'>
          {product.rating} / 5
        </span>

      </div>

      <p className='text-2xl font-bold text-blue-600'>
        ₹ {product.price}
      </p>

      <div className='flex gap-3 mt-5'>

        <Link
          to={`/products/${product._id}`}
          className='flex-1 bg-blue-600 hover:bg-blue-700 transition text-white text-center py-2 rounded-lg'
        >
          View Details
        </Link>

        <button
          onClick={() =>
            addItemToCart(
              product._id,
              1
            )
          }
          className='flex-1 bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg'
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;