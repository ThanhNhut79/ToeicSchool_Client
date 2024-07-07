import React, { useEffect, useState } from "react";
import "./Userprofile.css";
import axios from "axios";
import { useParams } from "react-router";

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
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
    const fetchKhoaHocOfUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/khoahoc/${userId}`
        );
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching khoa hoc:", error);
        setLoading(false);
      }
    };
    const isHaveUser = localStorage.getItem("loggedInUser");
    if (isHaveUser) {
      fetchUserInfo();
      // fetchKhoaHocOfUser();
    }
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
