import axios from "axios";
import Teacher from "../interfaces/Teacher";

const BASE_URL = "http://localhost:5005/teacher";

export const createTeacher = async (teacherData: Teacher): Promise<Teacher> => {
  try {
    const response = await axios.post<Teacher>(
      `${BASE_URL}`,
      teacherData
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const response = await axios.get<Teacher[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getTeacherDetail = async (teacherId: string): Promise<Teacher> => {
  try {
    const response = await axios.get<Teacher>(
      `${BASE_URL}/${teacherId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateTeacher = async (
  teacherId: string,
  teacherData: Teacher
): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/${teacherId}`, teacherData);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const deleteTeacher = async (teacherId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${teacherId}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error: any): never => {
  console.error("API error occurred:", error);
  console.error("API response:", error.response);
  throw new Error("Internal server error");
};
