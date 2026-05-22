import {
  useEffect,
  useState
} from 'react';

import toast from 'react-hot-toast';

import {
  createProduct,
  deleteProduct
} from '../services/adminService';

import {
  getProducts,
  updateProduct
} from '../services/productService';

const initialState = {
  name: '',
  description: '',
  price: '',
  category: '',
  images: '',
  stock: ''
};

const ProductManagement = () => {

  const [products, setProducts] =
    useState([]);

  const [formData, setFormData] =
    useState(initialState);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data.products);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        ...formData,

        price:
          Number(formData.price),

        stock:
          Number(formData.stock),

        images:
          formData.images
            .split(',')
            .map(img =>
              img.trim()
            )
      };

      await createProduct(payload);

      toast.success(
        'Product Created Successfully'
      );

      setFormData(initialState);

      fetchProducts();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Failed To Create Product'
      );

    } finally {

      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this product?'
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      toast.success(
        'Product Deleted Successfully'
      );

      setProducts(prev =>
        prev.filter(
          product =>
            product._id !== id
        )
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Failed To Delete Product'
      );
    }
  };

  const handleEditClick = (
    product
  ) => {

    setEditingProduct(product);

    setFormData({
      name: product.name,
      description:
        product.description,
      price: product.price,
      category:
        product.category,
      stock: product.stock,

      images:
        product.images?.join(', ')
    });

    setShowEditModal(true);
  };

  const handleUpdateProduct =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const payload = {
          ...formData,

          price:
            Number(formData.price),

          stock:
            Number(formData.stock),

          images:
            formData.images
              .split(',')
              .map(img =>
                img.trim()
              )
        };

        const response =
          await updateProduct(
            editingProduct._id,
            payload
          );

        setProducts(prev =>
          prev.map(product =>

            product._id ===
            editingProduct._id

              ? response.product
              : product
          )
        );

        toast.success(
          'Product Updated Successfully'
        );

        setShowEditModal(false);

        setEditingProduct(null);

        setFormData(initialState);

      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          'Failed To Update Product'
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>

        <div className='mb-12'>
          <h1 className='text-5xl font-extrabold text-slate-900 mb-2'>
            Product Management
          </h1>
          <p className='text-slate-600'>
            Create, edit, and manage your products
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>

          <form
            onSubmit={handleSubmit}
            className='lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg border border-slate-200 h-fit sticky top-4'
          >

            <h2 className='text-2xl font-bold mb-8 text-slate-900'>
              ➕ Add Product
            </h2>

            <div className='space-y-4'>

              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Product Name
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter product name'
                  className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Description
                </label>
                <textarea
                  name='description'
                  placeholder='Enter product description'
                  className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition resize-none'
                  rows='3'
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-3'>

                <div>
                  <label className='block text-sm font-semibold text-slate-700 mb-2'>
                    Price
                  </label>
                  <input
                    type='number'
                    name='price'
                    placeholder='0'
                    className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition'
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-slate-700 mb-2'>
                    Stock
                  </label>
                  <input
                    type='number'
                    name='stock'
                    placeholder='0'
                    className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition'
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Category
                </label>
                <input
                  type='text'
                  name='category'
                  placeholder='Enter category'
                  className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition'
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Image URLs
                </label>
                <textarea
                  name='images'
                  placeholder='Paste image URLs separated by commas'
                  className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition resize-none'
                  rows='2'
                  value={formData.images}
                  onChange={handleChange}
                  required
                />
                <p className='text-xs text-slate-500 mt-1'>
                  Separate URLs with commas
                </p>
              </div>

            </div>

            <button
              disabled={loading}
              className={`w-full mt-8 font-bold py-3 rounded-lg transition transform hover:scale-105 ${
                loading
                  ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg'
              }`}
            >
              {
                loading
                  ? '⏳ Creating...'
                  : '✨ Create Product'
              }
            </button>

          </form>


          <div className='lg:col-span-2'>

            <div className='mb-6'>
              <h2 className='text-2xl font-bold text-slate-900 mb-4'>
                📦 All Products ({products.length})
              </h2>
            </div>

            <div className='space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-4'>

              {products.length === 0 ? (
                <div className='bg-white p-8 rounded-2xl shadow-md border border-slate-200 text-center'>
                  <p className='text-slate-600 text-lg'>
                    No products yet. Create one to get started!
                  </p>
                </div>
              ) : (
                products.map(product => (

                  <div
                    key={product._id}
                    className='bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-slate-200 transition'
                  >

                    <div className='flex gap-4'>

                      <div className='flex-shrink-0'>
                        <img
                          src={
                            product.images?.[0] ||
                            'https://via.placeholder.com/120'
                          }
                          alt={product.name}
                          className='w-24 h-24 object-cover rounded-xl shadow-sm'
                          onError={(e) => {
                            e.target.src =
                              'https://via.placeholder.com/120';
                          }}
                        />
                      </div>

                      <div className='flex-1 space-y-2'>

                        <h3 className='font-bold text-lg text-slate-900 line-clamp-2'>
                          {product.name}
                        </h3>

                        <p className='text-sm text-slate-600 line-clamp-2'>
                          {product.description}
                        </p>

                        <div className='flex flex-wrap gap-4 text-sm'>

                          <div>
                            <span className='text-slate-600'>Price: </span>
                            <span className='font-bold text-blue-600'>
                              ₹ {product.price?.toLocaleString()}
                            </span>
                          </div>

                          <div>
                            <span className='text-slate-600'>Stock: </span>
                            <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.stock}
                            </span>
                          </div>

                          <div>
                            <span className='text-slate-600'>Category: </span>
                            <span className='font-semibold text-slate-900'>
                              {product.category}
                            </span>
                          </div>

                        </div>

                      </div>

                      <div className='flex flex-col gap-2 ml-4'>

                        <button
                          onClick={() =>
                            handleEditClick(
                              product
                            )
                          }
                          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105'
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              product._id
                            )
                          }
                          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105'
                        >
                          🗑️ Delete
                        </button>

                      </div>

                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

        </div>

      </div>

      {
        showEditModal && (

          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-8'>

            <div className='bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden'>

              <div className='bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex justify-between items-center'>

                <h2 className='text-2xl font-bold text-white'>
                  ✏️ Edit Product
                </h2>

                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                    setFormData(initialState);
                  }}
                  className='text-3xl text-white hover:text-blue-200 transition'
                >
                  ✕
                </button>

              </div>

              <form
                onSubmit={
                  handleUpdateProduct
                }
                className='p-8 space-y-4'
              >

                <div>
                  <label className='block text-sm font-semibold text-slate-700 mb-2'>
                    Product Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    placeholder='Product Name'
                    className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-slate-700 mb-2'>
                    Description
                  </label>
                  <textarea
                    name='description'
                    placeholder='Description'
                    className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition resize-none'
                    rows='4'
                    value={
                      formData.description
                    }
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>

                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>
                      Price
                    </label>
                    <input
                      type='number'
                      name='price'
                      placeholder='Price'
                      className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition'
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>
                      Stock
                    </label>
                    <input
                      type='number'
                      name='stock'
                      placeholder='Stock'
                      className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition'
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div>
                  <label className='block text-sm font-semibold text-slate-700 mb-2'>
                    Category
                  </label>
                  <input
                    type='text'
                    name='category'
                    placeholder='Category'
                    className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition'
                    value={
                      formData.category
                    }
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-slate-700 mb-2'>
                    Image URLs
                  </label>
                  <textarea
                    name='images'
                    placeholder='Image URLs separated by commas'
                    className='w-full border-2 border-slate-300 p-3 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition resize-none'
                    rows='2'
                    value={formData.images}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='flex justify-end gap-3 pt-6 border-t border-slate-200'>

                  <button
                    type='button'
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingProduct(null);
                      setFormData(initialState);
                    }}
                    className='bg-slate-300 hover:bg-slate-400 text-slate-900 px-6 py-2 rounded-lg font-semibold transition'
                  >
                    Cancel
                  </button>

                  <button
                    type='submit'
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
                      loading
                        ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                    }`}
                  >
                    {
                      loading
                        ? '⏳ Updating...'
                        : '✨ Update Product'
                    }
                  </button>

                </div>

              </form>

            </div>

          </div>
        )
      }

    </div>
  );
};

export default ProductManagement;