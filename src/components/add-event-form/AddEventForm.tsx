import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import Button from '../button/Button';
import css from './AddEventForm.module.css';
import { useId } from 'react';
import type { DraftEvent } from '../../types/event';
import { CATEGORIES, LEVELS, TAGS } from '../../constants/eventOptions';
import * as Yup from 'yup';

const initialValues: DraftEvent = {
  title: '',
  date: '',
  location: '',
  description: '',
  isOnline: false,
  category: '',
  level: 'beginner',
  tags: [],
};

const AddEventSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Назва занадто коротка')
    .max(80, 'Назва занадто довга')
    .required('Вкажіть назву події'),
  date: Yup.string()
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Формат дати: 01.08.2026')
    .required('Вкажіть дату'),
  category: Yup.string().required('Оберіть тип події'),
  description: Yup.string().max(500, 'Опис занадто довгий'),
  location: Yup.string().when('isOnline', {
    is: false,
    then: (schema) =>
      schema.min(2, 'Занадто коротка назва місця').required('Вкажіть місце проведення'),
    otherwise: (schema) => schema.min(2, 'Занадто коротка назва місця'),
  }),
  isOnline: Yup.boolean(),
  level: Yup.string().required('Оберіть рівень'),
  tags: Yup.array().min(1, 'Оберіть хоча б одну тему'),
});

interface AddEventFormProps {
  onAdd: (draft: DraftEvent) => void;
}

export default function AddEventForm({ onAdd }: AddEventFormProps) {
  const fieldId = useId();

  const handleSubmit = (values: DraftEvent, actions: FormikHelpers<DraftEvent>) => {
    onAdd(values);
    actions.resetForm();
  };

  return (
    // Formik не рендерить HTML — він лише керує станом форми
    <Formik initialValues={initialValues} validationSchema={AddEventSchema} onSubmit={handleSubmit}>
      {/* Form перетворюється на <form> і сам підключає обробку сабміту */}
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Про подію</legend>

          <label className={css.label} htmlFor={`${fieldId}-title`}>
            Назва події
          </label>
          <Field className={css.field} type="text" name="title" id={`${fieldId}-title`} />
          <ErrorMessage name="title" component="span" className={css.error} />

          <label className={css.label} htmlFor={`${fieldId}-date`}>
            Дата
          </label>
          <Field
            className={css.field}
            type="text"
            name="date"
            id={`${fieldId}-date`}
            placeholder="01.08.2026"
          />
          <ErrorMessage name="date" component="span" className={css.error} />

          <label className={css.label} htmlFor={`${fieldId}-category`}>
            Тип події
          </label>
          <Field className={css.field} as="select" name="category" id={`${fieldId}-category`}>
            <option value="">— оберіть тип —</option>
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Field>
          <ErrorMessage name="category" component="span" className={css.error} />

          <label className={css.label} htmlFor={`${fieldId}-description`}>
            Опис
          </label>
          <Field
            className={css.field}
            as="textarea"
            name="description"
            id={`${fieldId}-description`}
            rows={4}
          />
          <ErrorMessage name="description" component="span" className={css.error} />
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Де і для кого</legend>

          {/* Одиничний чекбокс: Formik зберігає true/false */}
          <label className={css.checkboxLabel}>
            <Field type="checkbox" name="isOnline" />
            Онлайн-подія
          </label>

          <label className={css.label} htmlFor={`${fieldId}-location`}>
            Місце проведення
          </label>
          <Field className={css.field} type="text" name="location" id={`${fieldId}-location`} />
          <ErrorMessage name="location" component="span" className={css.error} />

          {/* Радіокнопки: однаковий name, різні value */}
          <span className={css.label}>Рівень</span>
          <div className={css.optionGroup}>
            {LEVELS.map((level) => (
              <label key={level.value} className={css.checkboxLabel}>
                <Field type="radio" name="level" value={level.value} />
                {level.label}
              </label>
            ))}
          </div>
          <ErrorMessage name="level" component="span" className={css.error} />

          {/* Група чекбоксів: однаковий name, значення збираються в масив */}
          <span className={css.label}>Теми</span>
          <div className={css.optionGroup}>
            {TAGS.map((tag) => (
              <label key={tag.value} className={css.checkboxLabel}>
                <Field type="checkbox" name="tags" value={tag.value} />
                {tag.label}
              </label>
            ))}
          </div>
          <ErrorMessage name="tags" component="span" className={css.error} />
        </fieldset>

        <Button variant="primary" text="Зберегти подію" type="submit" />
      </Form>
    </Formik>
  );
}
