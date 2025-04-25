import React from 'react';
import { QuizQuestion } from '../types/quiz';
import Option from './Option';

interface QuestionProps {
  question: QuizQuestion;
  selectedOption: number | null;
  showAnswer: boolean;
  onSelectOption: (index: number) => void;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  selectedOption, 
  showAnswer, 
  onSelectOption 
}) => {
  return (
    <div className="w-full animate-fadeIn">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
        {question.question}
      </h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <Option
            key={index}
            text={option}
            index={index}
            selected={selectedOption === index}
            correct={index === question.correctAnswer}
            showAnswer={showAnswer}
            disabled={showAnswer}
            onClick={onSelectOption}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;