import { useEffect, useState } from "react";
import axios from "axios";
import {
  Eye,
  Search,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/order/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/order/status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );

      toast.success("Order status updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order._id
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div data-aos="fade-down">
        <p className="text-sm text-[#e59a38]">
          Sales management
        </p>

        <h1 className="text-2xl font-bold md:text-3xl">
          Orders
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage customer orders.
        </p>
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
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search order..."
              className="w-full bg-transparent outline-none"
            />

          </div>

        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-10 text-center">

            <ShoppingBag
              size={40}
              className="mx-auto text-gray-400"
            />

            <p className="mt-3 text-gray-500">
              No orders found.
            </p>

          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] text-left text-sm">

              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 dark:border-white/10">

                  <th className="px-5 py-4">
                    Order ID
                  </th>

                  <th className="px-5 py-4">
                    Amount
                  </th>

                  <th className="px-5 py-4">
                    Payment
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Date
                  </th>

                  <th className="px-5 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="px-5 py-4 font-semibold">
                      #{order._id.slice(-8)}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      ₦{Number(order.amount || 0).toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      {order.method || "COD"}
                    </td>

                    <td className="px-5 py-4">

                      <select
                        value={order.status || "Pending"}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-xs outline-none dark:border-white/10"
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>

                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {order.date
                        ? new Date(
                            order.date
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-5 py-4">

                      <button
                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10"
                        title="View order"
                      >
                        <Eye size={18} />
                      </button>

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

export default Orders;