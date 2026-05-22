import API from '../utils/axiosConfig';

export const getProducts = async (params) => {

  const response = await API.get(
    '/products',
    { params }
  );

  return response.data;
};

export const getProductById = async (id) => {

  const response = await API.get(
    `/products/${id}`
  );

  return response.data;
};

export const updateProduct = async (
  productId,
  productData
) => {

  const response =
    await API.put(
      `/products/${productId}`,
      productData
    );

  return response.data;
};