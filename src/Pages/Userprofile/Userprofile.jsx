import React, { useEffect, useState } from "react";
import "./Userprofile.css";
import axios from "axios";
import { useParams } from "react-router";
import apiUser from "../../api/user";
import { Pagination } from "antd";

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
      setLoading(true);

      try {
        const [khoahocdadangky, getAllKhoaHoc] = await Promise.all([
          apiUser.fetchDanhSachKhoaHocDaDangKy(userId),
          apiUser.fetchDanhSachKhoaHoc(),
        ]);
        if (khoahocdadangky && getAllKhoaHoc) {
          const rs = khoahocdadangky
            .map((a) => getAllKhoaHoc.find((b) => a.MaKhoaHoc === b.MaKhoaHoc))
            .filter(Boolean);

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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = dataKhoaHoc.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const renderKhoaHocDaDangKy = () => {
    return paginatedData.map((item, index) => (
      <div className="course-item" key={index}>
        <img src={item.HinhAnh} alt={item.TenKhoaHoc} />
        <p>{item.TenKhoaHoc}</p>
        <p>{item.ThoiLuongTrenLop}</p>
      </div>
    ));
  };
  return (
    <div className="user-detail">
      <div className="detail-box">
        <h2>Thông tin học viên</h2>
        <hr />
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
          <hr />
          <div className="courses-list">{renderKhoaHocDaDangKy()}</div>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={dataKhoaHoc.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
