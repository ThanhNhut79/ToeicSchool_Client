import axiosInstance from "../axios";
import API_CONFIG from "../../configs/api_config";

const apiUser = {
  getUserById: async () => {
    try {
      console.log(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.USER}`);
      const response = await axiosInstance.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.USER}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.USER}/register`,
        userData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  updateUser: async (MaNguoiDung, userData) => {
    try {
      const response = await axiosInstance.put(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.USER}/update/${MaNguoiDung}`,
        userData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (MaNguoiDung) => {
    try {
      const response = await axiosInstance.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.USER}/delete/${MaNguoiDung}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  login: async (loginData) => {
    try {
      const response = await axiosInstance.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.USER}/login`,
        loginData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  requestRefreshToken: async (refreshToken) => {
    try {
      const response = await axiosInstance.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.USER}/auth/refresh-token`,
        { refreshToken }
      );
      return response.data;
    } catch (error) {
      console.error("Error requesting refresh token:", error);
      throw new Error("Failed to request refresh token");
    }
  },
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
