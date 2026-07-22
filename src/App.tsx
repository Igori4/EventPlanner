import EventCard from './components/EventCard';
import './App.css';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

const events: Event[] = [
  {
    id: 'id-1',
    title: 'React Meetup Lviv',
    date: '01.08.2026',
    location: 'Львів, Дорошенка 55',
  },
  {
    id: 'id-2',
    title: 'TypeScript Workshop',
    date: '15.08.2026',
    location: 'Online',
  },
  {
    id: 'id-3',
    title: 'Frontend Conf Kyiv',
    date: '20.09.2026',
    location: 'Київ, НСК Олімпійський',
  },
];

export default function App() {
  return (
    <>
      <h1>Найближчі події</h1>
      <div className="app-cards">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </>
  );
}
