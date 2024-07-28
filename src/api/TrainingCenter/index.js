// src/api/apiTrainingCenter.js
import axiosInstance from "../axios";
import API_CONFIG from "../../configs/api_config";

const apiTrainingCenter = {
  getTrainingCenters: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TRAININGCENTER}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching training centers:", error);
      throw error;
    }
  },

  createTrainingCenter: async (trainingCenterData) => {
    try {
      const response = await axiosInstance.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TRAININGCENTER}/create`,
        trainingCenterData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating training center:", error);
      throw error;
    }
  },

  updateTrainingCenter: async (MaCoSo, trainingCenterData) => {
    try {
      const response = await axiosInstance.put(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TRAININGCENTER}/update/${MaCoSo}`,
        trainingCenterData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating training center:", error);
      throw error;
    }
  },

  deleteTrainingCenter: async (MaCoSo) => {
    try {
      const response = await axiosInstance.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TRAININGCENTER}/delete/${MaCoSo}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error deleting training center:", error);
      throw error;
    }
  },
};

export default apiTrainingCenter;
