import React from "react";
import "./UProfile.css";

const UProfile = () => {
  const user = {
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    avatar: "https://via.placeholder.com/150",
  };

  const courses = [
    {
      id: 1,
      name: "Tiếng Anh Cơ Bản",
      startDate: "2023-01-10",
      endDate: "2023-03-10",
      status: "Đã hoàn thành",
    },
    {
      id: 2,
      name: "Tiếng Anh Giao Tiếp",
      startDate: "2023-04-15",
      endDate: "2023-06-15",
      status: "Đang học",
    },
  ];
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatar} alt="User Avatar" className="avatar" />
        <h2>{user.name}</h2>
      </div>
      <div className="profile-info">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {user.phone}
        </p>
      </div>
      <div className="courses-list">
        <h3>Khóa học đã đăng ký</h3>
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <h4>{course.name}</h4>
              <p>
                <strong>Ngày bắt đầu:</strong> {course.startDate}
              </p>
              <p>
                <strong>Ngày kết thúc:</strong> {course.endDate}
              </p>
              <p>
                <strong>Trạng thái:</strong> {course.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UProfile;
