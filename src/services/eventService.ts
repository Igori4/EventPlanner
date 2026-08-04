import axios from 'axios';
import type { Event } from '../types/event';

const BASE_URL = import.meta.env.VITE_API_URL;

export const PER_PAGE = 6;

export interface EventsPage {
  events: Event[];
  totalPages: number;
}

export const fetchEvents = async (topic: string, page: number): Promise<EventsPage> => {
  const filter = topic !== '' ? { title: topic } : {};

  const [pageResponse, allResponse] = await Promise.all([
    axios.get<Event[]>(`${BASE_URL}/events`, {
      params: { ...filter, page, limit: PER_PAGE },
    }),
    axios.get<Event[]>(`${BASE_URL}/events`, { params: filter }),
  ]);

  return {
    events: pageResponse.data,
    totalPages: Math.ceil(allResponse.data.length / PER_PAGE),
  };
};

export const fetchEventsByLocation = async (location: string): Promise<Event[]> => {
  const response = await axios.get<Event[]>(`${BASE_URL}/events`, {
    params: { location },
  });

  return response.data;
};
