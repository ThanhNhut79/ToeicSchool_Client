// src/api/apiLecture.js
import axiosInstance from "../axios";
import API_CONFIG from "../../configs/api_config";

const apiLecture = {
  getLectures: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.BAIGIANG}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching lectures:", error);
      throw error;
    }
  },

  createLecture: async (lectureData) => {
    try {
      const response = await axiosInstance.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.BAIGIANG}/create`,
        lectureData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating lecture:", error);
      throw error;
    }
  },

  updateLecture: async (MaBaiGiang, lectureData) => {
    try {
      const response = await axiosInstance.put(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.BAIGIANG}/update/${MaBaiGiang}`,
        lectureData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating lecture:", error);
      throw error;
    }
  },

  deleteLecture: async (MaBaiGiang) => {
    try {
      const response = await axiosInstance.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.BAIGIANG}/delete/${MaBaiGiang}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error deleting lecture:", error);
      throw error;
    }
  },
};

export default apiLecture;
