import React, { useEffect, useState } from "react";
import { Table, Button, Spin, message, Modal } from "antd";
import { deleteCourse, getCourses } from "../../Services/khoaHocService";
import CourseForm from "./CourseForm";
import EditCourseForm from "./EditCourseForm";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

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

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteConfirmVisible(true);
  };

  const handleDeleteCourse = async () => {
    setLoading(true);
    try {
      await deleteCourse(courseToDelete.MaKhoaHoc);
      const data = await getCourses();
      setCourses(data);
      message.success("Course deleted successfully");
    } catch (error) {
      console.error("Failed to delete course:", error);
      message.error("Failed to delete course");
    } finally {
      setLoading(false);
      setDeleteConfirmVisible(false);
      setCourseToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
    setCourseToDelete(null);
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
            type="link"
            style={{ marginLeft: "8px" }}
            onClick={() => handleDeleteClick(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <h2>Courses</h2>
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
      <Modal
        title="Delete Course"
        visible={deleteConfirmVisible}
        onOk={handleDeleteCourse}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this course?</p>
      </Modal>
    </>
  );
};

export default CourseList;
