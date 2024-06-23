import React, { useEffect, useState } from "react";
import "./Userprofile.css";
import axios from "axios";

const Userprofile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${userId}`
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-info">
      <h2>Thông tin chi tiết người dùng</h2>
      <p>Mã người dùng: {user.MaNguoiDung}</p>
      <p>Họ tên: {user.HoTen}</p>
      <p>Email: {user.Email}</p>
      <p>Số điện thoại: {user.SoDienThoai}</p>
      <p>Tên tài khoản: {user.TenTaiKhoan}</p>
    </div>
  );
};

export default Userprofile;
