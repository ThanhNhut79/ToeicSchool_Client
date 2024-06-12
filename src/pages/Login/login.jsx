import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (username === "admins" && password === "admins") {
      onLogin("Admin");
    } else if (username === "giangviens" && password === "giangviens") {
      onLogin("Giangvien");
    } else if (username === "users" && password === "users") {
      onLogin("nguoidung");
    }
  };
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="wrapper">
            <div className="form-box login">
              <h2>Đăng nhập</h2>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <label>Mật khẩu</label>
              </div>
              <button onClick={handleLogin} className="btn-login">
                Xác nhận
              </button>
              {error && (
                <h3 className="text-red-500 text-sm ">
                  Tài khoản hoặc mật khẩu không đúng
                </h3>
              )}
              <div className="login-register">
                <p>Bạn chưa có tài khoản? </p>
                <a className="register-link">
                  {/* <Link to="/register">Register</Link> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
