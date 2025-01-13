import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOders } from '../../store/order/orderSlice';


const Order = () => {
  const dispatch = useDispatch();

  // Get orders and loading state from the Redux store
  const data = useSelector((state) => state);
   console.log(data);
   const orders =[];
    const loading = false;
    const error = null;
  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(fetchOders());
  }, [dispatch]);

  return (
    <div>
      <h2>Order List</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    <p>
                      Menu Item ID: {item.menuItemId}, Quantity: {item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Order;