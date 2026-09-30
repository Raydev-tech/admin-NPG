import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";

const AdminNavbar = ({
  darkMode,
  setDarkMode,
  setSidebarOpen,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur md:px-6 dark:border-white/10 dark:bg-[#0d0907]/90">

      <div className="flex items-center gap-4">

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden dark:hover:bg-white/10"
        >
          <Menu />
        </button>

        <div className="hidden md:block">
          <h2 className="font-semibold">
            NPG Clothing
          </h2>

          <p className="text-xs text-gray-500">
            Admin Dashboard
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2 md:gap-4">

        <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 md:flex dark:border-white/10 dark:bg-white/5">
          <Search size={17} className="text-gray-400" />

          <input
            className="w-40 bg-transparent text-sm outline-none"
            placeholder="Search..."
          />
        </div>

        <button className="relative rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-white/10">
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#e59a38]" />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-white/10"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="hidden items-center gap-3 border-l border-gray-200 pl-4 md:flex dark:border-white/10">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e59a38] font-bold text-[#100704]">
            A
          </div>

          <div>
            <p className="text-sm font-semibold">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              NPG Manager
            </p>
          </div>

        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;