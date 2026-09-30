import {
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  ArrowUpRight,
} from "lucide-react";

import StatCard from "../components/StatCard";

const Dashboard = () => {
  const recentOrders = [
    {
      id: "#NPG-1001",
      customer: "Abdulrahman",
      amount: "₦36,010",
      status: "Pending",
    },
    {
      id: "#NPG-1002",
      customer: "Ibrahim",
      amount: "₦52,000",
      status: "Processing",
    },
    {
      id: "#NPG-1003",
      customer: "Aisha",
      amount: "₦18,000",
      status: "Shipped",
    },
    {
      id: "#NPG-1004",
      customer: "Daniel",
      amount: "₦32,000",
      status: "Delivered",
    },
  ];

  const products = [
    {
      name: "NPG Signature Tee",
      category: "T-Shirts",
      price: "₦18,000",
      stock: 20,
    },
    {
      name: "Oversized Hoodie",
      category: "Hoodies",
      price: "₦32,000",
      stock: 8,
    },
    {
      name: "Baggy Denim",
      category: "Jeans",
      price: "₦35,000",
      stock: 5,
    },
  ];

  return (
    <div className="space-y-8">

      <div data-aos="fade-down">
        <p className="text-sm text-[#e59a38]">
          Welcome back 👋
        </p>

        <h1 className="mt-1 text-2xl font-bold md:text-3xl">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here's what's happening with your NPG store.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Sales"
          value="₦486,500"
          change="+12.5% from last month"
          icon={DollarSign}
        />

        <StatCard
          title="Orders"
          value="128"
          change="+8.2% from last month"
          icon={ShoppingBag}
        />

        <StatCard
          title="Products"
          value="42"
          change="+4 new products"
          icon={Package}
        />

        <StatCard
          title="Customers"
          value="1,248"
          change="+15.3% from last month"
          icon={Users}
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        <section
          data-aos="fade-up"
          className="rounded-2xl border border-gray-200 bg-white p-6 xl:col-span-2 dark:border-white/10 dark:bg-[#170b08]"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-bold">
                Sales Overview
              </h2>

              <p className="text-xs text-gray-500">
                Monthly sales performance
              </p>
            </div>

            <button className="rounded-lg border px-3 py-2 text-xs dark:border-white/10">
              This Month
            </button>
          </div>

          <div className="flex h-64 items-end gap-3 md:gap-6">

            {[45, 60, 40, 75, 55, 85, 68, 90, 65, 78, 95, 82].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-lg bg-[#e59a38] transition hover:opacity-70"
                    style={{ height: `${height}%` }}
                  />

                  <span className="text-[10px] text-gray-400">
                    {index + 1}
                  </span>
                </div>
              )
            )}

          </div>
        </section>

        <section
          data-aos="fade-up"
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#170b08]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">
                Best Sellers
              </h2>

              <p className="text-xs text-gray-500">
                Top products
              </p>
            </div>

            <ArrowUpRight size={18} />
          </div>

          <div className="mt-6 space-y-5">

            {products.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3ece7] font-bold text-[#100704] dark:bg-white/10 dark:text-white">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {product.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {product.category}
                    </p>
                  </div>

                </div>

                <p className="text-sm font-semibold">
                  {product.price}
                </p>
              </div>
            ))}

          </div>
        </section>

      </div>

      <section
        data-aos="fade-up"
        className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#170b08]"
      >

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="font-bold">
              Recent Orders
            </h2>

            <p className="text-xs text-gray-500">
              Latest customer orders
            </p>
          </div>

          <button className="text-sm font-semibold text-[#e59a38]">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px] text-left text-sm">

            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500 dark:border-white/10">
                <th className="pb-4">Order</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>

              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 last:border-0 dark:border-white/5"
                >

                  <td className="py-4 font-semibold">
                    {order.id}
                  </td>

                  <td className="py-4">
                    {order.customer}
                  </td>

                  <td className="py-4">
                    {order.amount}
                  </td>

                  <td className="py-4">

                    <span className="rounded-full bg-[#e59a38]/15 px-3 py-1 text-xs font-semibold text-[#b56d14]">
                      {order.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;