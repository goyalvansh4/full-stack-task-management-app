import React, { useState } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../../store/cart/cartSlice';  // Import actions
import Swal from 'sweetalert2';
import axios from 'axios';

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Calculate total price of cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle placing the order
  const placeOrder = async () => {
    setLoading(true);
    try {
      // Sending cart items to backend (you should replace the URL with your actual API endpoint)
      const response = await axios.post('/api/orders', { items: cart });
      
      if (response.status === 200) {
        Swal.fire("Success!", "Your order has been placed successfully!", "success");
        // Clear the cart (You can use a Redux action to clear the cart)
        dispatch(clearCart());
      }
    } catch (error) {
      Swal.fire("Error", "There was an issue placing your order. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>
      
      <div className="space-y-4">
        {cart?.map((item) => (
          <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Item Info */}
            <div className="flex items-center">
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center">
              <button
                className="text-gray-600 p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                onClick={() => dispatch(decreaseQuantity(item._id))}
              >
                <FaMinus />
              </button>
              <span className="mx-4 text-lg font-semibold">{item.quantity}</span>
              <button
                className="text-gray-600 p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                onClick={() => dispatch(increaseQuantity(item._id))}
              >
                <FaPlus />
              </button>
            </div>

            {/* Total Price */}
            <div className="flex items-center">
              <span className="text-lg font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
              <button
                className="ml-4 text-red-500 hover:text-red-600"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total */}
      <div className="flex justify-between items-center mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Total</h3>
        <span className="text-lg font-semibold">₹{calculateTotal().toFixed(2)}</span>
      </div>

      {/* Place Order Button */}
      <div className="mt-6 flex justify-center">
        <button
          className={`bg-blue-600 text-white py-3 px-6 rounded-lg text-xl font-semibold shadow-md hover:bg-blue-700 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={placeOrder}
          disabled={loading || cart.length === 0}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Cart;