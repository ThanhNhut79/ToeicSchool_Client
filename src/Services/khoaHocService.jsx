import axios from "axios";

const API_URL = "http://localhost:5000/khoahoc";

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
};

export const updateCourse = async (courseId, updatedCourse) => {
  try {
    const response = await axios.put(`${API_URL}/${courseId}`, updatedCourse);
    return response.data.data;
  } catch (error) {
    console.error("Failed to update course:", error);
    throw error;
  }
};

export const createCourse = async (newCourse) => {
  try {
    const response = await axios.post(API_URL, newCourse);
    return response.data.data;
  } catch (error) {
    console.error("Failed to create course:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${API_URL}/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete course:", error);
    throw error;
  }
};
