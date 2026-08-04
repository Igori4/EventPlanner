import { useState, useEffect } from 'react';
import EventCard from './components/event-card/EventCard';
import Button from './components/button/Button';
import AddEventForm from './components/add-event-form/AddEventForm';
import EventSearchForm from './components/event-search-form/EventSearchForm';
import Modal from './components/modal/Modal';
import css from './App.module.css';
import { fetchEvents, fetchEventsByLocation } from './services/eventService';
import type { Event, DraftEvent } from './types/event';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SimilarEvents from './components/similar-events/SimilarEvents';
import Pagination from './components/pagination/Pagination';

const TOPIC_STORAGE_KEY = 'event-planner-topic';

export default function App() {
  const [topic, setTopic] = useState(() => {
    const saved = window.localStorage.getItem(TOPIC_STORAGE_KEY);
    return saved !== null ? (JSON.parse(saved) as string) : '';
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<Event | null>(null);
  const [goingIds, setGoingIds] = useState<string[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', topic, currentPage],
    queryFn: () => fetchEvents(topic, currentPage),
    placeholderData: keepPreviousData,
  });

  const pendingLocation = pendingEvent?.location ?? '';

  const { data: similarEvents, isLoading: isSimilarLoading } = useQuery({
    queryKey: ['events', 'byLocation', pendingLocation],
    queryFn: () => fetchEventsByLocation(pendingLocation),
    enabled: pendingEvent !== null,
  });

  useEffect(() => {
    localStorage.setItem('event-planner-topic', JSON.stringify(topic));
  }, [topic]);

  const totalPages = data?.totalPages ?? 0;

  const events: Event[] = (data?.events ?? []).map((event) => ({
    ...event,
    going: goingIds.includes(event.id),
  }));

  const handleSearch = (nextTopic: string) => {
    setTopic(nextTopic);
    setCurrentPage(1);
  };

  const handleToggleGoing = (id: string) => {
    setGoingIds(
      goingIds.includes(id) ? goingIds.filter((goingId) => goingId !== id) : [...goingIds, id],
    );
  };

  const handleConfirmToggle = () => {
    if (pendingEvent) {
      handleToggleGoing(pendingEvent.id);
    }
    setPendingEvent(null);
  };

  const handleAddEvent = (draft: DraftEvent) => {
    // ⚠️ Тимчасово. Список тепер належить серверу, тож нову подію треба
    // відправити на бекенд POST-запитом — це мутація, тема заняття 7.
    console.log('Нова подія:', draft);
    setIsFormOpen(false);
  };

  const goingCount = events.filter((event) => event.going).length;

  return (
    <>
      <h1>Найближчі події</h1>

      <EventSearchForm initialTopic={topic} onSearch={handleSearch} />

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

      {isFormOpen && (
        <>
          <AddEventForm onAdd={handleAddEvent} />
          <p className={css.notice}>
            Створення події поки не зберігається на сервері — для цього потрібна мутація. Це тема
            заняття 7.
          </p>
        </>
      )}

      {isLoading && <p>Завантажуємо події, зачекайте…</p>}
      {isError && <p>Ой, щось пішло не так: {error.message}</p>}

      {events.length > 0 && (
        <div className={css.cards}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} onRequestToggle={setPendingEvent} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {pendingEvent && (
        <Modal onClose={() => setPendingEvent(null)}>
          <h2>{pendingEvent.going ? 'Скасувати участь?' : 'Підтвердити участь?'}</h2>
          <p>{pendingEvent.title}</p>

          <SimilarEvents
            events={similarEvents ?? []}
            isLoading={isSimilarLoading}
            currentId={pendingEvent.id}
          />

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
