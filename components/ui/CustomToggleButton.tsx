import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Option {
  label: string;
  value: string | number;
}

interface CustomToggleButtonGroupProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
}

export const CustomToggleButtonGroup: React.FC<
  CustomToggleButtonGroupProps
> = ({ options, value, onChange }) => {
  const [activeIndex, setActiveIndex] = useState<number>(
    options.findIndex((option) => option.value === value)
  );
  const [uniqueId] = useState(Math.random().toString(36).substring(7));

  useEffect(() => {
    setActiveIndex(options.findIndex((option) => option.value === value));
  }, [value, options]);

  const handleClick = (index: number, optionValue: string | number) => {
    setActiveIndex(index);
    onChange(optionValue);
  };

  return (
    <div className="relative flex w-full h-10 bg-gray-100 rounded-lg p-0.5">
      {options.map((option, index) => (
        <button
          key={option.value}
          className="flex-1 z-10 text-sm focus:outline-none text-black relative px-3"
          onClick={() => handleClick(index, option.value)}
          aria-pressed={activeIndex === index}
        >
          <span className="relative z-10">{option.label}</span>
          {activeIndex === index && (
            <motion.div
              layoutId={uniqueId}
              className="absolute inset-0 bg-white rounded-md shadow-md"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
