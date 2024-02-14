import {AccessDenied, AllOrders, Home, Login, MenuItemDetails, MenuItemList, MenuItemUpsert, MyOrders, NotFound, OrderConfirmed, OrderDetails, Payment, Register, ShoppingCart} from './../Pages';
import {Header, Footer} from './../Components/Layout';
import {Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetShoppingCartByUserIdQuery} from '../Apis/shoppingCartApi';
import {setShoppingCart} from '../Storage/Redux/shoppingCartSlice';
import {userModel} from '../Interfaces';
import {setLoggedInUser} from './../Storage/Redux/userAuthSlice';
import {useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {RootState} from './../Storage/Redux/store';

function App() {
  const [skip, setSkip] = useState(true);
  const userFromStore: Partial<userModel> = useSelector((state: RootState) => state.userAuthStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {data, isLoading} = useGetShoppingCartByUserIdQuery(userFromStore.uid, {skip: skip});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const {fullName, email, role, uid}: userModel = jwt_decode(token);
      dispatch(setLoggedInUser({fullName, email, role, uid}));
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (userFromStore.uid) {
      setSkip(false);
    }
  }, [userFromStore]);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setShoppingCart(data.cartItems));
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order/orderConfirmed/:id" element={<OrderConfirmed />} />
          <Route path="/order/myOrders" element={<MyOrders />} />
          <Route path="/order/allOrders" element={<AllOrders />} />
          <Route path="/order/orderDetails/:id" element={<OrderDetails />} />
          <Route path="/menuItem/menuItemList" element={<MenuItemList />} />
          <Route path="/menuItem/menuItemUpsert" element={<MenuItemUpsert />} />
          <Route path="/menuItem/menuItemUpsert/:id" element={<MenuItemUpsert />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
