import React from "react";
import "./Home.css";
import Course from "../Course/Course";

const Home = () => {
  return (
    <div className="homepage">
      <div className="banner">
        <img
          src="https://pasal.edu.vn/images/slideshow/2021/05/20/original/banner-trang-chu-3_1621482088.jpg"
          alt=""
        />
      </div>
      <div>
        <Course />
      </div>
    </div>
  );
};

export default Home;
