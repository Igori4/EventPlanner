import Button from '../button/Button';
import css from './EventSearchForm.module.css';

interface EventSearchFormProps {
  onSearch: (title: string) => void;
}

export default function EventSearchForm({ onSearch }: EventSearchFormProps) {
  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    if (title.trim() === '') {
      alert('Введіть пошуковий запит!');
      return;
    }

    onSearch(title);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <input type="text" name="title" placeholder="Пошук подій…" />
      <Button variant="primary" text="Знайти" />
    </form>
  );
}
