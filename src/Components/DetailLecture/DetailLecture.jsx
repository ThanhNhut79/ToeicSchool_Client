import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import apiDetailLecture from "../../api/DetailLecture/index.js";

const DetailLecture = () => {
  const [detailLectures, setDetailLectures] = useState([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);
  const [selectedDetailLecture, setSelectedDetailLecture] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDetailLectures();
  }, []);

  const fetchDetailLectures = async () => {
    try {
      const data = await apiDetailLecture.getDetailLectures();
      setDetailLectures(data);
    } catch (error) {
      console.error(
        "There was an error fetching the detailed lectures!",
        error
      );
    }
  };

  const handleAddDetailLecture = async () => {
    try {
      const values = await form.validateFields();
      await apiDetailLecture.createDetailLecture(values);
      message.success("Detailed lecture added successfully");
      setVisibleAddModal(false);
      fetchDetailLectures();
    } catch (error) {
      console.error("Error adding detailed lecture:", error);
      message.error("Failed to add detailed lecture");
    }
  };

  const handleEditDetailLecture = async () => {
    try {
      const values = await form.validateFields();
      await apiDetailLecture.updateDetailLecture(
        selectedDetailLecture.MaChiTiet,
        values
      );
      message.success("Detailed lecture updated successfully");
      setVisibleEditModal(false);
      fetchDetailLectures();
    } catch (error) {
      console.error("Error updating detailed lecture:", error);
      message.error("Failed to update detailed lecture");
    }
  };

  const handleDeleteDetailLecture = async () => {
    try {
      await apiDetailLecture.deleteDetailLecture(
        selectedDetailLecture.MaChiTiet
      );
      message.success("Detailed lecture deleted successfully");
      setVisibleDeleteConfirm(false);
      fetchDetailLectures();
    } catch (error) {
      console.error("Error deleting detailed lecture:", error);
      message.error("Failed to delete detailed lecture");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisibleAddModal(false);
    setVisibleEditModal(false);
    setVisibleDeleteConfirm(false);
  };

  const handleEdit = (detailLecture) => {
    setSelectedDetailLecture(detailLecture);
    form.setFieldsValue({
      MaBaiGiang: detailLecture.MaBaiGiang,
      TenNoiDung: detailLecture.TenNoiDung,
      NoiDung: detailLecture.NoiDung,
      TaiLieu: detailLecture.TaiLieu,
    });
    setVisibleEditModal(true);
  };

  const showDeleteConfirm = (detailLecture) => {
    setSelectedDetailLecture(detailLecture);
    setVisibleDeleteConfirm(true);
  };

  const columns = [
    { title: "Detail Lecture ID", dataIndex: "MaChiTiet", key: "MaChiTiet" },
    { title: "Lecture ID", dataIndex: "MaBaiGiang", key: "MaBaiGiang" },
    { title: "Title", dataIndex: "TenNoiDung", key: "TenNoiDung" },
    { title: "Content", dataIndex: "NoiDung", key: "NoiDung" },
    { title: "Material", dataIndex: "TaiLieu", key: "TaiLieu" },
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

  return (
    <div>
      <h2>Detailed Lectures</h2>
      <Button type="primary" onClick={() => setVisibleAddModal(true)}>
        Add Detailed Lecture
      </Button>
      <Table dataSource={detailLectures} columns={columns} rowKey="MaChiTiet" />

      {/* Add Detailed Lecture Modal */}
      <Modal
        title="Add Detailed Lecture"
        open={visibleAddModal}
        onOk={handleAddDetailLecture}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="MaBaiGiang"
            label="Lecture ID"
            rules={[{ required: true, message: "Please enter lecture ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TenNoiDung"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="NoiDung"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TaiLieu"
            label="Material"
            rules={[{ required: true, message: "Please enter material" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Detailed Lecture Modal */}
      <Modal
        title="Edit Detailed Lecture"
        open={visibleEditModal}
        onOk={handleEditDetailLecture}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="MaBaiGiang"
            label="Lecture ID"
            rules={[{ required: true, message: "Please enter lecture ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TenNoiDung"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="NoiDung"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TaiLieu"
            label="Material"
            rules={[{ required: true, message: "Please enter material" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Detailed Lecture Confirm Modal */}
      <Modal
        title="Delete Detailed Lecture"
        open={visibleDeleteConfirm}
        onOk={handleDeleteDetailLecture}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this detailed lecture?</p>
      </Modal>
    </div>
  );
};

export default DetailLecture;
