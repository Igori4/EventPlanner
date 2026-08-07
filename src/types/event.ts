export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  isOnline: boolean;
  description: string;
  going: boolean;
  category: string;
  level: string;
  tags: string[];
}

export interface DraftEvent {
  title: string;
  date: string;
  location: string;
  description: string;
  isOnline: boolean;
  category: string;
  level: string;
  tags: string[];
}
