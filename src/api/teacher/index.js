import axiosInstance from "../axios";
import API_CONFIG from "../../configs/api_config";

const apiTeacher = {
    fetchTeacherById: async (MaQuanLy) => {
        try {
            const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TEACHER}/${MaQuanLy}`);
            return response.data.teacher;
        } catch (error) {
            console.error('Error fetching teacher:', error);
            throw new Error('Failed to fetch teacher');
        }
    },
    updateTeacher: async (MaQuanLy, Data) => {
        try {
            const response = await axiosInstance.put(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TEACHER}/update/${MaQuanLy}`, Data);
            return response.data.teacher;
        } catch (error) {
            console.error('Error updating teacher:', error);
            throw new Error('Failed to update teacher');
        }
    },
    requestRefreshToken: async (refreshToken) => {
        try {
            const response = await axiosInstance.post(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TEACHER}/auth/refresh-token`, { refreshToken });
            return response.data;
        } catch (error) {
            console.error('Error requesting refresh token:', error);
            throw new Error('Failed to request refresh token');
        }
    },
    fetchLichHoc: async (MaQuanLy) => {
        try {
            const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TEACHER}/lichhoc/${MaQuanLy}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching lesson schedule:', error);
            throw new Error('Failed to fetch lesson schedule');
        }
    },
    fetchStudentsForClass: async (classId) => {
        try {
            const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.HOCVIEN}/lophoc/${classId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching students for class:', error);
            throw new Error('Failed to fetch students for class');
        }
    },
    fetchLecturesForClass : async (classId) => {
        try {
            const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.TEACHER}/lophoc/buoihoc/${classId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching lectures for class:', error);
            throw new Error('Failed to fetch lectures for class');
        }
    },
    fetchAttendanceForClass : async (classId) => {
        try {
            const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.DIEMDANH}/${classId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching attendance for class:', error);
            throw new Error('Failed to fetch attendance for class');
        }
    },
    updateAttendance : async (classId, attendance) => {
        try {
            const response = await axiosInstance.put(`${API_CONFIG.BASE_URL}${API_CONFIG.RESOURCES.DIEMDANH}/${classId}`, attendance);
            return response.data.data;
        } catch (error) {
            console.error('Error updating attendance:', error);
            throw new Error('Failed to update attendance');
        }
    }
};

export default apiTeacher;
