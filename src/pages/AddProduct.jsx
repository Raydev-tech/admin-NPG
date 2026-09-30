import { useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  X,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("T-Shirts");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (event) => {
    const files = Array.from(event.target.files || []);

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !offerPrice) {
      toast.error("Please fill all required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
      formData.append("inStock", String(inStock));
      formData.append("description", description);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product added successfully!");

      navigate("/admin/products");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add product"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitProduct}
      className="space-y-6"
    >

      <div
        data-aos="fade-down"
        className="flex items-center gap-4"
      >

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="rounded-xl border border-gray-200 p-3 dark:border-white/10"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <p className="text-sm text-[#e59a38]">
            Product catalog
          </p>

          <h1 className="text-2xl font-bold md:text-3xl">
            Add New Product
          </h1>
        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <section
            data-aos="fade-up"
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#170b08]"
          >

            <h2 className="mb-6 text-lg font-bold">
              General Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="NPG Signature Tee"
                  className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-[#e59a38] dark:border-white/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe your product..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-[#e59a38] dark:border-white/10"
                />
              </div>

            </div>

          </section>

          <section
            data-aos="fade-up"
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#170b08]"
          >

            <h2 className="mb-6 text-lg font-bold">
              Pricing & Stock
            </h2>

            <div className="grid gap-5 md:grid-cols-3">

              <div>
                <label className="mb-2 block text-sm">
                  Base Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="18000"
                  className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-[#e59a38] dark:border-white/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">
                  Offer Price
                </label>

                <input
                  type="number"
                  value={offerPrice}
                  onChange={(e) =>
                    setOfferPrice(e.target.value)
                  }
                  placeholder="16000"
                  className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-[#e59a38] dark:border-white/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">
                  Stock
                </label>

                <button
                  type="button"
                  onClick={() => setInStock(!inStock)}
                  className={`w-full rounded-xl border px-4 py-3 text-left ${
                    inStock
                      ? "border-green-500 text-green-600"
                      : "border-red-500 text-red-500"
                  }`}
                >
                  {inStock
                    ? "✓ In Stock"
                    : "✕ Out of Stock"}
                </button>
              </div>

            </div>

          </section>

        </div>

        <div className="space-y-6">

          <section
            data-aos="fade-up"
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#170b08]"
          >

            <h2 className="mb-5 text-lg font-bold">
              Category
            </h2>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none dark:border-white/10"
            >
              <option>T-Shirts</option>
              <option>Hoodies</option>
              <option>Jeans</option>
              <option>Pants</option>
              <option>Accessories</option>
            </select>

          </section>

          <section
            data-aos="fade-up"
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#170b08]"
          >

            <h2 className="mb-5 text-lg font-bold">
              Product Images
            </h2>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-[#e59a38] dark:border-white/10">

              <ImagePlus
                size={35}
                className="text-[#e59a38]"
              />

              <p className="mt-3 text-sm font-semibold">
                Upload images
              </p>

              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG or JPEG
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="hidden"
              />

            </label>

            {images.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-3">

                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative overflow-hidden rounded-xl"
                  >

                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="h-28 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                    >
                      <X size={14} />
                    </button>

                  </div>
                ))}

              </div>
            )}

          </section>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e59a38] px-5 py-4 font-bold text-[#100704] disabled:opacity-50"
          >
            <Plus size={19} />

            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </div>

      </div>
    </form>
  );
};

export default AddProduct;