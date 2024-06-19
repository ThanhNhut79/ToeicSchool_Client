import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { createCourse } from "../../Services/khoaHocService";

const CourseForm = ({ visible, onClose, onCourseCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await createCourse(values);
      onCourseCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create New Course"
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="MaKhoaHoc"
          label="Mã Khóa Học"
          rules={[{ required: true, message: "Please enter the course ID" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="TenKhoaHoc"
          label="Tên Khóa Học"
          rules={[{ required: true, message: "Please enter the course name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="MoTa"
          label="Mô Tả"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseForm;
