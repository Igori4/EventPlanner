import { useState } from 'react';
import EventCard from './components/event-card/EventCard';
import Button from './components/button/Button';
import AddEventForm from './components/add-event-form/AddEventForm';
import css from './App.module.css';
import type { Event, DraftEvent } from './types/event';

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
    going: false,
  },
];

export default function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  // Другий, повністю незалежний стан
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleGoing = (id: string) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, going: !event.going } : event)));
  };

  const handleAddEvent = (draft: DraftEvent) => {
    const newEvent: Event = {
      ...draft,
      id: crypto.randomUUID(),
      isOnline: draft.location.toLowerCase() === 'online',
      going: false,
    };

    setEvents([newEvent, ...events]);
    setIsFormOpen(false);
  };

  const goingCount = events.filter((event) => event.going).length;

  return (
    <>
      <h1>Найближчі події</h1>

      <div className={css.toolbar}>
        <p>
          Йдете на {goingCount} з {events.length} подій
        </p>
        <Button
          variant="primary"
          text={isFormOpen ? 'Сховати форму' : '+ Додати подію'}
          onClick={() => setIsFormOpen(!isFormOpen)}
        />
      </div>

      {isFormOpen && <AddEventForm onAdd={handleAddEvent} />}

      <div className={css.cards}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onToggleGoing={handleToggleGoing} />
        ))}
      </div>
    </>
  );
}
