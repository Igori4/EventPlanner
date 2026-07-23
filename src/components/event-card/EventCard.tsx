import { useState } from 'react';
import clsx from 'clsx';
import css from './EventCard.module.css';
import Button from '../button/Button';
import { HiCalendar, HiLocationMarker } from 'react-icons/hi';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  isOnline: boolean;
  description: string;
  going: boolean;
}

interface EventCardProps {
  event: Event;
  onToggleGoing: (id: string) => void;
}

export default function EventCard({ event, onToggleGoing }: EventCardProps) {
  // isExpanded лишається ЛОКАЛЬНИМ — він потрібен лише цій картці
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={clsx(css.card, event.isOnline && css.online)}>
      <h2>{event.title}</h2>
      <p>
        <HiCalendar className={css.icon} size={20} /> {event.date}
      </p>
      <p>
        <HiLocationMarker className={css.icon} size={20} /> {event.location}
      </p>
      {event.isOnline && <span className={css.badge}>Онлайн</span>}

      <p className={css.description}>
        {isExpanded ? event.description : `${event.description.slice(0, 60)}...`}
      </p>

      {/* going піднято в App — картка лише повідомляє про намір змінити */}
      <label className={css.going}>
        <input type="checkbox" checked={event.going} onChange={() => onToggleGoing(event.id)} />
        {event.going ? '✅ Йду' : 'Піду'}
      </label>

      <div className={css.actions}>
        <Button
          variant="secondary"
          text={isExpanded ? 'Згорнути' : 'Показати більше'}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
    </div>
  );
}
