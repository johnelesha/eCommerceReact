import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductContext from '../context/ProductContext';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';
import OrderContext from '../context/OrderContext';
const AboutUs = lazy(() => import('../pages/AboutUs'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
import ProductDetails from '../pages/ProductDetails';
import ContactUs from '../pages/ContactUs';
import AverageContext from '../context/AverageContext';
import Spinner from "../components/dashboard/Spinner";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
const DashboardProducts = lazy(() => import("../pages/DashboardProducts"));
const DashboardOrders = lazy(() => import("../pages/DashboardOrders"));
const DashboardUsers = lazy(() => import("../pages/DashboardUsers"));
import Cart from "../components/Cart/CartPage";
import Checkout from "../components/Payment/Checkout";
import ProtectedRoute from "../components/Payment/ProtectedRoute";

function App() {

  return (
    <>
      <CartContext>
        <UserContext>
          <ProductContext>
            <OrderContext>
              <AverageContext>
                <BrowserRouter>
                  <Suspense fallback={<Spinner />}>
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route index={true} element={<Home />} />
                        <Route path="dashboard" element={<DashboardLayout />} >
                          <Route index={true} element={<Dashboard />} />
                          <Route path="products" element={<DashboardProducts />} />
                          <Route path="orders" element={<DashboardOrders />} />
                          <Route path="users" element={<DashboardUsers />} />
                        </Route>
                        <Route path="products" element={<Products />}></Route>
                        <Route element={<ProtectedRoute />}>
                          <Route path="checkout" element={<Checkout />}></Route>
                        </Route>
                        <Route path="cart" element={<Cart />}></Route>
                        <Route path="products/:productId" element={<ProductDetails />}></Route>
                        <Route path="contact" element={<ContactUs />}></Route>
                        <Route path="profile/:userId" element={<UserProfile />}></Route>
                        <Route path="aboutus" element={<AboutUs />}></Route>
                        <Route path="*" element={<PageNotFound />}></Route>
                      </Route>
                      <Route path="login" element={<LoginPage />}></Route>
                      <Route path="Register" element={<RegisterPage />}></Route>
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </AverageContext>
            </OrderContext>
          </ProductContext>
        </UserContext>
      </CartContext>
    </>
  )
}

export default App
