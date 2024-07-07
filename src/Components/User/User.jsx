import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";

const User = () => {
  const [users, setUsers] = useState([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  };

  const columns = [
    { title: "ID", dataIndex: "MaNguoiDung", key: "MaNguoiDung" },
    { title: "Full Name", dataIndex: "HoTen", key: "HoTen" },
    { title: "Email", dataIndex: "Email", key: "Email" },
    { title: "Phone", dataIndex: "SoDienThoai", key: "SoDienThoai" },
    { title: "Username", dataIndex: "TenTaiKhoan", key: "TenTaiKhoan" },
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

  const handleAddUser = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post("http://localhost:5000/users/register", values)
          .then(() => {
            message.success("User added successfully");
            setVisibleAddModal(false);
            fetchUsers();
          })
          .catch((error) => {
            console.error("Error adding user:", error);
            message.error("Failed to add user");
          });
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleEditUser = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .put(
            `http://localhost:5000/users/update/${selectedUser.MaNguoiDung}`,
            values
          )
          .then(() => {
            message.success("User updated successfully");
            setVisibleEditModal(false);
            fetchUsers();
          })
          .catch((error) => {
            console.error("Error updating user:", error);
            message.error("Failed to update user");
          });
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:5000/users/delete/${selectedUser.MaNguoiDung}`)
      .then(() => {
        message.success("User deleted successfully");
        setVisibleDeleteConfirm(false);
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        message.error("Failed to delete user");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisibleAddModal(false);
    setVisibleEditModal(false);
    setVisibleDeleteConfirm(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setVisibleEditModal(true);
  };

  const showDeleteConfirm = (user) => {
    setSelectedUser(user);
    setVisibleDeleteConfirm(true);
  };

  return (
    <div>
      <h2>Users</h2>
      <Button type="primary" onClick={() => setVisibleAddModal(true)}>
        Add User
      </Button>
      <Table dataSource={users} columns={columns} rowKey="MaNguoiDung" />

      {/* Add User Modal */}
      <Modal
        title="Add User"
        visible={visibleAddModal}
        onOk={handleAddUser}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="HoTen"
            label="Full Name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="SoDienThoai"
            label="Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TenTaiKhoan"
            label="Username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MatKhau"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="NgaySinh"
            label="Date of Birth"
            rules={[{ required: true, message: "Please enter date of birth" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        visible={visibleEditModal}
        onOk={handleEditUser}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="HoTen"
            label="Full Name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="SoDienThoai"
            label="Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="TenTaiKhoan"
            label="Username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MatKhau"
            label="Password"
            rules={[{ required: false }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="NgaySinh"
            label="Date of Birth"
            rules={[{ required: true, message: "Please enter date of birth" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete User Confirm Modal */}
      <Modal
        title="Delete User"
        visible={visibleDeleteConfirm}
        onOk={handleDeleteUser}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default User;
