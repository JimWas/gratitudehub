import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  async getMessages() {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  },

  async createMessage(message: { text: string; location: string }) {
    const response = await axios.post(`${API_URL}/messages`, message);
    return response.data;
  },

  async updateMessageStatus(id: string, status: 'approved' | 'rejected') {
    const response = await axios.patch(`${API_URL}/messages/${id}`, { status });
    return response.data;
  }
};