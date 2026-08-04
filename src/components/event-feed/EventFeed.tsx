import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import css from './EventFeed.module.css';

// ⚠️ Ізольована демонстрація. У Event Planner цей компонент НЕ підключається —
// там працює класична пагінація. Файл самодостатній: усе, що потрібно,
// оголошено прямо тут.

const BASE_URL = import.meta.env.VITE_API_URL;
const PER_PAGE = 6;

interface FeedEvent {
  id: string;
  title: string;
  date: string;
  location: string;
}

interface FeedPage {
  events: FeedEvent[];
  nextPage: number | null;
}

const fetchFeedPage = async (page: number): Promise<FeedPage> => {
  const response = await axios.get<FeedEvent[]>(`${BASE_URL}/events`, {
    params: { page, limit: PER_PAGE },
  });

  return {
    events: response.data,
    nextPage: response.data.length < PER_PAGE ? null : page + 1,
  };
};

export default function EventFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['events-feed'],
      queryFn: ({ pageParam }) => fetchFeedPage(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  if (isLoading) {
    return <p className={css.status}>Завантажуємо стрічку…</p>;
  }

  if (isError) {
    return <p className={css.status}>Не вдалося завантажити стрічку.</p>;
  }

  const events = data?.pages.flatMap((page) => page.events) ?? [];

  return (
    <div className={css.feed}>
      <ul className={css.list}>
        {events.map((event) => (
          <li key={event.id} className={css.item}>
            <span className={css.title}>{event.title}</span>
            <span className={css.meta}>
              {event.date} · {event.location}
            </span>
          </li>
        ))}
      </ul>

      {hasNextPage ? (
        <button className={css.more} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Завантажуємо…' : 'Показати ще'}
        </button>
      ) : (
        <p className={css.status}>Це всі події.</p>
      )}
    </div>
  );
}
