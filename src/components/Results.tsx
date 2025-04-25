import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedback = () => {
    if (percentage >= 80) return "Excellent! You're a quiz master!";
    if (percentage >= 60) return "Good job! You know your stuff!";
    if (percentage >= 40) return "Not bad! Keep learning!";
    return "Keep practicing! You'll get better!";
  };
  
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
          <Trophy size={40} className="text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">{getFeedback()}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Score:</span>
          <span className="text-2xl font-bold text-purple-600">{score}/{totalQuestions}</span>
        </div>
        
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 text-right text-gray-700 font-medium">
          {percentage}%
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors duration-300"
      >
        <RotateCcw size={18} className="mr-2" />
        Try Again
      </button>
    </div>
  );
};

export default Results;