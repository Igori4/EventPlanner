import { useState } from 'react';
import EventCard from './components/event-card/EventCard';
import Button from './components/button/Button';
import AddEventForm from './components/add-event-form/AddEventForm';
import EventSearchForm from './components/event-search-form/EventSearchForm';
import css from './App.module.css';
import { fetchEvents } from './services/eventService';
import type { Event, DraftEvent } from './types/event';

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  // Другий, повністю незалежний стан
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (title: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await fetchEvents(title);
      setEvents(data);
    } catch {
      setIsError(true);
    }
    setIsLoading(false);
  };

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

      <EventSearchForm onSearch={handleSearch} />

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

      {isLoading && <p>Завантажуємо події, зачекайте…</p>}
      {isError && <p>Ой, щось пішло не так! Спробуйте ще раз.</p>}

      <div className={css.cards}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onToggleGoing={handleToggleGoing} />
        ))}
      </div>
    </>
  );
}
