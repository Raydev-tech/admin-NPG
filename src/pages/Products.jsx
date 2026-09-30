import { useEffect, useState } from "react";
import axios from "axios";
import {
  Edit,
  Plus,
  Search,
  Trash2,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/getall`
      );

      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/product/delete/${id}`
      );

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      toast.success("Product deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div
        data-aos="fade-down"
        className="flex flex-col justify-between gap-4 md:flex-row md:items-center"
      >

        <div>
          <p className="text-sm text-[#e59a38]">
            Product catalog
          </p>

          <h1 className="text-2xl font-bold md:text-3xl">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your NPG clothing products.
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#e59a38] px-5 py-3 text-sm font-bold text-[#100704] transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </Link>

      </div>

      <div
        data-aos="fade-up"
        className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#170b08]"
      >

        <div className="border-b border-gray-200 p-5 dark:border-white/10">

          <div className="flex max-w-md items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 dark:border-white/10">

            <Search size={18} className="text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none"
            />

          </div>

        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center">

            <Package
              size={40}
              className="mx-auto text-gray-400"
            />

            <p className="mt-3 text-gray-500">
              No products found.
            </p>

          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px] text-left text-sm">

              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 dark:border-white/10">

                  <th className="px-5 py-4">
                    Product
                  </th>

                  <th className="px-5 py-4">
                    Category
                  </th>

                  <th className="px-5 py-4">
                    Price
                  </th>

                  <th className="px-5 py-4">
                    Offer Price
                  </th>

                  <th className="px-5 py-4">
                    Stock
                  </th>

                  <th className="px-5 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-14 w-14 overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10">

                          {product.image?.[0] ? (
                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package size={20} />
                            </div>
                          )}

                        </div>

                        <div>
                          <p className="font-semibold">
                            {product.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {product._id}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-4">
                      {product.category}
                    </td>

                    <td className="px-5 py-4">
                      ₦{Number(product.price || 0).toLocaleString()}
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#e59a38]">
                      ₦{Number(product.offerPrice || 0).toLocaleString()}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.inStock
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex gap-2">

                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10"
                        >
                          <Edit size={17} />
                        </Link>

                        <button
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
    </div>
  );
};

export default Products;