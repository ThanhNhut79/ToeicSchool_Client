import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiTeacher from '../../api/teacher/index';
import { Table, Button, Spin, Alert, Select } from 'antd';

const { Option } = Select;

const MarkAttendance = () => {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const [studentsData, lecturesData, attendanceData] = await Promise.all([
          apiTeacher.fetchStudentsForClass(classId),
          apiTeacher.fetchLecturesForClass(classId),
          apiTeacher.fetchAttendanceForClass(classId),
        ]);

        if (!attendanceData || !Array(attendanceData.data)) {
          throw new Error('Attendance data is empty or invalid');
        }

        setStudents(studentsData);
        setLectures(lecturesData);
        setAttendance(attendanceData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId]);

  const handleAttendanceChange = (studentId, lectureId, value) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((att) =>
        att.MaHocVien === studentId && att.MaBuoiHoc === lectureId
          ? { ...att, TrangThai: value }
          : att
      )
    );
  };

  const handleSaveAttendance = async () => {
    setLoading(true);
    try {
      await apiTeacher.updateAttendance(classId, attendance);
      alert('Attendance updated successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'MaNguoiDung',
      key: 'MaNguoiDung',
    },
    {
      title: 'Full Name',
      dataIndex: 'HoTen',
      key: 'HoTen',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    ...lectures.map((lecture) => ({
      title: (
      <div style={{color: '#888' }}>
         <div>Lecture</div>
        {new Date(lecture.NgayHoc).toLocaleDateString()}
      </div>),
      dataIndex: `attendance_${lecture.MaBuoiHoc}`,
      key: `attendance_${lecture.MaBuoiHoc}`,
      render: (_, record) => {
        const att = Array(attendance) ? attendance.find(
          (att) => att.MaHocVien === record.MaHocVien && att.MaBuoiHoc === lecture.MaBuoiHoc
        ) : null;
        return (
          <Select
            defaultValue={att ? att.TrangThai : 'Chưa điểm danh'}
            onChange={(value) =>
              handleAttendanceChange(record.MaHocVien, lecture.MaBuoiHoc, value)
            }
          >
            <Option value="Đúng giờ">Đúng giờ</Option>
            <Option value="Muộn">Muộn</Option>
            <Option value="Vắng có phép">Vắng có phép</Option>
            <Option value="Vắng không phép">Vắng không phép</Option>
            <Option value="Chưa điểm danh">Chưa điểm danh</Option>
          </Select>
        );
      },
    })),
  ];

  const dataSource = students.map((student) => {
    const attendanceData = {};
    lectures.forEach((lecture) => {
      const att = Array.isArray(attendance) ? attendance.find(
        (att) => att.MaHocVien === student.MaHocVien && att.MaBuoiHoc === lecture.MaBuoiHoc
      ) : null;
      attendanceData[`attendance_${lecture.MaBuoiHoc}`] = att ? att.TrangThai : '';
    });
    return { ...student, ...attendanceData };
  });

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey="MaNguoiDung" />
      <Button onClick={handleSaveAttendance} type="primary" style={{ marginTop: 16 }}>
        Save Attendance
      </Button>
    </div>
  );
};

export default MarkAttendance;
