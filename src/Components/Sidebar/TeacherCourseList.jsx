import React, { useEffect, useState } from "react";
import { List, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const TeacherCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get("https://api.example.com/teacher/courses")
  //     .then((response) => {
  //       setCourses(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the courses!", error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={courses}
          renderItem={course => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={`/teacher-dashboard/courses/${course.id}`}>{course.name}</Link>}
                description={course.description}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default TeacherCourseList;
