import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect homepage */}
        <Route
          path="/"
          element={<Navigate to="/admin" replace />}
        />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* /admin */}
          <Route index element={<Dashboard />} />

          {/* /admin/products */}
          <Route
            path="products"
            element={<Products />}
          />

          {/* /admin/products/add */}
          <Route
            path="products/add"
            element={<AddProduct />}
          />

          {/* /admin/orders */}
          <Route
            path="orders"
            element={<Orders />}
          />

          {/* /admin/customers */}
          <Route
            path="customers"
            element={<Customers />}
          />

        </Route>

        {/* Any unknown route */}
        <Route
          path="*"
          element={<Navigate to="/admin" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;