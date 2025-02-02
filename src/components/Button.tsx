import React from 'react';

interface ButtonProps {
  variant: 'outline' | 'contained';
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${variant === 'outline' ? 'border border-blue-500 text-blue-500 hover:bg-blue-100' : 'bg-blue-500 text-white hover:bg-blue-600'}
        font-medium rounded-lg px-4 py-2 transition-colors duration-300
      `}
    >
      {children}
    </button>
  );
};

export default Button;