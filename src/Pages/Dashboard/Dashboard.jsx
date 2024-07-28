import React, { useContext } from "react";
import { Layout, Menu, Button, Dropdown, Space, Avatar } from "antd";
import {
  UserOutlined,
  BookOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import User from "../../Components/User/User";
import Lecture from "../../Components/Lecture/Lecture";
import { AuthContext } from "../../Context/AuthContext";
import Course from "../../Components/CourseDashboard/Course";
import TrainingCenter from "../../Components/TrainingCenter/TrainingCenter";
import { useDispatch, useSelector } from "react-redux";
import DetailLecture from "../../Components/DetailLecture/DetailLecture";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.userInfo);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    });
  };
  const items = [
    {
      key: "1",
      label: <span>{loggedInUser && `${loggedInUser.HoTen}`}</span>,
    },
    {
      key: "2",
      danger: true,
      label: (
        <span onClick={handleLogout} type="primary">
          Logout
        </span>
      ),
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header3">
        <div className="logo3">ToeicSchool</div>
        <div className="admin-info">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          style={{ position: "fixed", height: "100vh", left: 0 }}
        >
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={["1"]}
          >
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
              <Link to="/dashboard/training-center">Training Center</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<VideoCameraOutlined />}>
              <Link to="/dashboard/detail-lectures">Detail Lectures</Link>
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
                <Route path="courses" element={<Course />} />
                <Route path="users" element={<User />} />
                <Route path="lectures" element={<Lecture />} />
                <Route
                  path="training-center"
                  element={
                    <div>
                      <TrainingCenter />
                    </div>
                  }
                />
                <Route
                  path="detail-lectures"
                  element={
                    <div>
                      <DetailLecture />
                    </div>
                  }
                />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
