import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, Row, Col, message, Select } from "antd";
import { useSelector } from "react-redux";
import "./CourseDetail.css";

const { Meta } = Card;
const { Option } = Select;

const CourseDetail = () => {
  const { MaKhoaHoc } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [course, setCourse] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    if (MaKhoaHoc) {
      axios
        .get(`http://localhost:5000/khoahoc/${MaKhoaHoc}`)
        .then((response) => {
          setCourse(response.data.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the course details!", error);
        });
    }
  }, [MaKhoaHoc]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cosodaotao")
      .then((response) => {
        setFacilities(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the facilities!", error);
      });
  }, []);

  const handleRegister = () => {
    if (!selectedFacility) {
      message.warning("Please select a facility!");
      return;
    }

    const registrationData = {
      MaKhoaHoc: parseInt(MaKhoaHoc, 10),
      HoTen: userInfo.HoTen,
      Email: userInfo.Email,
      SoDienThoai: userInfo.SoDienThoai,
      MaCoSo: selectedFacility,
      MaNguoiDung: userInfo.MaNguoiDung,
    };

    axios
      .post("http://localhost:5000/dangkyhoc/payment", registrationData)
      .then((response) => {
        if (response.status === 200) {
          message.success("Registration successful!");
        } else {
          message.error("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        message.error("Registration failed. Please try again.");
      });
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
                    <strong>Description:</strong> {course.MoTa}
                  </p>
                  <p>
                    <strong>Class Duration:</strong> {course.ThoiLuongTrenLop}
                  </p>
                  <p>
                    <strong>Total Sessions:</strong> {course.TongSoBuoiHoc}
                  </p>
                  <p>
                    <strong>Max Students:</strong> {course.SiSoToiDa}
                  </p>
                  <p>
                    <strong>Price:</strong> {course.GiaThanh} VNĐ
                  </p>
                </>
              }
            />
            <Select
              placeholder="Select a facility"
              style={{ width: "100%", marginTop: "20px" }}
              onChange={(value) => setSelectedFacility(value)}
            >
              {facilities.map((facility) => (
                <Option key={facility.MaCoSo} value={facility.MaCoSo}>
                  {facility.TenCoSo}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={handleRegister}
              style={{ marginTop: "20px" }}
            >
              Register for Course
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetail;
