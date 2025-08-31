import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});


const handleError = (error: any) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data.message || 'Something went wrong');
  } else if (error.request) {
    console.error('No response from server:', error.request);
    throw new Error('No response from server. Please try again later.');
  } else {
    console.error('Error setting up request:', error.message);
    throw new Error('Error setting up request. Please try again.');
  }
};

// Complaint API calls
export const createComplaint = async (complaintData: any) => {
  try {
    const response = await api.post('/complaints', complaintData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getComplaints = async () => {
  try {
    const response = await api.get('/complaints');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateComplaint = async (id: string, updateData: any) => {
  try {
    const response = await api.patch(`/complaints/${id}`, updateData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteComplaint = async (id: string) => {
  try {
    const response = await api.delete(`/complaints/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
