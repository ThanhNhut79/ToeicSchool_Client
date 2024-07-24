import axiosInstance from "../axios";
import API_CONFIG from "../../configs/api_config";

const apiUser = {
  fetchDanhSachKhoaHocDaDangKy: async (maUser) => {
    try {
      const response = await axiosInstance.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.DANGKYKHOAHOC}/${maUser}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching lesson schedule:", error);
      throw new Error("Failed to fetch lesson schedule");
    }
  },
  fetchUserInfo: async (maUser) => {
    try {
      const response = await axiosInstance.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.USER}/${maUser}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  },
  fetchDanhSachKhoaHoc: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.KHOAHOC}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching lesson schedule:", error);
      throw new Error("Failed to fetch lesson schedule");
    }
  },
};

export default apiUser;
