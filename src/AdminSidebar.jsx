import {
  BarChart3,
  Bell,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Package,
  Receipt,
  RotateCcw,
  Settings,
  ShoppingBag,
  Users,
  WalletCards,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuGroups = [
  {
    title: "MAIN MENU",
    items: [
      {
        name: "Overview",
        path: "/admin",
        icon: LayoutDashboard,
      },
      {
        name: "Analytics",
        path: "/admin/analytics",
        icon: BarChart3,
      },
      {
        name: "Products",
        path: "/admin/products",
        icon: Package,
      },
      {
        name: "Sales",
        path: "/admin/orders",
        icon: ShoppingBag,
      },
    ],
  },
  {
    title: "TRANSACTIONS",
    items: [
      {
        name: "Payments",
        path: "/admin/payments",
        icon: WalletCards,
      },
      {
        name: "Refunds",
        path: "/admin/refunds",
        icon: RotateCcw,
      },
      {
        name: "Invoices",
        path: "/admin/invoices",
        icon: Receipt,
      },
      {
        name: "Returns",
        path: "/admin/returns",
        icon: Package,
      },
    ],
  },
  {
    title: "GENERAL",
    items: [
      {
        name: "Customers",
        path: "/admin/customers",
        icon: Users,
      },
      {
        name: "Notifications",
        path: "/admin/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64
        border-r border-gray-200 bg-white
        transition-transform duration-300
        dark:border-white/10 dark:bg-[#120806]
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-6 dark:border-white/10">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e59a38] font-black text-[#100704]">
              N
            </div>

            <div>
              <h1 className="font-bold tracking-widest">
                NPG
              </h1>

              <p className="text-[10px] text-gray-500">
                ADMIN PANEL
              </p>
            </div>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-[calc(100vh-80px)] overflow-y-auto p-4">

          {menuGroups.map((group) => (
            <div key={group.title} className="mb-7">

              <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-gray-400">
                {group.title}
              </p>

              <div className="space-y-1">

                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.path === "/admin"}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                          isActive
                            ? "bg-[#e59a38] font-semibold text-[#100704]"
                            : "text-gray-600 hover:bg-[#f5eee8] dark:text-gray-300 dark:hover:bg-white/5"
                        }`
                      }
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={18} />
                        {item.name}
                      </span>

                      <ChevronRight
                        size={15}
                        className="opacity-0 transition group-hover:opacity-100"
                      />
                    </NavLink>
                  );
                })}

              </div>
            </div>
          ))}

          <div className="mt-10 rounded-2xl bg-[#100704] p-5 text-white">
            <p className="text-xs text-gray-400">
              NPG CLOTHING
            </p>

            <h3 className="mt-2 font-semibold">
              Nothing Pass God
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Manage your fashion store from one place.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;