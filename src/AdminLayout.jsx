import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AOS from "aos";

import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  ClipboardList,
  Users,
  LogOut,
  Store,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
  }, []);

  const navItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: ShoppingBag,
    },
    {
      title: "Add Product",
      path: "/admin/products/add",
      icon: PlusCircle,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: ClipboardList,
    },
    {
      title: "Customers",
      path: "/admin/customers",
      icon: Users,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1c1714]">

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#100704] text-white h-16 flex items-center justify-between px-5 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#e59a38] flex items-center justify-center">
            <Store size={20} />
          </div>

          <div>
            <h1 className="font-bold">NPG</h1>
            <p className="text-[10px] text-gray-400">
              ADMIN PANEL
            </p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2"
        >
          {sidebarOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-[#100704]
          text-white
          flex flex-col
          transform transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">

          <div className="w-11 h-11 rounded-xl bg-[#e59a38] flex items-center justify-center">
            <Store size={23} />
          </div>

          <div className="ml-3">
            <h1 className="text-xl font-bold">
              NPG
            </h1>

            <p className="text-xs text-gray-400">
              CLOTHING ADMIN
            </p>
          </div>

        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">

          <p className="text-[11px] uppercase tracking-wider text-gray-500 px-3 mb-3">
            Main Menu
          </p>

          <nav className="space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    transition
                    ${
                      isActive
                        ? "bg-[#e59a38] text-black"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={19} />

                  <span className="text-sm font-medium">
                    {item.title}
                  </span>
                </NavLink>
              );
            })}

          </nav>

          <p className="text-[11px] uppercase tracking-wider text-gray-500 px-3 mb-3 mt-10">
            General
          </p>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={19} />
            <span className="text-sm font-medium">
              Logout
            </span>
          </button>

        </div>

        {/* Bottom brand */}
        <div className="p-4 border-t border-white/10">

          <div className="bg-white/5 rounded-xl p-4">

            <p className="text-xs text-gray-400">
              NPG Clothing
            </p>

            <p className="text-sm font-semibold mt-1">
              Nothing Pass God
            </p>

            <p className="text-[10px] text-gray-500 mt-2">
              Admin Dashboard
            </p>

          </div>

        </div>

      </aside>

      {/* Main */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">

        {/* Desktop Topbar */}
        <div className="hidden lg:flex h-20 bg-white border-b border-gray-200 items-center justify-between px-8">

          <div>
            <p className="text-xs text-gray-400">
              NPG CLOTHING
            </p>

            <h2 className="font-semibold text-lg">
              Admin Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-[#100704] text-white flex items-center justify-center">
              <Users size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Admin
              </p>

              <p className="text-xs text-gray-400">
                Administrator
              </p>
            </div>

          </div>

        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;