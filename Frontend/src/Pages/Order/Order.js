import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/order/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (status === "loading")
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );

  if (status === "failed")
    return (
      <div className="text-center py-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="p-4">
              {/* Order Details */}
              <h2 className="text-lg font-semibold text-gray-800">
                Order ID: {order._id}
              </h2>
              <p className="text-gray-600">
                Total Amount: <span className="font-medium">₹{order.totalAmount}</span>
              </p>
              <p
                className={`text-sm mt-2 inline-block px-2 py-1 rounded ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Status: {order.status}
              </p>
              <button
                className="mt-4 text-blue-600 hover:underline text-sm"
                onClick={() => toggleExpand(order._id)}
              >
                {expandedOrder === order._id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {/* Expanded Order Details */}
            {expandedOrder === order._id && (
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Order Items:
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item.menuItemId._id}
                      className="flex justify-between border-b pb-2"
                    >
                      <span>Menu Item: {item.menuItemId.name || "N/A"}</span>
                      <span>Price: ₹{item.menuItemId.price || "N/A"}</span>
                      <span>Quantity: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  Order At:{" "}
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;