export interface Option {
  value: string;
  label: string;
}

export const CATEGORIES: Option[] = [
  { value: 'conference', label: 'Конференція' },
  { value: 'meetup', label: 'Мітап' },
  { value: 'workshop', label: 'Воркшоп' },
  { value: 'webinar', label: 'Вебінар' },
];

export const LEVELS: Option[] = [
  { value: 'beginner', label: 'Початковий' },
  { value: 'middle', label: 'Середній' },
  { value: 'advanced', label: 'Просунутий' },
];

export const TAGS: Option[] = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'testing', label: 'Тестування' },
];

export const getLabel = (options: Option[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? value;
