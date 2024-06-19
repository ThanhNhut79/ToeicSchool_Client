import React, { useEffect, useState } from "react";
import { Table, Button, Spin, Popconfirm, message, Modal } from "antd";

import { deleteCourse, getCourses } from "../../Services/khoaHocService";
import CourseForm from "./CourseForm";
import EditCourseForm from "./EditCourseForm";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEditClick = (course) => {
    setEditingCourse(course);
  };
  const handleViewDetails = (record) => {
    setSelectedCourse(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleDeleteClick = async (courseId) => {
    setLoading(true);
    try {
      await deleteCourse(courseId);
      const data = await getCourses();
      setCourses(data);
      message.success("Course deleted successfully");
    } catch (error) {
      console.error("Failed to delete course:", error);
      message.error("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseUpdated = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCourseCreated = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Mã Khóa Học", dataIndex: "MaKhoaHoc", key: "MaKhoaHoc" },
    { title: "Tên Khóa Học", dataIndex: "TenKhoaHoc", key: "TenKhoaHoc" },
    { title: "Mô Tả", dataIndex: "MoTa", key: "MoTa" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <Button type="primary" onClick={() => handleEditClick(record)}>
            Edit
          </Button>
          <Button
            style={{ marginLeft: "8px" }}
            onClick={() => handleViewDetails(record)}
          >
            View Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setCreatingCourse(true)}>
        Create New Course
      </Button>
      <Spin spinning={loading}>
        <Table
          dataSource={courses}
          columns={columns}
          rowKey="MaKhoaHoc"
          pagination={{ pageSize: 10 }}
        />
      </Spin>
      <Modal
        title="Course Details"
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <p>
          <strong>Mã Khóa Học:</strong> {selectedCourse?.MaKhoaHoc}
        </p>
        <p>
          <strong>Tên Khóa Học:</strong> {selectedCourse?.TenKhoaHoc}
        </p>

        <p>
          <strong>Thời lượng trên lớp:</strong>{" "}
          {selectedCourse?.ThoiLuongTrenLop}
        </p>
        <p>
          <strong>Tổng số buổi học:</strong> {selectedCourse?.TongSoBuoiHoc}
        </p>
        <p>
          <strong>Sỉ số tối đa:</strong> {selectedCourse?.SiSoToiDa}
        </p>
        <p>
          <strong>Giá thành:</strong> {selectedCourse?.GiaThanh}
        </p>
        {/* Thêm thông tin chi tiết khác ở đây */}
      </Modal>
      {editingCourse && (
        <EditCourseForm
          visible={!!editingCourse}
          onClose={() => setEditingCourse(null)}
          course={editingCourse}
          onCourseUpdated={handleCourseUpdated}
        />
      )}
      {creatingCourse && (
        <CourseForm
          visible={creatingCourse}
          onClose={() => setCreatingCourse(false)}
          onCourseCreated={handleCourseCreated}
        />
      )}
    </>
  );
};

export default CourseList;
