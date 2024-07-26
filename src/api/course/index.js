// src/api/apiCourse.js
import axiosInstance from "../axios";
import API_CONFIG from "../../configs/api_config";

const apiCourse = {
  getCourses: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.KHOAHOC}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  createCourse: async (courseData) => {
    try {
      const response = await axiosInstance.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.KHOAHOC}/create`,
        courseData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  updateCourse: async (MaKhoaHoc, courseData) => {
    try {
      const response = await axiosInstance.put(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.KHOAHOC}/${MaKhoaHoc}`,
        courseData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  deleteCourse: async (MaKhoaHoc) => {
    try {
      const response = await axiosInstance.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.KHOAHOC}/delete/${MaKhoaHoc}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },
};

export default apiCourse;
