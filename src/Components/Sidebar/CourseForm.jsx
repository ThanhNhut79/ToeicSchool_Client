import React from "react";
import { Form, Input, InputNumber, Button, Modal, Upload, message } from "antd";
import { createCourse } from "../../Services/khoaHocService";
import { UploadOutlined } from "@ant-design/icons";

const CourseForm = ({ visible, onClose, onCourseCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (values.HinhAnh && values.HinhAnh.file) {
      formData.append("HinhAnh", values.HinhAnh.file.originFileObj);
    }

    try {
      await createCourse(formData);
      onCourseCreated();
      onClose();
    } catch (error) {
      message.error("Failed to create course: " + error.message);
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
          label="Tổng Số Buổi Học"
          rules={[
            { required: true, message: "Please enter the total sessions" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="ThoiLuongTrenLop"
          label="Thời Lượng Trên Lớp"
          rules={[
            {
              required: true,
              message: "Please enter the duration per session",
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="SiSoToiDa"
          label="Sĩ Số Tối Đa"
          rules={[
            { required: true, message: "Please enter the maximum class size" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="GiaThanh"
          label="Giá Thành"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="HinhAnh"
          label="Hình Ảnh"
          rules={[{ required: true, message: "Please upload an image" }]}
          valuePropName="file"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList[0])}
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Chọn Hình Ảnh</Button>
          </Upload>
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
