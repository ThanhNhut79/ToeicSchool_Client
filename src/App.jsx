import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Layout from "./Layouts";
import Home from "./Pages/Home/Home";
import Introduce from "./Pages/Introduce/Introduce";

import Course from "./Pages/Course/Course";
import Cart from "./Pages/Cart/Cart";
import { CartProvider } from "./Context/CartContext";
import Login from "./Pages/Login/Login";
import { AuthProvider } from "./Context/AuthContext";
import Userprofile from "./Pages/Userprofile/Userprofile";
import CourseDetail from "./Pages/CourseDetail/CourseDetail";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/user-profile/:userId" element={<Userprofile />} />
              <Route path="/introduce" element={<Introduce />} />
              <Route path="/course" element={<Course />} />
              <Route path="/course/:MaKhoaHoc" element={<CourseDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
