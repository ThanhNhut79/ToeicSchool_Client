import React, { useContext } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Dropdown } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/auth";

function Header() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.userInfo);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    });
  };

  const goToUserDetail = (id) => {
    navigate(`/user-profile/${id}`);
  };
  const items = [
    {
      key: "1",
      label: (
        <span onClick={() => goToUserDetail(loggedInUser.MaNguoiDung)}>
          {loggedInUser && `${loggedInUser.HoTen}`}
        </span>
      ),
    },
    {
      key: "2",
      danger: true,
      label: (
        <span onClick={handleLogout} type="primary">
          Logout
        </span>
      ),
    },
  ];
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
        <div className="content-header">
          {" "}
          <div className="auth-buttons">
            {loggedInUser && loggedInUser.MaNguoiDung ? (
              <>
                {/* <div
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
              </Link> */}
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </a>
                </Dropdown>
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
        </div>
      </nav>
    </div>
  );
}

export default Header;
