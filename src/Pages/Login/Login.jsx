import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { login } from "../../store/slice/auth";
import API_CONFIG from "../../configs/api_config";
import authService from "../../Services/auth";
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      let endpoint = isAdmin
        ? API_CONFIG.RESOURCES.QUANLY
        : API_CONFIG.RESOURCES.USER;
        const { accessToken, refreshToken, userInfo , role, success} = await authService.login(endpoint,{
          Email: email,
          MatKhau: password
        });
      if (success == true) {
        console.log(role);
        if (accessToken && refreshToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          dispatch(login({ accessToken, userInfo }));
          if (isAdmin) {
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
            navigate("/user-dashboard");
          }
        } else {
          alert("Đăng nhập không thành công");
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
