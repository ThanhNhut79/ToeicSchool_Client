import React, { useEffect, useState } from "react";
import "./Userprofile.css";
import axios from "axios";
import { useParams } from "react-router";
import apiUser from "../../api/user";

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiUser.fetchUserInfo(userId);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };
    const fetchDanhSachKhoaHocDaDangKy = async () => {
      setLoading(true); // Start loading

      try {
        const [khoahocdadangky, getAllKhoaHoc] = await Promise.all([
          apiUser.fetchDanhSachKhoaHocDaDangKy(userId),
          apiUser.fetchDanhSachKhoaHoc(),
        ]);
        if (khoahocdadangky && getAllKhoaHoc) {
          const rs = khoahocdadangky
            .map((a) => getAllKhoaHoc.find((b) => a.MaKhoaHoc === b.MaKhoaHoc))
            .filter(Boolean); // Remove undefined results

          console.log(rs);
          setDataKhoaHoc(rs);
        } else {
          setDataKhoaHoc([]);
        }
      } catch (error) {
        console.error("Error fetching data khoa hoc:", error);
        setDataKhoaHoc([]);
      } finally {
        setLoading(false); // End loading
      }
    };

    const isHaveUser = localStorage.getItem("loggedInUser");
    if (isHaveUser) {
      fetchUserInfo();
      fetchDanhSachKhoaHocDaDangKy();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const renderKhoaHocDaDangKy = () => {
    return dataKhoaHoc.map((item, index) => (
      <div key={index}>
        <img src={item.HinhAnh} alt={item.TenKhoaHoc} />
        <p>{item.TenKhoaHoc}</p>
      </div>
    ));
  };
  return (
    <div className="user-detail">
      <div className="detail-box">
        <h2>Thông tin học viên</h2>
        <div className="content-detail">
          <p>Mã học viên: {user.MaNguoiDung}</p>
          <p>Họ tên: {user.HoTen}</p>
          <p>Email: {user.Email}</p>
          <p>Số điện thoại: {user.SoDienThoai}</p>
          <p>Tên tài khoản: {user.TenTaiKhoan}</p>
        </div>
      </div>
      <div className="detail-box">
        <div className="">
          <h2>Khóa học đã đăng ký</h2>
          <div>{renderKhoaHocDaDangKy()}</div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
