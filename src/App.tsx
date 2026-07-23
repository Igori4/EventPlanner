import { useState } from 'react';
import EventCard from './components/event-card/EventCard';
import css from './App.module.css';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  isOnline: boolean;
  description: string;
  going: boolean;
}

const initialEvents: Event[] = [
  {
    id: 'id-1',
    title: 'React Meetup Lviv',
    date: '01.08.2026',
    location: 'Львів, Дорошенка 55',
    isOnline: false,
    description:
      'Щомісячна зустріч React-спільноти Львова: доповіді, нетворкінг і піца. Цього разу говоримо про Server Components.',
    going: false,
  },
  {
    id: 'id-2',
    title: 'TypeScript Workshop',
    date: '15.08.2026',
    location: 'Online',
    isOnline: true,
    description:
      'Практичний воркшоп із просунутих типів TypeScript для React-розробників. Дженерики, utility types, type guards.',
    going: false,
  },
  {
    id: 'id-3',
    title: 'Frontend Conf Kyiv',
    date: '20.09.2026',
    location: 'Київ, НСК Олімпійський',
    isOnline: false,
    description:
      'Найбільша фронтенд-конференція року: три сцени, воркшопи та афтепаті для учасників.',
    going: true,
  },
];

export default function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const handleToggleGoing = (id: string) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, going: !event.going } : event)));
  };

  const goingCount = events.filter((event) => event.going).length;

  return (
    <>
      <h1>Найближчі події</h1>
      <p>
        Йдете на {goingCount} з {events.length} подій
      </p>
      <div className={css.cards}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onToggleGoing={handleToggleGoing} />
        ))}
      </div>
    </>
  );
}
