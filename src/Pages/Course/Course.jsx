import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./Course.css";
import { CartContext } from "../../Context/CartContext";

const { Meta } = Card;

const Course = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/khoahoc")
      .then((response) => {
        console.log(response.data.data); // Debugging
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const showDetail = (MaKhoaHoc) => {
    console.log(`Navigating to course with MaKhoaHoc: ${MaKhoaHoc}`); // Debugging
    navigate(`/course/${MaKhoaHoc}`);
  };

  return (
    <div className="course-list-container">
      <div className="course-list-title-container">
        <h2 className="course-list-title">Danh sách khóa học</h2>
      </div>
      <Row gutter={[16, 16]}>
        {courses.map((course) => (
          <Col key={course.MaKhoaHoc} span={8}>
            <Card
              className="course-card"
              hoverable
              cover={<img alt="example" src={course.HinhAnh} />}
              onClick={() => showDetail(course.MaKhoaHoc)}
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
    </div>
  );
};

export default Course;
