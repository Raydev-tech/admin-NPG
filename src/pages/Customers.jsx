import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Users } from "lucide-react";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/user/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCustomers(response.data.users || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load customers");
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div data-aos="fade-down">
        <p className="text-sm text-[#e59a38]">
          Customer management
        </p>

        <h1 className="text-3xl font-bold">
          Customers
        </h1>
      </div>

      <section
        data-aos="fade-up"
        className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#170b08]"
      >

        <div className="border-b border-gray-200 p-5 dark:border-white/10">

          <div className="flex max-w-md items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 dark:border-white/10">

            <Search size={18} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search customers..."
              className="w-full bg-transparent outline-none"
            />

          </div>

        </div>

        {filteredCustomers.length === 0 ? (
          <div className="p-10 text-center">

            <Users
              size={40}
              className="mx-auto text-gray-400"
            />

            <p className="mt-3 text-gray-500">
              No customers found.
            </p>

          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px] text-left text-sm">

              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 dark:border-white/10">

                  <th className="px-5 py-4">
                    Customer
                  </th>

                  <th className="px-5 py-4">
                    Email
                  </th>

                  <th className="px-5 py-4">
                    Role
                  </th>

                  <th className="px-5 py-4">
                    Joined
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredCustomers.map((customer) => (

                  <tr
                    key={customer._id}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="px-5 py-4 font-semibold">
                      {customer.name}
                    </td>

                    <td className="px-5 py-4">
                      {customer.email}
                    </td>

                    <td className="px-5 py-4">
                      {customer.role || "buyer"}
                    </td>

                    <td className="px-5 py-4 text-gray-500">
                      {customer.createdAt
                        ? new Date(
                            customer.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
};

export default Customers;