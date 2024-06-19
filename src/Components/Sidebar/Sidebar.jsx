import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  BookOutlined,
  ShopOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider collapsible collapsed={false}>
      <div className="logo" />
      <div>
        <h2 style={{ color: "white", textAlign: "center" }}>DASHBOARD</h2>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/Dashboard-courses">Courses</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
          <Link to="/Dashboard-users">Users</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShopOutlined />}>
          <Link to="/bases">Bases</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ReadOutlined />}>
          <Link to="/lectures">Lectures</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
