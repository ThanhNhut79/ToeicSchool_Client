import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import apiTrainingCenter from "../../api/TrainingCenter/index.js";

const TrainingCenter = () => {
  const [trainingCenters, setTrainingCenters] = useState([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);
  const [selectedTrainingCenter, setSelectedTrainingCenter] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTrainingCenters();
  }, []);

  const fetchTrainingCenters = async () => {
    try {
      const data = await apiTrainingCenter.getTrainingCenters();
      setTrainingCenters(data);
    } catch (error) {
      console.error("There was an error fetching the training centers!", error);
    }
  };

  const handleAddTrainingCenter = async () => {
    try {
      const values = await form.validateFields();
      await apiTrainingCenter.createTrainingCenter(values);
      message.success("Training center added successfully");
      setVisibleAddModal(false);
      fetchTrainingCenters();
    } catch (error) {
      console.error("Error adding training center:", error);
      message.error("Failed to add training center");
    }
  };

  const handleEditTrainingCenter = async () => {
    try {
      const values = await form.validateFields();
      await apiTrainingCenter.updateTrainingCenter(
        selectedTrainingCenter.MaCoSo,
        values
      );
      message.success("Training center updated successfully");
      setVisibleEditModal(false);
      fetchTrainingCenters();
    } catch (error) {
      console.error("Error updating training center:", error);
      message.error("Failed to update training center");
    }
  };

  const handleDeleteTrainingCenter = async () => {
    try {
      await apiTrainingCenter.deleteTrainingCenter(
        selectedTrainingCenter.MaCoSo
      );
      message.success("Training center deleted successfully");
      setVisibleDeleteConfirm(false);
      fetchTrainingCenters();
    } catch (error) {
      console.error("Error deleting training center:", error);
      message.error("Failed to delete training center");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisibleAddModal(false);
    setVisibleEditModal(false);
    setVisibleDeleteConfirm(false);
  };

  const handleEdit = (trainingCenter) => {
    setSelectedTrainingCenter(trainingCenter);
    form.setFieldsValue({
      TenCoSo: trainingCenter.TenCoSo,
      DiaChi: trainingCenter.DiaChi,
    });
    setVisibleEditModal(true);
  };

  const showDeleteConfirm = (trainingCenter) => {
    setSelectedTrainingCenter(trainingCenter);
    setVisibleDeleteConfirm(true);
  };

  const columns = [
    { title: "Training Center ID", dataIndex: "MaCoSo", key: "MaCoSo" },
    { title: "Name", dataIndex: "TenCoSo", key: "TenCoSo" },
    { title: "Address", dataIndex: "DiaChi", key: "DiaChi" },
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
      <h2>Training Centers</h2>
      <Button type="primary" onClick={() => setVisibleAddModal(true)}>
        Add Training Center
      </Button>
      <Table dataSource={trainingCenters} columns={columns} rowKey="MaCoSo" />

      {/* Add Training Center Modal */}
      <Modal
        title="Add Training Center"
        open={visibleAddModal}
        onOk={handleAddTrainingCenter}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="TenCoSo"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="DiaChi"
            label="Address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Training Center Modal */}
      <Modal
        title="Edit Training Center"
        open={visibleEditModal}
        onOk={handleEditTrainingCenter}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="TenCoSo"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="DiaChi"
            label="Address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Training Center Confirm Modal */}
      <Modal
        title="Delete Training Center"
        open={visibleDeleteConfirm}
        onOk={handleDeleteTrainingCenter}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this training center?</p>
      </Modal>
    </div>
  );
};

export default TrainingCenter;
