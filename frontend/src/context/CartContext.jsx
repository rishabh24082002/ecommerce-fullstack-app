import {
  createContext,
  useEffect,
  useState
} from 'react';

import toast from 'react-hot-toast';

import {
  getCart,
  addToCart as addCartApi,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../services/cartService';

export const CartContext =
  createContext();

export const CartProvider = ({
  children
}) => {

  const [cart, setCart] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const fetchCart = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          'token'
        );

      if (!token) {

        setCart(null);
        return;
      }

      const data =
        await getCart();

      setCart(data.cart);

    } catch (error) {

       toast.error(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchCart();

  }, []);

  const addItemToCart = async (
    productId,
    quantity = 1
  ) => {

    try {

      const data =
        await addCartApi({
          productId,
          quantity
        });

      setCart(data.cart);

      toast.success(
        'Added To Cart'
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };

  const updateItemQuantity =
    async (
      productId,
      quantity
    ) => {

      try {

        const data =
          await updateCartItem(
            productId,
            quantity
          );

        setCart(data.cart);

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );
      }
    };

  const removeItem = async (
    productId
  ) => {

    try {

      const data =
        await removeCartItem(
          productId
        );

      setCart(data.cart);

      toast.success(
        'Item Removed'
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };

  const clearUserCart =
    async () => {

      try {

        await clearCart();

        setCart({
          items: []
        });

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );
      }
    };

  return (

    <CartContext.Provider
      value={{

        cart,

        loading,

        fetchCart,

       addItemToCart,

        updateItemQuantity,

        removeItem,

        clearUserCart
      }}
    >

      {children}

    </CartContext.Provider>
  );
};