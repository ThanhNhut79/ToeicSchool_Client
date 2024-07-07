import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, Row, Col } from "antd";
import "./CourseDetail.css";
import { CartContext } from "../../Context/CartContext";

const { Meta } = Card;

const CourseDetail = () => {
  const { MaKhoaHoc } = useParams();
  console.log(`Course MaKhoaHoc from URL: ${MaKhoaHoc}`); // Debugging
  const { cartItems, setCartItems } = useContext(CartContext);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (MaKhoaHoc) {
      axios
        .get(`http://localhost:5000/khoahoc/${MaKhoaHoc}`)
        .then((response) => {
          setCourse(response.data.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the course details!",
            error
          );
        });
    }
  }, [MaKhoaHoc]);

  const addToCart = () => {
    setCartItems((prevCartItems) => [...prevCartItems, course]);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-detail-container">
      <Row justify="center">
        <Col span={12}>
          <Card cover={<img src={course.HinhAnh} alt={course.TenKhoaHoc} />}>
            <Meta
              title={<h2>{course.TenKhoaHoc}</h2>}
              description={
                <>
                  <p>
                    <strong>Mô tả:</strong> {course.MoTa}
                  </p>
                  <p>
                    <strong>Thời lượng trên lớp:</strong>{" "}
                    {course.ThoiLuongTrenLop}
                  </p>
                  <p>
                    <strong>Tổng số buổi học:</strong> {course.TongSoBuoiHoc}
                  </p>
                  <p>
                    <strong>Sỉ số tối đa:</strong> {course.SiSoToiDa}
                  </p>
                  <p>
                    <strong>Giá thành:</strong> {course.GiaThanh} VNĐ
                  </p>
                </>
              }
            />
            <Button
              type="primary"
              onClick={addToCart}
              style={{ marginTop: "20px" }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetail;
