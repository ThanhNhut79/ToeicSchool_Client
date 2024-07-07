import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  BookOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import User from "../../Components/User/User";
import CourseList from "../../Components/Sidebar/CourseList";
import Lecture from "../../Components/Lecture/Lecture";
import { AuthContext } from "../../Context/AuthContext";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    });
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header3">
        <div className="logo3">ToeicSchool</div>
        <div className="admin-info">
          <span>Welcome{loggedInUser && `, ${loggedInUser.HoTen}`}</span>

          <Button onClick={handleLogout} type="primary">
            Logout
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          style={{ position: "fixed", height: "100vh", left: 0 }}
        >
          <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
            <Menu.Item key="1" icon={<BookOutlined />}>
              <Link to="/dashboard/courses">Courses</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/dashboard/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <Link to="/dashboard/lectures">Lectures</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<EnvironmentOutlined />}>
              <Link to="/dashboard/school">School</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Routes>
                <Route path="courses" element={<CourseList />} />
                <Route path="users" element={<User />} />
                <Route path="lectures" element={<Lecture />} />
                <Route path="school" element={<div>School Page</div>} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
