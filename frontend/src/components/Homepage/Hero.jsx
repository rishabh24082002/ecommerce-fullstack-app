const Hero = () => {
  return (
    <section className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-32'>
      
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl'></div>
        <div className='absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl'></div>
        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        <div className='text-center space-y-8'>
          
          <div className='space-y-4'>
            <h1 className='text-6xl sm:text-7xl font-extrabold tracking-tight'>
              Welcome to{' '}
              <span className='bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
                ShopHub
              </span>
            </h1>
            
            <p className='text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed'>
              Discover our curated collection of premium products at unbeatable prices
            </p>
          </div>

          <div className='grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto text-center'>
            <div className='space-y-2'>
              <p className='text-3xl font-bold'>10K+</p>
              <p className='text-blue-100'>Products</p>
            </div>
            <div className='space-y-2'>
              <p className='text-3xl font-bold'>50K+</p>
              <p className='text-blue-100'>Customers</p>
            </div>
            <div className='space-y-2'>
              <p className='text-3xl font-bold'>4.8★</p>
              <p className='text-blue-100'>Rating</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;