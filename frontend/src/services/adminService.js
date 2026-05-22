import API from '../utils/axiosConfig';

export const getAllUsers = async () => {

  const response = await API.get(
    '/admin/users'
  );

  return response.data;
};

export const getAllOrders = async () => {

  const response = await API.get(
    '/admin/orders'
  );

  return response.data;
};

export const updateOrderStatus = async (
  orderId,
  status
) => {

  const response = await API.put(
    `/admin/orders/${orderId}/status`,
    { status }
  );

  return response.data;
};

export const createProduct = async (
  productData
) => {

  const response = await API.post(
    '/products',
    productData
  );

  return response.data;
};

export const updateProduct = async (
  id,
  productData
) => {

  const response = await API.put(
    `/products/${id}`,
    productData
  );

  return response.data;
};

export const deleteProduct = async (id) => {

  const response = await API.delete(
    `/products/${id}`
  );

  return response.data;
};