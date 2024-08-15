import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const CategoryComponent = () => {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/category/all", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Check if the token is present and correct

      if (editingCategory) {
        const response = await axiosInstance.patch(
          `/api/category/update/${editingCategory._id}`,
          newCategory,
          {
            headers: {
                Authorization: `Bearer ${token}`
            }
          }
        );
        toast.success(response.data.msg);
        setEditingCategory(null);
      } else {
        const response = await axiosInstance.post(
          "/api/category/create",
          newCategory,
          {
            headers: {
               Authorization: `Bearer ${token}`
            }
          }
        );
        toast.success(response.data.msg);
      }
      setNewCategory({ name: "", description: "" });
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  const handleEdit = (category) => {
    setNewCategory({ name: category.name, description: category.description });
    setEditingCategory(category);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(
        `/api/category/delete/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      toast.success(response.data.msg);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto p-8 bg-beige">
        <div className="flex space-x-8">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="w-1/2 p-8 bg-white rounded-lg shadow-lg"
          >
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>

          {/* Category List Section */}
          <div className="w-1/2 bg-white rounded-lg shadow-lg overflow-y-auto" style={{ maxHeight: "480px" }}>
            <h2 className="text-xl font-semibold mb-4 p-4 border-b border-gray-300 text-gray-800">
              Category List
            </h2>
            <ul className="divide-y divide-gray-200">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li
                    key={category._id}
                    className="flex justify-between items-center p-4 hover:bg-gray-100"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <div className="p-4 text-gray-500">No categories available</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;