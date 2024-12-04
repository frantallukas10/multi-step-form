import axios from 'axios';
import { FormConfig } from '../types/form';

const API_BASE_URL = 'https://65e86fa34bb72f0a9c4f544a.mockapi.io';

export const getFormConfig = async (): Promise<FormConfig[]> => {
  const response = await axios.get(`${API_BASE_URL}/form-config`);
  return response.data;
};

export const submitFormConfig = async (
  data: Record<string, unknown>,
): Promise<void> => {
  await axios.post(`${API_BASE_URL}/forms`, data);
};
