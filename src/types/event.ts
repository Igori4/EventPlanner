export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  isOnline: boolean;
  description: string;
  going: boolean;
}

export interface DraftEvent {
  title: string;
  date: string;
  location: string;
  description: string;
}
