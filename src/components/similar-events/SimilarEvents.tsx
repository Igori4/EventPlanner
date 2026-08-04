import css from './SimilarEvents.module.css';
import type { Event } from '../../types/event';

interface SimilarEventsProps {
  events: Event[];
  isLoading: boolean;
  currentId: string;
}

// Компонент презентаційний: він нічого не завантажує сам, а лише показує
// те, що йому передали. Запит живе в App — саме там, де відомо, коли його
// треба запускати.
export default function SimilarEvents({ events, isLoading, currentId }: SimilarEventsProps) {
  if (isLoading) {
    return <p className={css.status}>Шукаємо, що ще відбувається поруч…</p>;
  }

  const similar = events.filter((event) => event.id !== currentId).slice(0, 3);

  if (similar.length === 0) {
    return <p className={css.status}>Інших подій у цьому місці поки немає.</p>;
  }

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Тут само відбувається</h3>
      <ul className={css.list}>
        {similar.map((event) => (
          <li key={event.id} className={css.item}>
            <span className={css.name}>{event.title}</span>
            <span className={css.date}>{event.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
