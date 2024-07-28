import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "antd";
import { useSelector } from "react-redux";
import "./RegistrationList.css"; // Ensure this file exists

const { Meta } = Card;

const RegistrationList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const MaNguoiDung = userInfo?.MaNguoiDung;
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/dangkyhoc/${MaNguoiDung}`)
      .then((response) => {
        setRegistrations(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the registrations!", error);
      });
  }, [MaNguoiDung]);

  const handlePayment = (registration) => {
    navigate("/payment", { state: { registration } });
  };

  return (
    <div className="registration-list-container">
        <div className="course-list-title-container">
        <h2 className="course-list-title">Registration List</h2>
      </div>
      
      <Row gutter={[16, 16]}>
        {registrations.map((registration) => (
          <Col key={registration.MaDangKy} span={8}>
            <Card hoverable>
              <Meta
                title={`Course ID: ${registration.MaKhoaHoc}`}
                description={
                  <>
                    <p><strong>Name:</strong> {registration.HoTen}</p>
                    <p><strong>Email:</strong> {registration.Email}</p>
                    <p><strong>Phone:</strong> {registration.SoDienThoai}</p>
                    <p><strong>Facility ID:</strong> {registration.MaCoSo}</p>
                    <p><strong>Payment Status:</strong> {registration.TrangThaiThanhToan === 0 ? "Not Paid" : "Paid"}</p>
                  </>
                }
              />
              {registration.TrangThaiThanhToan === 0 && (
                <Button
                  type="primary"
                  onClick={() => handlePayment(registration)}
                  style={{ marginTop: "20px" }}
                >
                  Pay Now
                </Button>
              )}
              {registration.TrangThaiThanhToan === 1 && (
                <Button
                  type="primary"
                  style={{ marginTop: "20px" }}
                  disabled
                >
                  Waiting for class to open
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RegistrationList;
