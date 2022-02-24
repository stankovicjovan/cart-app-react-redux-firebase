import { uiActions } from './ui-slice';

import { cartActions } from './cart-slice';

// LECTURE creating ACTION CREATORS FOR THUNK! TODO PUT
export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data...',
      })
    );

    const fetchData = async () => {
      const response = await fetch(
        'https://redux-cart-c03a0-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await fetchData();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending cart data is completed!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

// TODO FETCH

export const fetchCartData = () => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Getting data...',
        message: 'Sending cart data...',
      })
    );
    const fetchData = async () => {
      const response = await fetch(
        'https://redux-cart-c03a0-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Fetching cart data failed.');
      }
      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      //TODO replacing frontend cart with the cart loading from firebase
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Fetching cart data is completed!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};
