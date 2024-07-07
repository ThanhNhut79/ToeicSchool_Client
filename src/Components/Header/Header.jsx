import React, { useContext } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";

function Header() {
  const { cartItems } = useContext(CartContext);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/");
    });
  };

  const goToUserDetail = (id) => {
    navigate(`/user-profile/${id}`);
  };
  return (
    <div className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="logo">
            TOEIC SCHOOL
          </Link>
        </div>
        <div>
          <ul className="nav-links">
            <li>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/introduce"
              >
                Giới Thiệu
              </Link>
            </li>
            <li>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/course"
              >
                Khóa Học
              </Link>
            </li>
            <li>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/contact"
              >
                Liên Hệ
              </Link>
            </li>
          </ul>
        </div>
        <div className="auth-buttons">
          {loggedInUser && loggedInUser.MaNguoiDung ? (
            <>
              <div
                className="auth-button-login"
                onClick={() => goToUserDetail(loggedInUser.MaNguoiDung)}
              >
                <span>Xin chào, {loggedInUser.HoTen}</span>
              </div>
              <Link
                className="auth-button-login"
                onClick={() => {
                  handleLogout();
                }}
              >
                <span>Đăng xuất</span>
              </Link>
            </>
          ) : (
            <>
              <Link className="auth-button" to="/register">
                <span>Đăng ký</span>
              </Link>
              <Link className="auth-button" to="/login">
                <span>Đăng nhập</span>
              </Link>
            </>
          )}
        </div>
        <div className="cart-icon">
          <Link to="/cart">
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined
                style={{ fontSize: "24px", color: "#fff" }}
              />
            </Badge>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
