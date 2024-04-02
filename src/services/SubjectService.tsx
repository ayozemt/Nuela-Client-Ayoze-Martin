import axios from "axios";
import Subject from "../interfaces/Subject";

const BASE_URL = "http://localhost:5005/subject";

export const createSubject = async (
  subjectData: Subject,
  teacherId: string
): Promise<Subject> => {
  try {
    const response = await axios.post<Subject>(
      `${BASE_URL}/teacher/${teacherId}`,
      subjectData
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getSubjects = async (): Promise<Subject[]> => {
  try {
    const response = await axios.get<Subject[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getSubjectsByTeacher = async (
  teacherId: string
): Promise<Subject[]> => {
  try {
    const response = await axios.get<Subject[]>(
      `${BASE_URL}/teacher/${teacherId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getSubjectDetail = async (subjectId: string): Promise<Subject> => {
  try {
    const response = await axios.get<Subject>(`${BASE_URL}/${subjectId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateSubject = async (
  subjectId: string,
  subjectData: Subject
): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/${subjectId}`, subjectData);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const deleteSubject = async (subjectId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${subjectId}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error: any): never => {
  console.error("API error occurred:", error);
  throw new Error("Internal server error");
};
