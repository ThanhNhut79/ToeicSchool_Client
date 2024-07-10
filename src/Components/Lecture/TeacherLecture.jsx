import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";
import apiTeacher from "../../api/teacher/index";

const TeacherLecture = ({ MaQuanLy }) => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const data = await apiTeacher.fetchLichHoc(MaQuanLy);
        if (data && Array.isArray(data)) {
          setLectures(data);
        } else {
          setLectures([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (MaQuanLy) {
      fetchLectures();
    } else {
      setError("MaQuanLy is required.");
      setLoading(false);
    }
  }, [MaQuanLy]);

  const handleViewDetails = (record) => {
    navigate(`/teacher-dashboard/lectures/class-details/${record.MaLopHoc}`);
  };

  const handleMarkAttendance = (record) => {
    navigate(`/teacher-dashboard/lectures/mark-attendance/${record.MaLopHoc}`);
  };

  const columns = [
    {
      title: "Class Code",
      dataIndex: "MaLopHoc",
      key: "MaLopHoc",
    },
    {
      title: "Current Number",
      dataIndex: "SoLuongHocVienHienTai",
      key: "SoLuongHocVienHienTai",
    },
    {
      title: "Start Day",
      dataIndex: "NgayBatDau",
      key: "NgayBatDau",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Expected End Date",
      dataIndex: "NgayDuKienKetThuc",
      key: "NgayDuKienKetThuc",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Total Lessons",
      dataIndex: "TongSoBuoiHoc",
      key: "TongSoBuoiHoc",
    },
    {
      title: "Class Time",
      dataIndex: "ThoiLuongHocTrenLop",
      key: "ThoiLuongHocTrenLop",
    },
    {
      title: "Weekly Class Schedule",
      dataIndex: "LichHocTrongTuan",
      key: "LichHocTrongTuan",
      render: (text) => text || "Planning...", // Xử lý trường hợp LichHocTrongTuan có thể là null
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button onClick={() => handleViewDetails(record)} type="primary" style={{ marginRight: 8 }}>
            View Details
          </Button>
          <Button onClick={() => handleMarkAttendance(record)} type="primary">
            Mark Attendance
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <div>
      <Table dataSource={lectures} columns={columns} rowKey="MaLopHoc" />
    </div>
  );
};

export default TeacherLecture;
