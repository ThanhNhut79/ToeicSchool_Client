import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        if (response.data.role === "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/user");
        }
      }
    } catch (err) {
      setError("Invalid credentials");
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
                <input onChange={(e) => setEmail(e.target.value)} type="text" />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <label>Mật khẩu</label>
              </div>
              <div className="admin-check">
                <input type="checkbox" />
                <label>Giành cho giảng viên</label>
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
                  <Link to="/register">Đăng ký ngay</Link>
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
