import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import apiCourse from "../../api/course/index.js"; // assuming the path to apiCourse
import axios from "axios";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await apiCourse.getCourses();
      setCourses(response);
    } catch (error) {
      console.error("There was an error fetching the courses!", error);
    }
  };

  const handleAddCourse = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      // Create a new FormData object
      const formData = new FormData();

      // Append form values to the FormData object
      formData.append("TenKhoaHoc", values.TenKhoaHoc);
      formData.append("MoTa", values.MoTa);
      formData.append("TongSoBuoiHoc", values.TongSoBuoiHoc);
      formData.append("ThoiLuongTrenLop", values.ThoiLuongTrenLop);
      formData.append("SiSoToiDa", values.SiSoToiDa);
      formData.append("GiaThanh", values.GiaThanh);
      formData.append("HinhAnh", values.HinhAnh[0].originFileObj);
      await apiCourse.createCourse(formData);
      message.success("Course added successfully");
      setVisibleAddModal(false);
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
      message.error("Failed to add course");
    }
  };

  const handleEditCourse = async () => {
    // try {
    //   const values = await form.validateFields();
    //   await apiCourse.updateCourse(selectedCourse.MaKhoaHoc, values);
    //   message.success("Course updated successfully");
    //   setVisibleEditModal(false);
    //   fetchCourses();
    // } catch (error) {
    //   console.error("Error updating course:", error);
    //   message.error("Failed to update course");
    // }
  };

  const handleDeleteCourse = async () => {
    try {
      await apiCourse.deleteCourse(selectedCourse.MaKhoaHoc);
      message.success("Course deleted successfully");
      setVisibleDeleteConfirm(false);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      message.error("Failed to delete course");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisibleAddModal(false);
    setVisibleEditModal(false);
    setVisibleDeleteConfirm(false);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    form.setFieldsValue(course);
    setVisibleEditModal(true);
  };

  const showDeleteConfirm = (course) => {
    setSelectedCourse(course);
    setVisibleDeleteConfirm(true);
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "MaKhoaHoc", key: "MaKhoaHoc" },
    { title: "Course Name", dataIndex: "TenKhoaHoc", key: "TenKhoaHoc" },
    { title: "Description", dataIndex: "MoTa", key: "MoTa" },
    {
      title: "Total Sessions",
      dataIndex: "TongSoBuoiHoc",
      key: "TongSoBuoiHoc",
    },
    {
      title: "Duration",
      dataIndex: "ThoiLuongTrenLop",
      key: "ThoiLuongTrenLop",
    },
    { title: "Max Students", dataIndex: "SiSoToiDa", key: "SiSoToiDa" },
    { title: "Price", dataIndex: "GiaThanh", key: "GiaThanh" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span style={{ display: "flex" }}>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => showDeleteConfirm(record)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];
  console.log("sdfdfwdf", form.getFieldValue());
  return (
    <div>
      <h2>Courses</h2>
      <Button type="primary" onClick={() => setVisibleAddModal(true)}>
        Add Course
      </Button>
      <Table dataSource={courses} columns={columns} rowKey="MaKhoaHoc" />

      {/* Add Course Modal */}
      <Modal
        title="Add Course"
        visible={visibleAddModal}
        onOk={handleAddCourse}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="TenKhoaHoc"
            label="Course Name"
            rules={[{ required: true, message: "Please enter course name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MoTa"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TongSoBuoiHoc"
            label="Total Sessions"
            rules={[{ required: true, message: "Please enter total sessions" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ThoiLuongTrenLop"
            label="Duration"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="SiSoToiDa"
            label="Max Students"
            rules={[{ required: true, message: "Please enter max students" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="GiaThanh"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="HinhAnh"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              name="HinhAnh"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Course Modal */}
      <Modal
        title="Edit Course"
        visible={visibleEditModal}
        onOk={handleEditCourse}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="TenKhoaHoc"
            label="Course Name"
            rules={[{ required: true, message: "Please enter course name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MoTa"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TongSoBuoiHoc"
            label="Total Sessions"
            rules={[{ required: true, message: "Please enter total sessions" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ThoiLuongTrenLop"
            label="Duration"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="SiSoToiDa"
            label="Max Students"
            rules={[{ required: true, message: "Please enter max students" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="GiaThanh"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="HinhAnh"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              name="HinhAnh"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item> */}
        </Form>
      </Modal>

      {/* Delete Course Confirm Modal */}
      <Modal
        title="Delete Course"
        visible={visibleDeleteConfirm}
        onOk={handleDeleteCourse}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this course?</p>
      </Modal>
    </div>
  );
};

export default Course;
