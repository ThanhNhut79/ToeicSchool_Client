import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, message, Modal, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const PaymentForm = () => {
  const location = useLocation();
  const { registration } = location.state;
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bank, setBank] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [coursePrice, setCoursePrice] = useState("");

  useEffect(() => {
    const fetchCoursePrice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/khoahoc/${registration.MaKhoaHoc}`);
        setCoursePrice(response.data.data.GiaThanh);
      } catch (error) {
        console.error("There was an error fetching the course price!", error);
      }
    };

    fetchCoursePrice();
  }, [registration.MaKhoaHoc]);

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/payment", { clientSecret: registration.clientSecret });
      if (response.status === 200) {
        message.success("Payment successful!");
        navigate("/");
      } else {
        message.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      message.error("Payment failed. Please try again.");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const response = await axios.post("http://localhost:3000/webhook/", {
        registrationId: registration.MaDangKy,
        bank,
        cardNumber,
        cardHolder,
        expiryDate,
        verificationCode,
      });
      if (response.status === 200) {
        message.success("Payment successful!");
        setIsModalVisible(false);
        navigate("/");
      } else {
        message.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      message.error("Payment failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="payment-form-container">
      <Card title="Payment Form">
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input value={registration.HoTen} disabled />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={registration.Email} disabled />
          </Form.Item>
          <Form.Item label="Phone">
            <Input value={registration.SoDienThoai} disabled />
          </Form.Item>
          <Form.Item label="Course ID">
            <Input value={registration.MaKhoaHoc} disabled />
          </Form.Item>
          <Form.Item label="Facility ID">
            <Input value={registration.MaCoSo} disabled />
          </Form.Item>
          <Form.Item label="Price">
            <Input value={`${coursePrice} VNĐ`} disabled />
          </Form.Item>
          <Form.Item label="Payment Method">
            <Select defaultValue="visa" onChange={showModal}>
              <Option value="visa">Visa</Option>
              <Option value="mastercard">Mastercard</Option>
            </Select>
          </Form.Item>
          <Button type="primary" onClick={handlePayment}>
            Pay Now
          </Button>
        </Form>
      </Card>
      <Modal title="Visa Payment" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Bank">
            <Select onChange={(value) => setBank(value)}>
              <Option value="bank1">Bank 1</Option>
              <Option value="bank2">Bank 2</Option>
              <Option value="bank3">Bank 3</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Card Number">
            <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </Form.Item>
          <Form.Item label="Cardholder Name">
            <Input value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
          </Form.Item>
          <Form.Item label="Expiry Date">
            <Input value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="MM/YY" />
          </Form.Item>
          <Form.Item label="Verification Code">
            <Input value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentForm;
