import React from "react";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import emailjs from "emailjs-com";

const { Title, Paragraph } = Typography;

const ContactPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { name, email, message: userMessage } = values;
    const templateParams = {
      from_name: name,
      from_email: email,
      message: userMessage,
    };

    emailjs
      .send(
        "service_wcvksja", // Thay thế bằng Service ID của bạn
        "template_r26tmkx", // Thay thế bằng Template ID của bạn
        templateParams,
        "55BKigo6VF9zI0Y86" // Thay thế bằng API Key của bạn
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        message.success("Thông tin của bạn đã được gửi thành công!");
        form.resetFields(); // Reset form sau khi gửi
      })
      .catch((error) => {
        console.log("FAILED...", error);
        message.error("Có lỗi xảy ra khi gửi thông tin của bạn.");
      });
  };

  return (
    <Row justify="center" style={{ padding: "50px 0" }}>
      <Col xs={24} sm={18} md={12}>
        <Title level={2}>Liên hệ chúng tôi</Title>
        <Paragraph>
          Nếu bạn có bất kỳ câu hỏi nào, vui lòng điền vào biểu mẫu dưới đây và
          chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
        </Paragraph>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên của bạn!" },
            ]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Nội dung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập nội dung liên hệ" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ContactPage;
