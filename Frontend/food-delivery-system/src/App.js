import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Private/PrivateRoute";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Menu from "./Pages/Menu/Menu";
import Order from "./Pages/Order/Order";
import Cart from "./Pages/Cart/Cart";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Menu />} /> {/* Default to Menu */}
            <Route path="order" element={<Order />} />
            <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
