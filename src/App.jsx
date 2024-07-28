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
import Teacher from "./Pages/Teacher/Teacher";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/slice/auth";
import { useEffect } from "react";
import authService from "./Services/auth";
import PaymentForm from "./Pages/Payment/Payment";
import ClassList from "./Pages/Class/ClassList";
import MidtermTest from "./Pages/MidtermTest/MidtermTest";
import RegistrationList from "./Pages/RegistrationList/RegistrationList";
import ContactPage from "./Pages/Contact/Contact";
function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    const checkUser = localStorage.getItem("loggedInUser");
    if (checkUser) {
      const { accessToken, userInfo, role } = JSON.parse(checkUser);
      dispatch(login({ accessToken, userInfo, role }));
    }
  }, []);
  useEffect(() => {
    const renewAccessToken = async () => {
      if (isLogin === false) {
        if (localStorage.getItem("refreshToken")) {
          try {
            const { accessToken, userInfo } =
              await authService.renewAccessToken(
                localStorage.getItem("refreshToken")
              );
            dispatch(login({ accessToken, userInfo }));
          } catch (error) {
            console.error("Error renewing access token:", error);
          }
        }
      }
    };

    renewAccessToken();
  }, [dispatch, isLogin]);
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
              <Route path="/payment" element={<PaymentForm />} />
              <Route path="/classes" element={<ClassList />} />
              <Route path="/midterm-test/:classId" element={<MidtermTest />} />
              <Route path="/registrations" element={<RegistrationList />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/teacher-dashboard/*" element={<Teacher />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
