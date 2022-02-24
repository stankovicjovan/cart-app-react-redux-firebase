import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
// LECTURE COMPONENT
// import { uiActions } from './store/ui-slice';

// LECTURE ACTION CREATOR
import { sendCartData, fetchCartData } from './store/cart-actions';

// LECTURE we dont want useEffect to run initially becouse it overwrites our existing cart with empty whenever we reload the app
let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);

  // LECTURE sending http request whenever state of useSelector changes

  // //TODO dispatch za kontrolisanje notificaionog state-a
  // const dispatch = useDispatch();
  // const cart = useSelector(state => state.cart);
  // const notification = useSelector(state => state.ui.notification);

  // LECTURE COMPONENT HTTP REQUEST
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     //TODO dispatch prilikom slanja
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data...',
  //       })
  //     );
  //     const response = await fetch(
  //       'https://redux-cart-c03a0-default-rtdb.firebaseio.com/cart.json',
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Sending cart data failed.');
  //     }
  //     //LECTURE when sending data we are not intrested in response, just to check for errors^
  //     // const responseData = await response.json();

  //     //TODO dispatch nakon slanja
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success!',
  //         message: 'Sending cart data is completed!',
  //       })
  //     );
  //   };

  //   // LECTURE blocking sendCartData to be exectued for the first time on 65 line
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     //TODO dispatch ako ima error prilikom slanja
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error...',
  //         message: 'Sending cart data failed!',
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  // //

  //TODO dispatch za kontrolisanje notificaionog state-a
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  // LECTURE ACTION CREATORS HTTP GET REQUEST _FETCHING
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // LECTURE ACTION CREATORS HTTP PUT REQUEST
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.isChanged) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification notification={notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
