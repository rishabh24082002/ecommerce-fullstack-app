import {
    useEffect,
    useState
} from 'react';

import { useParams } from 'react-router-dom';

import { getProductById } from '../services/productService';

import useCart from '../hooks/useCart';
import Loading from '../components/Common/Loading';

const ProductDetailsPage = () => {

    const { id } = useParams();

    const { addItemToCart } = useCart();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] =
        useState('');

    useEffect(() => {

        fetchProduct();

    }, [id]);

    const fetchProduct = async () => {

        try {

            const data = await getProductById(id);

            setProduct(data.product);
            setSelectedImage(
                data.product.images?.[0]
            );

        } catch (error) {

            console.log(error);
        }
    };

    if (!product) {
        return <h1><Loading/></h1>;
    }

    return (
        <div className='container mx-auto py-10'>

            <div className='grid md:grid-cols-2 gap-10'>
                <div>

                    <img
                        src={selectedImage}
                        alt={product.name}
                        className='w-full h-[450px] object-cover rounded-xl shadow'
                    />

                    <div className='flex gap-3 mt-4 overflow-x-auto'>

                        {
                            product.images?.map(
                                (image, index) => (

                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Product ${index}`}
                                        onClick={() =>
                                            setSelectedImage(image)
                                        }
                                        className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === image
                                                ? 'border-blue-600'
                                                : 'border-gray-300'
                                            }`}
                                    />
                                )
                            )
                        }

                    </div>

                </div>

                <div>

                    <h1 className='text-4xl font-bold mb-4'>
                        {product.name}
                    </h1>

                    <p className='text-gray-600 mb-4'>
                        {product.description}
                    </p>

                    <p className='text-3xl font-bold mb-4'>
                        ₹ {product.price}
                    </p>

                    <p className='mb-4'>
                        Stock: {product.stock}
                    </p>

                    <select
                        className='border p-2 mb-6'
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Number(e.target.value))
                        }
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

                    <br />

                    <button
                        onClick={() =>
                            addItemToCart(
                                product._id,
                                quantity
                            )
                        }
                        className='bg-blue-600 text-white px-6 py-3 rounded'
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductDetailsPage;