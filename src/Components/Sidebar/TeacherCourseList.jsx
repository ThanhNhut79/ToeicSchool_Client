import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Row, Col, Card, Button, Modal, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./TeacherCourseList.css";
import { CartContext } from "../../Context/CartContext";

const { Meta } = Card;
const { Title } = Typography;

const TeacherCourseList = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [lectureDetails, setLectureDetails] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/khoahoc");
        const coursesData = response.data.data;
        setCourses(coursesData);
      } catch (error) {
        console.error("There was an error fetching the courses!", error);
      }
    };

    fetchCourses();
  }, []);

  const fetchLectureDetails = async (lectureId) => {
    try {
      const response = await axios.get(`http://localhost:5000/chitietbaigiang/${lectureId}`);
      return response.data.data;
    } catch (error) {
      console.error("There was an error fetching the lecture details!", error);
      return [];
    }
  };

  const fetchLecturesAndDetails = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:5000/baigiang/${courseId}`);
      const lecturesData = response.data.data;
      setLectures(lecturesData);

      // Fetch details for each lecture
      const detailsPromises = lecturesData.map((lecture) => fetchLectureDetails(lecture.MaBaiGiang));
      const detailsArray = await Promise.all(detailsPromises);
      const allDetails = detailsArray.flat();

      // Organize lecture details by lecture ID
      const groupedDetails = allDetails.reduce((acc, detail) => {
        if (!acc[detail.MaBaiGiang]) {
          acc[detail.MaBaiGiang] = [];
        }
        acc[detail.MaBaiGiang].push(detail);
        return acc;
      }, {});

      setLectureDetails(groupedDetails);
    } catch (error) {
      console.error("There was an error fetching the lectures and details!", error);
    }
  };

  const showCourseDetails = (course) => {
    setSelectedCourse(course);
    fetchLecturesAndDetails(course.MaKhoaHoc);
    setIsModalVisible(true);  // Only open the modal on user interaction
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCourse(null);
  };

  const downloadMaterials = (course) => {
    const url = course.TaiLieuURL;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `materials_${course.MaKhoaHoc}.zip`);
    document.body.appendChild(link);
    link.click();
  };

  const lectureColumns = [
    { title: 'Lecture Name', dataIndex: 'TenBaiGiang', key: 'TenBaiGiang' },
  ];

  const detailColumns = [
    { title: 'Content Name', dataIndex: 'TenNoiDung', key: 'TenNoiDung' },
    { title: 'Content', dataIndex: 'NoiDung', key: 'NoiDung' },
    { title: 'Material', dataIndex: 'TaiLieu', key: 'TaiLieu' },
  ];

  return (
    <div className="teacher-course-list-container">
      <div className="teacher-course-list-title-container">
        <h2 className="teacher-course-list-title">Course List</h2>
      </div>
      <Row gutter={[16, 16]}>
        {courses.map((course) => (
          <Col key={course.MaKhoaHoc} span={8}>
            <Card
              className="teacher-course-card"
              hoverable
              cover={<img alt="example" src={course.HinhAnh} />}
            >
              <Meta
                className="teacher-course-card-meta"
                title={course.TenKhoaHoc}
                description={course.MoTa}
              />
              <div className="teacher-course-card-actions">
                <Button
                  type="default"
                  onClick={() => showCourseDetails(course)}
                >
                  View Details
                </Button>
                <Button
                  type="default"
                  onClick={() => downloadMaterials(course)}
                >
                  Download Materials
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={`Course Details: ${selectedCourse?.TenKhoaHoc}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedCourse && (
          <div>
            <Title level={4}>Lecture List:</Title>
            <p>Here is a detailed overview of the lectures and their content for the selected course.</p>
            {lectures.map(lecture => (
              <div key={lecture.MaBaiGiang}>
                <h3>{lecture.TenBaiGiang}</h3>
                <Table
                  dataSource={lectureDetails[lecture.MaBaiGiang] || []}
                  columns={detailColumns}
                  rowKey="MaChiTiet"
                  pagination={false}
                />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TeacherCourseList;
