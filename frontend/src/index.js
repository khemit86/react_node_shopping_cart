import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
}
from 'react-router-dom';
import App from './App';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App/> }>
      <Route  index={true}  element={ <HomeScreen/> } />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen/>} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />

      <Route element={<ProductScreen/>}  path= "/product/:id" />
      <Route element={<CartScreen/>} path="/cart" />
      <Route path="/login" element={ <LoginScreen /> } />
      <Route path="/register" element={ <RegisterScreen /> } />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen/>} />
        <Route path = "/shipping" element={ <ShippingScreen/>} />
        <Route path="/payment" element={ <PaymentScreen />} /> 
        <Route path="/placeorder" element={<PlaceOrderScreen/>} />
        <Route path="/order/:id" element={<OrderScreen/>} />
      </Route>
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
      
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} /> 
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={ router }></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
