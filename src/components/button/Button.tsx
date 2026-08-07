import clsx from 'clsx';
import css from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function Button({ variant, text, type = 'button', onClick }: ButtonProps) {
  return (
    <button className={clsx(css.button, variant && css[variant])} type={type} onClick={onClick}>
      {text}
    </button>
  );
}
