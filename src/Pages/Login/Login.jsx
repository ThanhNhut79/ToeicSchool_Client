import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      let endpoint = isAdmin
        ? "http://localhost:5000/quanly/login"
        : "http://localhost:5000/users/login";

      const response = await axios.post(endpoint, {
        Email: email,
        MatKhau: password,
      });

      if (response.data.success === true) {
        setLoggedInUser(response.data.user);
        if (isAdmin) {
          const { role } = response.data;
          switch (role) {
            case "Admin":
              navigate("/admin-dashboard");
              break;
            case "GiangVien":
              navigate("/GiangVien-dashboard");
              break;
            default:
              setError(true);
              break;
          }
        } else {
          navigate("/");
        }
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
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
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
              />
              <label>Mật khẩu</label>
            </div>
            <div className="admin-check">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
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
              <Link to="/register" className="register-link">
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
