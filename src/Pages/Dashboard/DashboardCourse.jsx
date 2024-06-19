import React from "react";
import { Layout } from "antd";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CourseList from "../../Components/Sidebar/CourseList";
import CourseForm from "../../Components/Sidebar/CourseForm";

const { Content } = Layout;

const Dashboard = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sidebar />
    <Layout className="site-layout">
      <Content style={{ margin: "0 16px" }}>
        <div style={{ padding: 24, minHeight: 360 }}>
          <CourseForm />
          <CourseList />
        </div>
      </Content>
    </Layout>
  </Layout>
);

export default Dashboard;
