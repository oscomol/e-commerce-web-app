import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layouts/administrator/RootLayout";
import Dashboard from "./components/main/dashboard/Dashboard";
import Products from "./components/main/products/Products";
import Orders from "./components/main/orders/Orders";
import Users from "./components/main/users/Users";
import Statistics from "./components/main/statistics/Statistics";
import HotOffers from "./components/main/hotOffers/HotOffers";
import Settings from "./components/main/settings/Settings";
import Admins from "./components/main/admin/Admins";
import Ratings from "./components/main/ratings/Ratings";
import Inventory from "./components/main/inventory/Inventory";
import Logs from "./components/main/logs/Logs";

import UserRootLayout from "./components/layouts/Users/UserRootLayout";
import Home from "./components/userPages/Home/Home";
import About from "./components/userPages/about/About";
import Contact from "./components/userPages/contact/Contact";
import Feedback from "./components/userPages/feedback/Feedback";
import Faq from "./components/userPages/faq/Faq";

import UserDashboardlayout from "./components/layouts/Users/UserDashboardlayout";
import Notification from "./components/userDashboardPages/notification/Notification";
import UserLogin from "./components/userPages/login/UserLogin";
import SignUp from "./components/userPages/signup/SignUp";
import UserHome from "./components/userDashboardPages/Home/UserHome";
import Message from "./components/userDashboardPages/message/Message";
import Store from "./components/userDashboardPages/store/Store";
import Cart from "./components/userDashboardPages/cart/Cart";
import Pending from "./components/userDashboardPages/order/pending/Pending";
import Delivered from "./components/userDashboardPages/order/delivered/Delivered";
import Cancelled from "./components/userDashboardPages/order/cancelled/Cancelled";
import Completed from "./components/userDashboardPages/order/completed/Completed";
import Rate from "./components/userDashboardPages/order/rate/Rate";
import Prefetch from "./components/api/Prefetch";
import PersistLogin from "./components/userPages/login/PersistLogin";
import UserOrders from "./components/main/users/UserOrders";
import Messages from "./components/main/message/Messages";
import OrderMessage from "./components/userDashboardPages/message/OrderMessage";

function App() {

  return (
    <Routes>

      <Route path="/">
        <Route element={<UserRootLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='feedback' element={<Feedback />} />
          <Route path='faq' element={<Faq />} />
          <Route path='sign-in' element={<UserLogin />} />
          <Route path='sign-up' element={<SignUp />} />
        </Route>
      </Route>

      <Route element={<PersistLogin />}>


        <Route element={<Prefetch />}>


          <Route path="/dashboard">
            <Route element={<UserDashboardlayout />}>
              <Route index element={<UserHome />} />
              <Route path='store' element={<Store />} />

              <Route path='message'>
                <Route index element={<Message />} />
                <Route path='mess/:trackingID' element={<OrderMessage />} />
              </Route>

              <Route path='notification' element={<Notification />} />
              <Route path='wishlist' element={<Cart />} />
              <Route path="order">
                <Route path='pending' element={<Pending />} />
                <Route path='delivered' element={<Delivered />} />
                <Route path='cancelled' element={<Cancelled />} />
                <Route path='completed' element={<Completed />} />
                {/* <Route path='to-rate' element={<Rate />} /> */}
              </Route>
            </Route>
          </Route>

          <Route path='/admin'>
            <Route element={<RootLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users">
                <Route index element={<Users />} />
                <Route path="order/:userID" element={<UserOrders />} />
              </Route>

              <Route path="message/:userID">
                <Route index element={<Messages />} />
              </Route>

              <Route path="statistics" element={<Statistics />} />
              <Route path="hot-offer" element={<HotOffers />} />
              <Route path="settings" element={<Settings />} />
              <Route path="admins" element={<Admins />} />
              <Route path="ratings" element={<Ratings />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="logs" element={<Logs />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>

  )
}

export default App;