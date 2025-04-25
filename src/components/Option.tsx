import React from 'react';
import { Check, X } from 'lucide-react';

interface OptionProps {
  text: string;
  index: number;
  selected: boolean;
  correct: boolean;
  showAnswer: boolean;
  disabled: boolean;
  onClick: (index: number) => void;
}

const Option: React.FC<OptionProps> = ({ 
  text, 
  index, 
  selected, 
  correct, 
  showAnswer, 
  disabled, 
  onClick 
}) => {
  const getOptionClasses = () => {
    const baseClasses = "relative w-full p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer mb-3";
    
    if (!showAnswer) {
      if (selected) {
        return `${baseClasses} bg-purple-100 border-purple-500 shadow-md`;
      }
      return `${baseClasses} border-gray-300 hover:border-purple-300 hover:bg-purple-50`;
    }
    
    if (correct) {
      return `${baseClasses} bg-green-100 border-green-500`;
    }
    
    if (selected) {
      return `${baseClasses} bg-red-100 border-red-500`;
    }
    
    return `${baseClasses} border-gray-200 opacity-70`;
  };
  
  const optionLabels = ['A', 'B', 'C', 'D'];
  
  return (
    <button 
      className={getOptionClasses()}
      onClick={() => !disabled && onClick(index)}
      disabled={disabled}
      data-option-index={index}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8 mr-3 bg-gray-100 rounded-full flex items-center justify-center font-medium text-gray-700">
          {optionLabels[index]}
        </div>
        <div className="flex-1 text-left">{text}</div>
        {showAnswer && correct && (
          <div className="ml-auto flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
        )}
        {showAnswer && selected && !correct && (
          <div className="ml-auto flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <X size={16} className="text-white" />
          </div>
        )}
      </div>
    </button>
  );
};

export default Option;