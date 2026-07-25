import { useState } from 'react';
import Button from '../button/Button';
import css from './AddEventForm.module.css';
import type { DraftEvent } from '../../types/event';
import type { SubmitEvent } from 'react';

const emptyDraft: DraftEvent = {
  title: '',
  date: '',
  location: '',
  description: '',
};

interface AddEventFormProps {
  onAdd: (draft: DraftEvent) => void;
}

export default function AddEventForm({ onAdd }: AddEventFormProps) {
  const [draft, setDraft] = useState<DraftEvent>(emptyDraft);

  // Універсальний оновлювач: keyof обмежує key до полів DraftEvent
  const updateField = (key: keyof DraftEvent, value: string) => {
    setDraft({
      ...draft,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    if (!draft.title.trim()) return;

    onAdd(draft);
    setDraft(emptyDraft);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <input
        value={draft.title}
        onChange={(event) => updateField('title', event.target.value)}
        placeholder="Назва події"
      />
      <input
        value={draft.date}
        onChange={(event) => updateField('date', event.target.value)}
        placeholder="Дата, напр. 01.08.2026"
      />
      <input
        value={draft.location}
        onChange={(event) => updateField('location', event.target.value)}
        placeholder="Місце проведення"
      />
      <textarea
        value={draft.description}
        onChange={(event) => updateField('description', event.target.value)}
        placeholder="Опис події"
      />
      <Button variant="primary" text="Зберегти подію" />
    </form>
  );
}
