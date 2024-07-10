import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiTeacher from '../../api/teacher/index';
import { Card, Spin, Alert } from 'antd';

const ClassDetails = () => {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const data = await apiTeacher.fetchClassDetails(classId);
        setClassDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <div>
      <Card title="Class Details">
        <p><strong>Class Code:</strong> {classDetails.MaLopHoc}</p>
        <p><strong>Course Code:</strong> {classDetails.MaKhoaHoc}</p>
        <p><strong>Facility Code:</strong> {classDetails.MaCoSo}</p>
        <p><strong>Course Name:</strong> {classDetails.TenKhoaHoc}</p>
        <p><strong>Start Date:</strong> {new Date(classDetails.NgayBatDau).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(classDetails.NgayDuKienKetThuc).toLocaleDateString()}</p>
        <p><strong>Total Lessons:</strong> {classDetails.TongSoBuoiHoc}</p>
        <p><strong>Lesson Duration:</strong> {classDetails.ThoiLuongHocTrenLop} hours</p>
        <p><strong>Weekly Schedule:</strong> {classDetails.LichHocTrongTuan || 'Not Available'}</p>
        <p><strong>Current Number of Students:</strong> {classDetails.SoLuongHocVienHienTai}</p>
        <p><strong>Facility Address:</strong> {classDetails.DiaChiCoSo}</p>
        <p><strong>Instructor:</strong> {classDetails.TenGiangVien}</p>
      </Card>
    </div>
  );
};

export default ClassDetails;
