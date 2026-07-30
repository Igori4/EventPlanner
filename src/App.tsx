import { useState, useEffect } from 'react';
import EventCard from './components/event-card/EventCard';
import Button from './components/button/Button';
import AddEventForm from './components/add-event-form/AddEventForm';
import EventSearchForm from './components/event-search-form/EventSearchForm';
import Modal from './components/modal/Modal';
import css from './App.module.css';
import { fetchEvents } from './services/eventService';
import type { Event, DraftEvent } from './types/event';

const TOPIC_STORAGE_KEY = 'event-planner-topic';

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [topic, setTopic] = useState(() => {
    const saved = localStorage.getItem(TOPIC_STORAGE_KEY);
    return saved !== null ? (JSON.parse(saved) as string) : '';
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchEvents(topic);
        setEvents(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, [topic]);

  useEffect(() => {
    localStorage.setItem(TOPIC_STORAGE_KEY, JSON.stringify(topic));
  }, [topic]);

  const handleSearch = (nextTopic: string) => {
    setTopic(nextTopic);
  };

  const handleToggleGoing = (id: string) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, going: !event.going } : event)));
  };

  const handleConfirmToggle = () => {
    if (pendingEvent) {
      handleToggleGoing(pendingEvent.id);
    }
    setPendingEvent(null);
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

      <EventSearchForm initialTopic={topic} onSearch={handleSearch} />

      <div className={css.toolbar}>
        <div className={css.attendance} aria-live="polite">
          <span className={css.attendanceCount}>{goingCount}</span>
          <span className={css.attendanceText}>
            <strong>Ви йдете</strong>
            <small>на {goingCount} з {events.length} подій</small>
          </span>
        </div>
        <Button
          variant="primary"
          text={isFormOpen ? 'Сховати форму' : '+ Додати подію'}
          onClick={() => setIsFormOpen(!isFormOpen)}
        />
      </div>

      {isFormOpen && <AddEventForm onAdd={handleAddEvent} />}

      {isLoading && <p>Завантажуємо події, зачекайте…</p>}
      {isError && <p>Ой, щось пішло не так! Спробуйте ще раз.</p>}

      {events.length > 0 && (
        <div className={css.cards}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} onRequestToggle={setPendingEvent} />
          ))}
        </div>
      )}

      {pendingEvent && (
        <Modal onClose={() => setPendingEvent(null)}>
          <h2>{pendingEvent.going ? 'Скасувати участь?' : 'Підтвердити участь?'}</h2>
          <p>{pendingEvent.title}</p>
          <div className={css.modalActions}>
            <Button variant="secondary" text="Скасувати" onClick={() => setPendingEvent(null)} />
            <Button
              variant="primary"
              text={pendingEvent.going ? 'Так, не піду' : 'Так, піду'}
              onClick={handleConfirmToggle}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
