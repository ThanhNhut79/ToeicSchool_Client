import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
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
          <Link className="auth-button" to="/register">
            <span>Đăng ký</span>
          </Link>
          <Link className="auth-button" to="/login">
            <span>Đăng nhập</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
