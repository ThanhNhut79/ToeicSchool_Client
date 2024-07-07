import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>TOEIC SCHOOL</h2>
          <p>
            Trung tâm Anh ngữ ACADEMY là cơ sở chuyên giảng chương trình Tiếng
            Anh Thiếu niên; Luyện thi IELTS; Luyện thi TOEFL – TOEIC – Test
            Prep; Tiếng Anh Căn bản – Tiếng Anh Giao tiếp – Tiếng Anh dành cho
            người đi làm; Tiếng Anh Doanh nghiệp, Kỹ năng mềm bằng Tiếng Anh.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Links</h2>
          <ul>
            <li>
              <a href="#home">Trang chủ</a>
            </li>
            <li>
              <a href="#khoa-hoc">Khóa Học</a>
            </li>
            <li>
              <a href="#gioi-thieu">Giới Thiệu</a>
            </li>
            <li>
              <a href="#lien-he">Liên Hệ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: Toeicschool@gmail.com</p>
          <p>Phone: +123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 TOEIC SCHOOL English Center.| All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
