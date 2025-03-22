import React from "react";

// Define the props interface for the Button component
interface ButtonProps {
  text: string; // The button's label
  bgColor: string; // Tailwind CSS class for background color
  textColor: string; // Tailwind CSS class for text color
  handler?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional onClick handler
}

// Use the interface to type the component's props
const Button: React.FC<ButtonProps> = ({ text, bgColor, textColor, handler = () => {} }) => {
  return (
      <button
          onClick={handler}
          className={`${bgColor} ${textColor} cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10`}
      >
        {text}
      </button>
  );
};

export default Button;