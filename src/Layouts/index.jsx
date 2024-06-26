import React from "react";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
