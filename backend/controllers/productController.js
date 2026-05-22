const Product = require('../models/Product');

const getProducts = async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 8;

    const skip =
      (page - 1) * limit;

    const search =
      req.query.search || '';

    const category =
      req.query.category || '';

    const sort =
      req.query.sort || '';

    let query = {};

    if (search) {

      query.name = {
        $regex: search,
        $options: 'i'
      };
    }

    if (category) {

      query.category = category;
    }

    let sortOption = {};

    if (sort === 'asc') {

      sortOption.price = 1;

    } else if (sort === 'desc') {

      sortOption.price = -1;
    }

    const products =
      await Product.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const totalProducts =
      await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      totalPages: Math.ceil(
        totalProducts / limit
      ),
      totalProducts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createProduct = async (
  req,
  res
) => {

  try {

    const {
      name,
      description,
      price,
      category,
      images,
      stock
    } = req.body;

    const product =
      await Product.create({
        name,
        description,
        price,
        category,
        images: Array.isArray(images)
          ? images
          : [images],

        stock
      });

    res.status(201).json({
      success: true,
      message: 'Product Created',
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

 const updateProduct =
  async (req, res) => {

    try {

      const {
        name,
        description,
        price,
        category,
        images,
        stock
      } = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          success: false,
          message:
            'Product Not Found'
        });
      }

      product.name =
        name || product.name;

      product.description =
        description ||
        product.description;

      product.price =
        price || product.price;

      product.category =
        category ||
        product.category;

      product.stock =
        stock || product.stock;

      product.images =
        Array.isArray(images)
          ? images
          : [images];

      await product.save();

      res.status(200).json({
        success: true,
        message:
          'Product Updated Successfully',
        product
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
};

const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};