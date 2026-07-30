import Button from '../button/Button';
import css from './AddEventForm.module.css';
import type { DraftEvent } from '../../types/event';
interface AddEventFormProps {
  onAdd: (draft: DraftEvent) => void;
}

export default function AddEventForm({ onAdd }: AddEventFormProps) {
  const handleSubmit = (formData: FormData) => {
    const draft: DraftEvent = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
    };

    if (!draft.title.trim()) return;

    onAdd(draft);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.header}>
        <h2>Нова подія</h2>
        <p>Заповніть основну інформацію про подію</p>
      </div>

      <div className={css.fields}>
        <label className={css.field}>
          <span>Назва події</span>
          <input type="text" name="title" placeholder="Наприклад, React Meetup" required />
        </label>

        <div className={css.row}>
          <label className={css.field}>
            <span>Дата</span>
            <input type="text" name="date" placeholder="01.08.2026" />
          </label>
          <label className={css.field}>
            <span>Місце проведення</span>
            <input type="text" name="location" placeholder="Місто, адреса або Online" />
          </label>
        </div>

        <label className={css.field}>
          <span>Опис</span>
          <textarea name="description" placeholder="Коротко розкажіть, що чекає на учасників" />
        </label>
      </div>

      <div className={css.actions}>
        <Button variant="primary" text="Зберегти подію" />
      </div>
    </form>
  );
}
