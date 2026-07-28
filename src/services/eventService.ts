import axios from 'axios';
import type { Event } from '../types/event';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchEvents = async (title: string): Promise<Event[]> => {
  const response = await axios.get<Event[]>(`${BASE_URL}/events`, {
    params: { title },
  });

  return response.data;
};
