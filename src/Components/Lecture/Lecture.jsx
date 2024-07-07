import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";

const Lecture = () => {
  const [lectures, setLectures] = useState([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = () => {
    axios
      .get("http://localhost:5000/baigiang")
      .then((response) => {
        setLectures(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the lectures!", error);
      });
  };

  const columns = [
    { title: "Lecture ID", dataIndex: "MaBaiGiang", key: "MaBaiGiang" },
    { title: "Lecture", dataIndex: "TenBaiGiang", key: "TenBaiGiang" },
    { title: "Course ID", dataIndex: "MaKhoaHoc", key: "MaKhoaHoc" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span style={{ display: "flex" }}>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>{" "}
          <Button type="link" onClick={() => showDeleteConfirm(record)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleAddLecture = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post("http://localhost:5000/baigiang", values)
          .then(() => {
            message.success("Lecture added successfully");
            setVisibleAddModal(false);
            fetchLectures();
          })
          .catch((error) => {
            console.error("Error adding lecture:", error);
            message.error("Failed to add lecture");
          });
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleEditLecture = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .put(
            `http://localhost:5000/baigiang/${selectedLecture.MaBaiGiang}`,
            values
          )
          .then(() => {
            message.success("Lecture updated successfully");
            setVisibleEditModal(false);
            fetchLectures();
          })
          .catch((error) => {
            console.error("Error updating lecture:", error);
            message.error("Failed to update lecture");
          });
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleDeleteLecture = () => {
    axios
      .delete(`http://localhost:5000/baigiang/${selectedLecture.MaBaiGiang}`)
      .then(() => {
        message.success("Lecture deleted successfully");
        setVisibleDeleteConfirm(false);
        fetchLectures();
      })
      .catch((error) => {
        console.error("Error deleting lecture:", error);
        message.error("Failed to delete lecture");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisibleAddModal(false);
    setVisibleEditModal(false);
    setVisibleDeleteConfirm(false);
  };

  const handleEdit = (lecture) => {
    setSelectedLecture(lecture);
    form.setFieldsValue({
      TenBaiGiang: lecture.TenBaiGiang,
      MaKhoaHoc: lecture.MaKhoaHoc,
    });
    setVisibleEditModal(true);
  };

  const showDeleteConfirm = (lecture) => {
    setSelectedLecture(lecture);
    setVisibleDeleteConfirm(true);
  };

  return (
    <div>
      <h2>Lectures</h2>
      <Button type="primary" onClick={() => setVisibleAddModal(true)}>
        Add Lecture
      </Button>
      <Table dataSource={lectures} columns={columns} rowKey="MaBaiGiang" />

      {/* Add Lecture Modal */}
      <Modal
        title="Add Lecture"
        open={visibleAddModal}
        onOk={handleAddLecture}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="TenBaiGiang"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MaKhoaHoc"
            label="Course ID"
            rules={[{ required: true, message: "Please enter course ID" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Lecture Modal */}
      <Modal
        title="Edit Lecture"
        open={visibleEditModal}
        onOk={handleEditLecture}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="TenBaiGiang"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MaKhoaHoc"
            label="Course ID"
            rules={[{ required: true, message: "Please enter course ID" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Lecture Confirm Modal */}
      <Modal
        title="Delete Lecture"
        open={visibleDeleteConfirm}
        onOk={handleDeleteLecture}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this lecture?</p>
      </Modal>
    </div>
  );
};

export default Lecture;
