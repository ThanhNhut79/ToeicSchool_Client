import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Row, Col, Card, Modal, Button } from "antd";
import "./Course.css";
import { CartContext } from "../../Context/CartContext";

const { Meta } = Card;

const Course = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/khoahoc")
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const showModal = (course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Thêm vào giỏ hàng
  const addToCart = () => {
    setCartItems((prevCartItems) => [...prevCartItems, selectedCourse]);
    setIsModalVisible(false); // Đóng Modal sau khi thêm vào giỏ hàng
  };

  return (
    <div className="course-list-container">
      <div className="course-list-title-container">
        <h2 className="course-list-title">Danh sách khóa học</h2>
      </div>
      <Row gutter={[16, 16]}>
        {courses.map((course, index) => (
          <Col key={index} span={8}>
            <Card
              className="course-card"
              hoverable
              cover={<img alt="example" src={course.image} />}
              onClick={() => showModal(course)}
            >
              <Meta
                className="course-card-meta"
                title={course.TenKhoaHoc}
                description={course.MoTa}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={selectedCourse?.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button key="addToCart" type="primary" onClick={addToCart}>
            Thêm vào giỏ hàng
          </Button>,
        ]}
        className="custom-modal"
      >
        {selectedCourse && (
          <div>
            <img src={selectedCourse.image} alt={selectedCourse.TenKhoaHoc} />
            <p>
              <strong>Mô tả:</strong> {selectedCourse.MoTa}
            </p>
            <p>
              <strong>Thời lượng trên lớp:</strong>{" "}
              {selectedCourse?.ThoiLuongTrenLop}
            </p>
            <p>
              <strong>Tổng số buổi học:</strong> {selectedCourse?.TongSoBuoiHoc}
            </p>
            <p>
              <strong>Sỉ số tối đa:</strong> {selectedCourse?.SiSoToiDa}
            </p>
            <p>
              <strong>Giá thành:</strong> {selectedCourse?.GiaThanh} VNĐ
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Course;
