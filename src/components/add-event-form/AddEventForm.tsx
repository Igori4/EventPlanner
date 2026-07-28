import Button from '../button/Button';
import css from './AddEventForm.module.css';
import type { DraftEvent } from '../../types/event';
// import type { SubmitEvent } from 'react';

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
      <input type="text" name="title" placeholder="Назва події" />
      <input type="text" name="date" placeholder="Дата, напр. 01.08.2026" />
      <input type="text" name="location" placeholder="Місце проведення" />
      <textarea name="description" placeholder="Опис події" />
      <Button variant="primary" text="Зберегти подію" />
    </form>
  );
}
