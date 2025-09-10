import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UploadProducts = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { auth, authFetch } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = await new FormData(e.target);
    setErrorMessage("");
    if (!imageFile) setErrorMessage("Please select an image file");

    formData.set("image", imageFile);

    // const data = {
    //   name: formData.get("name"),
    //   price: formData.get("price"),
    //   category: formData.get("category"),
    //   description: formData.get("description"),
    //   image: imageFile,
    // };
    //
    // const formData = new FormData();
    //
    // for (const key in data) {
    //   if (product[key] !== undefined && product[key] !== null) {
    //     formData.set(key, product[key]);
    //   }
    // }

    try {
      const res = await authFetch("http://localhost:3000/api/products", {
        body: formData,
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw {
          status: res.status,
          message: data.msg,
          at: "upload product",
        };
      }

      navigate(`/partner/profile/${auth.partner._id}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  return (
    <div className="min-h-screen w-full dark:text-white flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 p-3 sm:p-4 lg:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
      <div className="relative w-full max-w-xs sm:max-w-sm">
        <div className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-gray-200/20 dark:border-white/10 rounded-xl shadow-xl shadow-gray-500/10 dark:shadow-black/20 p-5 sm:p-6">
          <div className="mb-4">
            <h1 className={`text-2xl font-bold`}>Upload Products</h1>
            <p className={`text-sm opacity-60`}>Upload your product here</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter product name"
                  className={`w-full bg-gray-50/50 dark:bg-neutral-800/50 px-3 py-2.5 border border-gray-200 dark:border-neutral-700 rounded outline-none focus:dark:border-white focus:border-gray-400`}
                />
              </div>
              <div>
                <label htmlFor="price" className="text-sm">
                  Price
                </label>
                <input
                  type="number"
                  required
                  id="price"
                  name="price"
                  autoComplete="price"
                  placeholder="Enter price in $"
                  className={`w-full bg-gray-50/50 dark:bg-neutral-800/50 px-3 py-2.5 border border-gray-200 dark:border-neutral-700 rounded outline-none focus:dark:border-white focus:border-gray-400`}
                />
              </div>

              <div>
                <label htmlFor="category" className="text-sm">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full bg-gray-50/50 dark:bg-neutral-800/80 px-3 py-2.5 border border-gray-200 dark:border-neutral-700 rounded outline-none focus:dark:border-white focus:border-gray-400"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="food">Food</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="text-sm">
                  Description
                </label>
                <textarea
                  rows="3"
                  required
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  className={`w-full bg-gray-50/50 dark:bg-neutral-800/50 px-3 py-2.5 border border-gray-200 dark:border-neutral-700 rounded outline-none focus:dark:border-white focus:border-gray-400`}
                />
              </div>
              <div>
                <label htmlFor="image" className="tex-sm">
                  Product Image
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`mt-2 flex items-center justify-center border-2 border-dashed rounded-md px-4 py-10 transition-colors ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                      : "border-gray-300 dark:border-neutral-700"
                  }`}
                >
                  <label
                    htmlFor="imageUpload"
                    className="text-center text-sm opacity-70 cursor-pointer"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="preview"
                        className="max-h-40 rounded-md object-contain"
                      />
                    ) : (
                      <>
                        Drag & Drop or{" "}
                        <span className="text-indigo-500 underline">
                          click to upload
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          id="imageUpload"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300"
                >
                  {uploading ? "Submitting..." : "Submit"}
                </button>
              </div>
              {errorMessage && (
                <p
                  className={`text-red-500 text-sm text-center ${uploading ? "disabled" : ""}`}
                >
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProducts;
