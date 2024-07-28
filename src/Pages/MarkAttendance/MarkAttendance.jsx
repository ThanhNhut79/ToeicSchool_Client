import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiTeacher from '../../api/teacher/index';
import { Table, Button, Spin, Alert, Select, Input, InputNumber, Typography } from 'antd';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;
const { Title, Text } = Typography;

const MarkAttendance = () => {
  const { classId } = useParams();

  const [students, setStudents] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState({});
  const [trainingCenter, setTrainingCenter] = useState({});

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const [studentsData, lecturesData, attendanceData, courseData, centerData] = await Promise.all([
          apiTeacher.fetchStudentsForClass(classId),
          apiTeacher.fetchLecturesForClass(classId),
          apiTeacher.fetchAttendanceForClass(classId),
          apiTeacher.fetchCourseByClassId(classId),
          apiTeacher.fetchTrainingCenterByClassId(classId),
        ]);

        if (!Array.isArray(attendanceData)) {
          throw new Error('Attendance data is empty or invalid');
        }

        setStudents(studentsData);
        setLectures(lecturesData);
        setAttendance(attendanceData);
        setCourse(courseData);
        setTrainingCenter(centerData);
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

  const handleFeedbackChange = (studentId, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.MaHocVien === studentId ? { ...student, NhanXet: value } : student
      )
    );
  };

  const handleScoreChange = (studentId, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.MaHocVien === studentId ? { ...student, DiemSo: value } : student
      )
    );
  };

  const handleSaveAttendance = async () => {
    setLoading(true);
    try {
      await apiTeacher.updateAttendance(classId, attendance);
      await apiTeacher.updateFeedbackAndScore(classId, students);
      alert('Attendance and feedback updated successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getOptionClass = (value) => {
    switch (value) {
      case 'Đúng giờ':
        return 'option-green';
      case 'Muộn':
        return 'option-orange';
      case 'Vắng có phép':
        return 'option-blue';
      case 'Vắng không phép':
        return 'option-red';
      case 'Chưa điểm danh':
        return 'option-gray';
      default:
        return '';
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
    {
      title: 'Feedback',
      dataIndex: 'NhanXet',
      key: 'NhanXet',
      render: (_, record) => (
        <TextArea
        className="input-feedback"
          value={record.NhanXet}
          onChange={(e) => handleFeedbackChange(record.MaHocVien, e.target.value)}
        />
      ),
    },
    {
      title: 'Score',
      dataIndex: 'DiemSo',
      key: 'DiemSo',
      render: (_, record) => (
        <InputNumber
        className="input-score"
          value={record.DiemSo}
          min={0}
          max={100}
          onChange={(value) => handleScoreChange(record.MaHocVien, value)}
        />
      ),
    },
    ...lectures.map((lecture) => {
      const isFuture = moment(lecture.NgayHoc).isAfter(moment(), 'day');
      return {
        title: (
          <div className={isFuture ? 'disabled-column' : ''}>
            <div>Lecture Date:</div>
            <div>{moment(lecture.NgayHoc).format('DD/MM/YYYY')}</div>
          </div>
        ),
        dataIndex: `attendance_${lecture.MaBuoiHoc}`,
        key: `attendance_${lecture.MaBuoiHoc}`,
        render: (_, record) => {
          const att = attendance.find(
            (att) => att.MaHocVien === record.MaHocVien && att.MaBuoiHoc === lecture.MaBuoiHoc
          );
          const isPast = moment(lecture.NgayHoc).isBefore(moment(), 'day');
          return (
            <Select
              value={att ? att.TrangThai : 'Chưa điểm danh'}
              onChange={(value) =>
                isPast ? handleAttendanceChange(record.MaHocVien, lecture.MaBuoiHoc, value) : null
              }
              disabled={!isPast}
              className="select-width"
            >
              {isPast && (
                <Option value="Chưa điểm danh" className={getOptionClass('Chưa điểm danh')}>
                  Chưa điểm danh
                </Option>
              )}
              <Option value="Đúng giờ" className={getOptionClass('Đúng giờ')}>
                Đúng giờ
              </Option>
              <Option value="Muộn" className={getOptionClass('Muộn')}>
                Muộn
              </Option>
              <Option value="Vắng có phép" className={getOptionClass('Vắng có phép')}>
                Vắng có phép
              </Option>
              <Option value="Vắng không phép" className={getOptionClass('Vắng không phép')}>
                Vắng không phép
              </Option>
            </Select>
          );
        },
      };
    }),
  ];

  const dataSource = students.map((student) => {
    const attendanceData = {};
    lectures.forEach((lecture) => {
      const att = attendance.find(
        (att) => att.MaHocVien === student.MaHocVien && att.MaBuoiHoc === lecture.MaBuoiHoc
      );
      attendanceData[`attendance_${lecture.MaBuoiHoc}`] = att ? att.TrangThai : 'Chưa điểm danh';
    });
    return { 
      ...student, 
      ...attendanceData, 
      NhanXet: student.NhanXet || '', 
      DiemSo: student.DiemSo || 0 
    };
  });

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <div>
      <Title level={3}>MaLopHoc: {classId}</Title>
      <div style={{ marginBottom: 5 }}>
        <Text strong>Training Center: </Text>
        <Text>{trainingCenter.TenKhoaHoc}</Text>
        <Text> - </Text>
        <Text strong>Facility name: </Text>
        <Text>{course.TenCoSo}</Text>
      </div>
      <Table dataSource={dataSource} columns={columns} rowKey="MaNguoiDung" />
      <Button onClick={handleSaveAttendance} type="primary" style={{ marginTop: 16, width: '150px' }}>
        Save Attendance
      </Button>
    </div>
  );
};

export default MarkAttendance;