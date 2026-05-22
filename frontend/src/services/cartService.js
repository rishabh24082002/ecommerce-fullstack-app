import API from '../utils/axiosConfig';

export const getCart = async () => {

  const response = await API.get('/cart');

  return response.data;
};

export const addToCart = async (data) => {

  const response = await API.post(
    '/cart',
    data
  );

  return response.data;
};

export const updateCartItem = async (
  productId,
  quantity
) => {

  const response = await API.put(
    `/cart/${productId}`,
    { quantity }
  );

  return response.data;
};

export const removeCartItem = async (
  productId
) => {

  const response = await API.delete(
    `/cart/${productId}`
  );

  return response.data;
};

export const clearCart = async () => {

  const response = await API.delete('/cart');

  return response.data;
};