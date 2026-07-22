import './EventCard.css';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
}

export default function EventCard({ title, date, location }: EventCardProps) {
  return (
    <div className="event-card">
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{location}</p>
    </div>
  );
}
