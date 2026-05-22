import {
  useEffect,
  useState
} from 'react';

import { getProducts } from '../../services/productService';

import ProductCard from './ProductCard';
import Filters from './Filters';

const ProductListing = () => {

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState('');

  const [category, setCategory] =
    useState('');

  const [sort, setSort] =
    useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchProducts();

  }, [
    page,
    search,
    category,
    sort
  ]);

  const fetchProducts = async () => {
    setLoading(true);
    try {

      const data = await getProducts({
        page,
        limit: 8,
        search,
        category,
        sort
      });

      setProducts(data.products);

      setTotalPages(data.totalPages);

    } catch (error) {

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      
      <div className='max-w-7xl mx-auto px-4 py-12'>

        <div className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-2'>
            Latest Products
          </h2>
          <p className='text-slate-600'>
            Discover our amazing collection
          </p>
        </div>

        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600'></div>
          </div>
        ) : products.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-xl text-slate-600'>No products found</p>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>

              {
                products.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))
              }

            </div>

            <div className='flex justify-center items-center gap-2 mt-12 pb-8'>

              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  page === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>

              {
                [...Array(totalPages).keys()].map(
                  pageNumber => (
                    <button
                      key={pageNumber}
                      onClick={() =>
                        setPage(pageNumber + 1)
                      }
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        page === pageNumber + 1
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {pageNumber + 1}
                    </button>
                  )
                )
              }

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  page === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default ProductListing;