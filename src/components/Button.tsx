import React, { MouseEvent } from 'react';

export interface ButtonProps {
  title: string;
  onClick: (delay?: number) => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  const clickHandle = (e: MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button type="button" onClick={clickHandle}>
      {title}
    </button>
  );
};
