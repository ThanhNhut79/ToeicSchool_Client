import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    HoTen: "",
    Email: "",
    MatKhau: "",
    XacNhanMatKhau: "",
    SoDienThoai: "",
    TenTaiKhoan: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.HoTen.trim()) {
      newErrors.HoTen = "Họ và tên là bắt buộc";
    }

    if (!formData.Email.trim()) {
      newErrors.Email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = "Email không hợp lệ";
    }

    if (!formData.MatKhau.trim()) {
      newErrors.MatKhau = "Mật khẩu là bắt buộc";
    }

    if (!formData.XacNhanMatKhau.trim()) {
      newErrors.XacNhanMatKhau = "Xác nhận mật khẩu là bắt buộc";
    } else if (formData.MatKhau !== formData.XacNhanMatKhau) {
      newErrors.XacNhanMatKhau = "Mật khẩu và Xác nhận mật khẩu không khớp";
    }

    if (!formData.SoDienThoai.trim()) {
      newErrors.SoDienThoai = "Số điện thoại là bắt buộc";
    } else if (!/^\d{9,11}$/.test(formData.SoDienThoai)) {
      newErrors.SoDienThoai = "Số điện thoại không hợp lệ";
    }

    if (!formData.TenTaiKhoan.trim()) {
      newErrors.TenTaiKhoan = "Tên tài khoản là bắt buộc";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/users/register",
          {
            HoTen: formData.HoTen,
            Email: formData.Email,
            MatKhau: formData.MatKhau,
            SoDienThoai: formData.SoDienThoai,
            TenTaiKhoan: formData.TenTaiKhoan,
          }
        );
        console.log("User registered:", response.data);
        alert("Đăng ký thành công!");
        navigate("/login");
      } catch (error) {
        console.error("Failed to register:", error);
        alert("Đăng ký thất bại. Vui lòng thử lại sau.");
      }
    }
  };
  return (
    <div className="register-page">
      <div className="register-box">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Đăng ký</h2>
          <div className="form-group">
            <label htmlFor="HoTen">Họ và tên: </label>
            <input
              type="text"
              id="HoTen"
              name="HoTen"
              value={formData.HoTen}
              onChange={handleChange}
              required
            />
            {errors.HoTen && <p className="error-message">{errors.HoTen}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
            {errors.Email && <p className="error-message">{errors.Email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="MatKhau">Mật khẩu:</label>
            <input
              type="password"
              id="MatKhau"
              name="MatKhau"
              value={formData.MatKhau}
              onChange={handleChange}
              required
            />
            {errors.MatKhau && (
              <p className="error-message">{errors.MatKhau}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="XacNhanMatKhau">Xác nhận mật khẩu:</label>
            <input
              type="password"
              id="XacNhanMatKhau"
              name="XacNhanMatKhau"
              value={formData.XacNhanMatKhau}
              onChange={handleChange}
              required
            />
            {errors.XacNhanMatKhau && (
              <p className="error-message">{errors.XacNhanMatKhau}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="SoDienThoai">Số điện thoại:</label>
            <input
              type="tel"
              id="SoDienThoai"
              name="SoDienThoai"
              value={formData.SoDienThoai}
              onChange={handleChange}
              required
            />
            {errors.SoDienThoai && (
              <p className="error-message">{errors.SoDienThoai}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="TenTaiKhoan">Tên tài khoản:</label>
            <input
              type="text"
              id="TenTaiKhoan"
              name="TenTaiKhoan"
              value={formData.TenTaiKhoan}
              onChange={handleChange}
              required
            />
            {errors.TenTaiKhoan && (
              <p className="error-message">{errors.TenTaiKhoan}</p>
            )}
          </div>
          <button type="submit">Đăng Ký</button>
          <div className="form-links">
            <a href="/login" className="form-link">
              Đăng nhập ngay?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
