require('dotenv').config();
const mongoose =
  require('mongoose');
const Product =
  require('../models/Product');


const products = [
  {
    name: 'iPhone 15 Pro',
    description:
      'Latest Apple smartphone with A17 Pro chip, 6.1 inch display, advanced camera system, and titanium design',
    price: 79999,
    originalPrice: 99999,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    ],
    stock: 50,
    rating: 4.8,
    ratingCount: 1250,
    discount: 20,
    sku: 'IPHONE15PRO001',
    specifications: {
      color: 'Black Titanium',
      size: '6.1 inch',
      weight: '187g',
      material: 'Titanium'
    },
    details: {
      brand: 'Apple',
      warranty: '1 Year',
      shippingTime: '2-3 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 5000,
    salesCount: 450
  },

  {
    name: 'Nike Air Max 90',
    description:
      'Iconic Nike running shoes with Air Max cushioning technology, perfect for daily wear and sports activities',
    price: 8999,
    originalPrice: 12000,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&q=80'
    ],
    stock: 75,
    rating: 4.6,
    ratingCount: 890,
    discount: 25,
    sku: 'NIKE90001',
    specifications: {
      color: 'White/Black',
      size: 'US 8-12',
      weight: '345g',
      material: 'Mesh & Synthetic'
    },
    details: {
      brand: 'Nike',
      warranty: '6 Months',
      shippingTime: '3-5 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 3200,
    salesCount: 680
  },

  {
    name: 'Premium Denim Jacket',
    description:
      'Classic blue denim jacket perfect for casual and semi-formal occasions, made with high-quality cotton',
    price: 2499,
    originalPrice: 3999,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=800&q=80',
      'https://images.unsplash.com/photo-1525573783978-85f2b166eb3a?w=800&q=80'
    ],
    stock: 60,
    rating: 4.4,
    ratingCount: 540,
    discount: 37,
    sku: 'DENIM001',
    specifications: {
      color: 'Medium Blue',
      size: 'XS-XXL',
      weight: '650g',
      material: '100% Cotton Denim'
    },
    details: {
      brand: 'Levi\'s',
      warranty: 'Lifetime',
      shippingTime: '5-7 days'
    },
    isFeatured: false,
    isActive: true,
    viewsCount: 2100,
    salesCount: 320
  },

  {
    name: 'Atomic Habits',
    description:
      'Best-selling book by James Clear about building good habits and breaking bad ones. Transform your life with tiny changes.',
    price: 599,
    originalPrice: 999,
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
      'https://images.unsplash.com/photo-150784272343-583f20270319?w=800&q=80',
      'https://images.unsplash.com/photo-1507842486925-514e4f9a8662?w=800&q=80'
    ],
    stock: 150,
    rating: 4.9,
    ratingCount: 5200,
    discount: 40,
    sku: 'ATOMICHABITS001',
    specifications: {
      color: 'Hardcover',
      size: 'Medium',
      weight: '350g',
      material: 'Paper'
    },
    details: {
      brand: 'Penguin Books',
      warranty: 'N/A',
      shippingTime: '1-2 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 12000,
    salesCount: 2340
  },

  {
    name: 'Sony WH-1000XM5 Headphones',
    description:
      'Premium wireless headphones with industry-leading noise cancellation, 30-hour battery life, and superior sound quality',
    price: 29999,
    originalPrice: 39999,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    stock: 45,
    rating: 4.7,
    ratingCount: 1890,
    discount: 25,
    sku: 'SONYHEADPHONES001',
    specifications: {
      color: 'Midnight Blue',
      size: 'Over-Ear',
      weight: '250g',
      material: 'Plastic & Leather'
    },
    details: {
      brand: 'Sony',
      warranty: '2 Years',
      shippingTime: '2-3 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 4500,
    salesCount: 380
  },

  {
    name: 'Fjallraven Kanken Backpack',
    description:
      'Iconic Swedish backpack made with durable Vinylon F material, perfect for daily commute and light travel',
    price: 3499,
    originalPrice: 4999,
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1572428985359-5b66e8e6f611?w=800&q=80'
    ],
    stock: 80,
    rating: 4.8,
    ratingCount: 2340,
    discount: 30,
    sku: 'FJALLRAVEN001',
    specifications: {
      color: 'Deep Red',
      size: '20L',
      weight: '390g',
      material: 'Vinylon F'
    },
    details: {
      brand: 'Fjallraven',
      warranty: 'Lifetime',
      shippingTime: '4-6 days'
    },
    isFeatured: false,
    isActive: true,
    viewsCount: 3400,
    salesCount: 520
  },

  {
    name: 'Apple Watch Series 9',
    description:
      'Advanced smartwatch with fitness tracking, health monitoring, always-on display, and up to 18 hours battery life',
    price: 39999,
    originalPrice: 49999,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'
    ],
    stock: 55,
    rating: 4.6,
    ratingCount: 1200,
    discount: 20,
    sku: 'APPLEWATCH9001',
    specifications: {
      color: 'Midnight',
      size: '45mm',
      weight: '32g',
      material: 'Aluminum'
    },
    details: {
      brand: 'Apple',
      warranty: '1 Year',
      shippingTime: '2-3 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 5600,
    salesCount: 420
  },

  {
    name: 'The Midnight Library',
    description:
      'Bestselling novel by Matt Haig about a woman who gets a chance to explore different versions of her life',
    price: 449,
    originalPrice: 699,
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
      'https://images.unsplash.com/photo-1507842872343-583f20270319?w=800&q=80',
      'https://images.unsplash.com/photo-1507842486925-514e4f9a8662?w=800&q=80'
    ],
    stock: 120,
    rating: 4.7,
    ratingCount: 3450,
    discount: 36,
    sku: 'MIDNIGHTLIBRARY001',
    specifications: {
      color: 'Paperback',
      size: 'Medium',
      weight: '320g',
      material: 'Paper'
    },
    details: {
      brand: 'Penguin',
      warranty: 'N/A',
      shippingTime: '1-2 days'
    },
    isFeatured: false,
    isActive: true,
    viewsCount: 6800,
    salesCount: 1240
  },

  {
    name: 'Samsung 65\" 4K Smart TV',
    description:
      'Ultra HD 4K resolution, 120Hz refresh rate, smart TV with streaming apps, perfect for home entertainment',
    price: 54999,
    originalPrice: 79999,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
      'https://images.unsplash.com/photo-1577720643272-265e434f8f65?w=800&q=80',
      'https://images.unsplash.com/photo-1522869635100-ce306146f0ae?w=800&q=80'
    ],
    stock: 20,
    rating: 4.5,
    ratingCount: 650,
    discount: 31,
    sku: 'SAMSUNG65TV001',
    specifications: {
      color: 'Black',
      size: '65 inch',
      weight: '23kg',
      material: 'Plastic & Glass'
    },
    details: {
      brand: 'Samsung',
      warranty: '2 Years',
      shippingTime: '5-7 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 3200,
    salesCount: 145
  },

  {
    name: 'Dyson V15 Vacuum',
    description:
      'Cordless vacuum cleaner with intelligent laser, detects dust on any floor, 60 minute runtime',
    price: 74999,
    originalPrice: 99999,
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1633327948975-fbf26ba06bfd?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=800&q=80'
    ],
    stock: 25,
    rating: 4.8,
    ratingCount: 580,
    discount: 25,
    sku: 'DYSONV15001',
    specifications: {
      color: 'Nickel',
      size: 'Cordless',
      weight: '2.2kg',
      material: 'Plastic & Metal'
    },
    details: {
      brand: 'Dyson',
      warranty: '2 Years',
      shippingTime: '3-5 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 2100,
    salesCount: 89
  },

  {
    name: 'NARS Blush - Orgasm',
    description:
      'Best-selling peachy-pink blush with buildable coverage, perfect for all skin tones, long-lasting formula',
    price: 2099,
    originalPrice: 2999,
    category: 'Beauty',
    images: [
      'https://images.unsplash.com/photo-1599319572423-e57e11e60cd4?w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-af407713fc39?w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-af407713fc39?w=800&q=80'
    ],
    stock: 200,
    rating: 4.9,
    ratingCount: 4500,
    discount: 30,
    sku: 'NARSBLUSH001',
    specifications: {
      color: 'Orgasm (Peachy Pink)',
      size: '4.8g',
      weight: '50g',
      material: 'Powder'
    },
    details: {
      brand: 'NARS',
      warranty: 'N/A',
      shippingTime: '2-3 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 7600,
    salesCount: 1890
  },

  {
    name: 'Organic Green Tea - Premium',
    description:
      ' 100% organic green tea leaves from finest gardens, antioxidant-rich, fresh and aromatic flavor',
    price: 699,
    originalPrice: 999,
    category: 'Food',
    images: [
      'https://images.unsplash.com/photo-1597318689000-31b84d7c4a1f?w=800&q=80',
      'https://images.unsplash.com/photo-1597318689000-31b84d7c4a1f?w=800&q=80',
      'https://images.unsplash.com/photo-1597900144100-d84cec15f1ed?w=800&q=80'
    ],
    stock: 300,
    rating: 4.6,
    ratingCount: 1200,
    discount: 30,
    sku: 'GREENTEAPREMIUM001',
    specifications: {
      color: 'Green',
      size: '100g Box',
      weight: '100g',
      material: 'Tea Leaves'
    },
    details: {
      brand: 'Premium Tea Co',
      warranty: 'N/A',
      shippingTime: '1-2 days'
    },
    isFeatured: false,
    isActive: true,
    viewsCount: 4200,
    salesCount: 890
  },

  {
    name: 'Canon EOS R5 Camera',
    description:
      'Professional mirrorless camera with 45MP sensor, 8K video recording, perfect for photographers and videographers',
    price: 379999,
    originalPrice: 499999,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a0fa8d54da?w=800&q=80',
      'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=800&q=80',
      'https://images.unsplash.com/photo-1614008375890-cb53b6c5f8d5?w=800&q=80'
    ],
    stock: 10,
    rating: 4.9,
    ratingCount: 890,
    discount: 24,
    sku: 'CANONR5001',
    specifications: {
      color: 'Black',
      size: 'Professional',
      weight: '738g',
      material: 'Metal & Plastic'
    },
    details: {
      brand: 'Canon',
      warranty: '1 Year',
      shippingTime: '3-5 days'
    },
    isFeatured: true,
    isActive: true,
    viewsCount: 1200,
    salesCount: 34
  }
];


const seedProducts = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    await Product.deleteMany({});
    console.log('🗑️  Existing products deleted');

    const result = await Product.insertMany(products);
    console.log(`✅ ${result.length} products seeded successfully!`);

    console.log('\n📦 Seeded Products:');
    console.log('====================');
    result.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
};

seedProducts();