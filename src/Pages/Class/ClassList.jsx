import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "antd";
import { useSelector } from "react-redux";
import "./ClassList.css"; 

const { Meta } = Card;

const ClassList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const MaNguoiDung = userInfo?.MaNguoiDung;
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/lophoc/hocvien/${MaNguoiDung}`)
      .then((response) => {
        setClasses(response.data.LopHocs);
      })
      .catch((error) => {
        console.error("There was an error fetching the classes!", error);
      });
  }, [MaNguoiDung]);

  const handleTest = (classId) => {
    navigate(`/midterm-test/${classId}`);
  };

  return (
    <div className="registration-list-container">
      <div className="course-list-title-container">
        <h2 className="course-list-title">Class List</h2>
      </div>
      <Row gutter={[16, 16]}>
        {classes.map((classItem) => (
          <Col key={classItem.MaLopHoc} span={8}>
            <Card hoverable>
              <Meta
                title={`Class ID: ${classItem.MaLopHoc}`}
                description={
                  <>
                    <p><strong>Start Date:</strong> {new Date(classItem.NgayBatDau).toLocaleDateString()}</p>
                    <p><strong>Expected End Date:</strong> {new Date(classItem.NgayDuKienKetThuc).toLocaleDateString()}</p>
                    <p><strong>Total Sessions:</strong> {classItem.TongSoBuoiHoc}</p>
                    <p><strong>In-class Duration:</strong> {classItem.ThoiLuongHocTrenLop}</p>
                    <p><strong>Current Student Count:</strong> {classItem.SoLuongHocVienHienTai}</p>
                    <Button 
                      type="primary" 
                      onClick={() => handleTest(classItem.MaLopHoc)}
                      style={{ marginTop: "10px" }}
                    >
                      Midterm Test
                    </Button>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ClassList;
