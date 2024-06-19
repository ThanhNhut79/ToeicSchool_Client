import React, { useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";
import { updateCourse } from "../../Services/khoaHocService";

const EditCourseForm = ({ visible, onClose, course, onCourseUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (course) {
      form.setFieldsValue(course);
    }
  }, [course, form]);

  const onFinish = async (values) => {
    try {
      await updateCourse(course.MaKhoaHoc, values);
      onCourseUpdated();
      onClose();
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Course"
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
        <Form.Item
          name="TongSoBuoiHoc"
          label="Tổng số buổi học"
          rules={[{ required: true, message: "Please enter the course name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="SiSoToiDa"
          label="Sỉ số tối đac"
          rules={[{ required: true, message: "Please enter the course name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="GiaThanh"
          label="Giá thành"
          rules={[{ required: true, message: "Please enter the course name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ThoiLuongTrenLop"
          label="Thời lượng trên lớp"
          rules={[{ required: true, message: "Please enter the course name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCourseForm;
