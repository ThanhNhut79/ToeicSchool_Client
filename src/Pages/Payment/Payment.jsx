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
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("visa");
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

  const handlePayment = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsVerificationVisible(true);
  };

  const handleVerification = async () => {
    try {
      const response = await axios.post("http://localhost:5000/webhook/", {
        registrationId: registration.MaDangKy,
        bank,
        cardNumber,
        cardHolder,
        expiryDate,
        verificationCode,
      });
      if (response.status === 200) {
        message.success("Payment successful!");
        setIsVerificationVisible(false);
        navigate("/registrations");
      } else {
        message.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      message.error("Payment failed. Please try again.");
    }
  };

  const resendCode = async () => {
    try {
      // Placeholder for resend code logic
      message.success("Verification code resent successfully!");
    } catch (error) {
      console.error("Error resending verification code:", error);
      message.error("Failed to resend verification code. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleVerificationCancel = () => {
    setIsVerificationVisible(false);
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
            <Select defaultValue="visa" onChange={setPaymentMethod}>
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
              <Option value="bank1">Viettinbank</Option>
              <Option value="bank2">Agribank</Option>
              <Option value="bank3">NamABank</Option>
              <Option value="bank4">VPBank</Option>
              <Option value="bank5">Vietcombank</Option>
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
        </Form>
      </Modal>
      <Modal
        title="Enter Verification Code"
        visible={isVerificationVisible}
        onOk={handleVerification}
        onCancel={handleVerificationCancel}
        footer={[
          <Button key="resend" onClick={resendCode}>
            Resend Code
          </Button>,
          <Button key="submit" type="primary" onClick={handleVerification}>
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Verification Code">
            <Input value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentForm;
