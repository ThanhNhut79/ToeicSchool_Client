import axiosInstance from "../axios";
import API_CONFIG from "../../configs/api_config";

const apiDetailLecture = {
  getDetailLectures: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.DETAIL_LECTURE}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching detailed lectures:", error);
      throw error;
    }
  },

  createDetailLecture: async (detailLectureData) => {
    try {
      const response = await axiosInstance.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.DETAIL_LECTURE}/create`,
        detailLectureData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating detailed lecture:", error);
      throw error;
    }
  },

  updateDetailLecture: async (MaChiTiet, detailLectureData) => {
    try {
      const response = await axiosInstance.put(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.DETAIL_LECTURE}/update/${MaChiTiet}`,
        detailLectureData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating detailed lecture:", error);
      throw error;
    }
  },

  deleteDetailLecture: async (MaChiTiet) => {
    try {
      const response = await axiosInstance.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.DETAIL_LECTURE}/delete/${MaChiTiet}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error deleting detailed lecture:", error);
      throw error;
    }
  },
};

export default apiDetailLecture;
