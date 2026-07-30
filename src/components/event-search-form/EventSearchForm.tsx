import Button from '../button/Button';
import { HiSearch } from 'react-icons/hi';
import css from './EventSearchForm.module.css';

interface EventSearchFormProps {
  initialTopic: string;
  onSearch: (title: string) => void;
}

export default function EventSearchForm({ initialTopic, onSearch }: EventSearchFormProps) {
  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    onSearch(title);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.inputWrap}>
        <span className={css.visuallyHidden}>Пошук подій за назвою</span>
        <HiSearch className={css.searchIcon} aria-hidden="true" />
        <input
          type="search"
          name="title"
          defaultValue={initialTopic}
          placeholder="Знайти подію за назвою…"
        />
      </label>
      <Button variant="primary" text="Знайти подію" />
    </form>
  );
}
