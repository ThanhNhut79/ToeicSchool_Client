import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Layout from "./Layouts";
import Home from "./Pages/Home/Home";
import Introduce from "./Pages/Introduce/Introduce";
import Dashboard from "./Pages/Dashboard/DashboardCourse";

import Course from "./Pages/Course/Course";
import Cart from "./Pages/Cart/Cart";
import { CartProvider } from "./Context/CartContext";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/introduce" element={<Introduce />} />
            <Route path="/course" element={<Course />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Dashboard-Courses" element={<Dashboard />} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
