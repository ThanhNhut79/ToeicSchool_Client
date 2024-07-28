import React, { useContext } from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  BookOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import TeacherCourseList from "../../Components/Sidebar/TeacherCourseList";
import TeacherLecture from "../../Components/Lecture/TeacherLecture";
import { AuthContext } from "../../Context/AuthContext";
import { useSelector } from 'react-redux'; 
import CourseDetails from "../CourseDetail/CourseDetail";
import MarkAttendance from "../MarkAttendance/MarkAttendance";

const { Header, Content, Sider } = Layout;

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const dispatch = 'useDispatch'();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
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
        <span onClick={handleLogout}>
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
              <Link to="/teacher-dashboard/courses">Courses</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/teacher-dashboard/lectures">Lectures</Link>
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
                <Route path="courses" element={<TeacherCourseList />} />
                <Route path="lectures" element={<TeacherLecture MaQuanLy={userInfo?.MaQuanLy} />} />
                <Route path="lectures/course-details/:courseId/:facilityId" element={<CourseDetails />} />
                <Route path="lectures/mark-attendance/:classId" element={<MarkAttendance />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TeacherDashboard;
