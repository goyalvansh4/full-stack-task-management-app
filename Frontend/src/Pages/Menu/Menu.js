import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaShoppingCart } from "react-icons/fa";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchMenuItems,
  addMenuItem,
  updateMenuItem,
  removeMenuItem,
  setMenuItems,
  editMenuItems,
  deleteMenuItems,
} from "../../store/menu/menuSlice";
import { addToCart } from "../../store/cart/cartSlice";

Modal.setAppElement("#root"); // Required for accessibility

const Menu = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    availability: true,
    description: "",
  });

  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.items);
  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  // Open modal for create or update
  const openModal = (item = null) => {
    setCurrentItem(item);
    setForm(
      item || {
        name: "",
        category: "",
        price: "",
        availability: true,
      }
    );
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => setModalIsOpen(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  // Save new or updated item
  const saveItem = async () => {
    if (!form.name || !form.price) {
      Swal.fire("Error", "Please fill in the required fields!", "error");
      return;
    }

    if (currentItem) {
      // Update existing items
     dispatch(editMenuItems(currentItem._id,form));
     dispatch(updateMenuItem({ id: currentItem._id, data: form }));
    Swal.fire("Updated!", "Menu item updated successfully.", "success");
    } else {
      // Create new item
      const newItem = { ...form, price: parseFloat(form.price) };
      const res = await dispatch(setMenuItems(newItem));
      if (res.payload.status === "success") {
        dispatch(addMenuItem(res.payload.menuItem));
      }
      Swal.fire("Created!", "New menu item added.", "success");
    }

    closeModal();
  };

  // Delete item
  const deleteItem = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteMenuItems(id));
        dispatch(removeMenuItem(id));
        Swal.fire("Deleted!", "Menu item has been deleted.", "success");
      }
    });
  };

  // Add to Cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    Swal.fire(
      "Added to Cart",
      `${item.name} has been added to your cart!`,
      "success"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Menu Management</h1>

      {/* Add Button */}
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-colors duration-300 mb-6"
        onClick={() => openModal()}
      >
        <FaPlus className="inline mr-2" /> Add Item
      </button>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {menu.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
            <p className="text-gray-500 mt-2">
              <strong>Category:</strong> {item.category}
            </p>
            <p className="text-gray-500">
              <strong>Price:</strong> ₹{item.price.toFixed(2)}
            </p>
            <p className="text-gray-500">
              <strong>Available:</strong> {item.availability ? "Yes" : "No"}
            </p>
            <p className="text-gray-500 mt-2">{item.description}</p>
            <div className="flex justify-center gap-4 mt-4">
              {/* Add to Cart Icon */}
              <FaShoppingCart
                className="text-green-500 cursor-pointer hover:text-green-600"
                onClick={() => handleAddToCart(item)}
                title="Add to Cart"
              />

              {/* Edit Icon */}
              <FaEdit
                className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                onClick={() => openModal(item)}
                title="Edit Item"
              />

              {/* Delete Icon */}
              <FaTrash
                className="text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => deleteItem(item._id)}
                title="Delete Item"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Menu Modal"
        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {currentItem ? "Edit Item" : "Add New Item"}
        </h2>
        <form>
          <label className="block mb-2">
            Name: <span className="text-red-500">*</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>
          <label className="block mb-2">
            Category:
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>
          <label className="block mb-2">
            Price: <span className="text-red-500">*</span>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </label>
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              name="availability"
              checked={form.availability}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Available
          </label>
        </form>
        <div className="flex justify-end gap-4">
          <button
            onClick={saveItem}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
