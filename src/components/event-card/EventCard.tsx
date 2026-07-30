import { useState } from 'react';
import clsx from 'clsx';
import { HiCalendar, HiCheck, HiLocationMarker } from 'react-icons/hi';
import css from './EventCard.module.css';
import type { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
  onRequestToggle: (event: Event) => void;
}

const DESCRIPTION_PREVIEW_LENGTH = 80;

export default function EventCard({ event, onRequestToggle }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLongDescription = event.description.length > DESCRIPTION_PREVIEW_LENGTH;
  const description =
    isExpanded || !hasLongDescription
      ? event.description
      : `${event.description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}…`;

  return (
    <article className={clsx(css.card, event.isOnline && css.online)}>
      <header className={css.header}>
        <h2 className={css.title}>{event.title}</h2>
        {event.isOnline && <span className={css.badge}>Онлайн</span>}
      </header>

      <div className={css.details}>
        <p className={css.detail}>
          <span className={css.iconBox}>
            <HiCalendar aria-hidden="true" />
          </span>
          <span>{event.date}</span>
        </p>
        <p className={css.detail}>
          <span className={css.iconBox}>
            <HiLocationMarker aria-hidden="true" />
          </span>
          <span>{event.location}</span>
        </p>
      </div>

      <div className={css.descriptionSection}>
        <p className={css.description}>{description}</p>
        {hasLongDescription && (
          <button
            className={css.moreButton}
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? 'Показати менше' : 'Показати більше'}
          </button>
        )}
      </div>

      <footer className={css.footer}>
        <label className={css.going}>
          <input
            className={css.goingInput}
            type="checkbox"
            checked={event.going}
            onChange={() => onRequestToggle(event)}
          />
          <span className={css.checkbox} aria-hidden="true">
            <HiCheck />
          </span>
          <span>
            <strong>{event.going ? 'Я йду' : 'Планую піти'}</strong>
            <small>{event.going ? 'Участь підтверджено' : 'Позначити участь'}</small>
          </span>
        </label>
      </footer>
    </article>
  );
}
