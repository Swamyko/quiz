import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizState } from '../types/quiz';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import Results from './Results';
import { HelpCircle } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const initialState: QuizState = {
    currentQuestionIndex: 0,
    score: 0,
    selectedOption: null,
    showAnswer: false,
    quizCompleted: false,
    timeRemaining: 20,
  };

  const [state, setState] = useState<QuizState>(initialState);
  
  const resetTimer = () => {
    setState(prev => ({ ...prev, timeRemaining: 20 }));
  };
  
  const setTimeRemaining = (value: React.SetStateAction<number>) => {
    setState(prev => ({
      ...prev,
      timeRemaining: typeof value === 'function' ? value(prev.timeRemaining) : value
    }));
  };
  
  // Handle time running out
  useEffect(() => {
    if (state.timeRemaining === 0 && !state.showAnswer && !state.quizCompleted) {
      setState(prev => ({ ...prev, showAnswer: true }));
      
      const timer = setTimeout(() => {
        moveToNextQuestion();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [state.timeRemaining, state.showAnswer, state.quizCompleted]);

  const handleSelectOption = (optionIndex: number) => {
    if (state.showAnswer) return;
    
    const currentQuestion = questions[state.currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    setState(prev => ({
      ...prev,
      selectedOption: optionIndex,
      showAnswer: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
    
    // Move to next question after a delay
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };
  
  const moveToNextQuestion = () => {
    const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
    
    if (isLastQuestion) {
      setState(prev => ({ ...prev, quizCompleted: true }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedOption: null,
        showAnswer: false
      }));
      resetTimer();
    }
  };
  
  const restartQuiz = () => {
    setState(initialState);
  };
  
  if (state.quizCompleted) {
    return <Results score={state.score} totalQuestions={questions.length} onRestart={restartQuiz} />;
  }
  
  const currentQuestion = questions[state.currentQuestionIndex];
  
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-purple-600 text-white">
        <h1 className="text-xl font-bold">QuizMaster</h1>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm opacity-90">
            Question {state.currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-sm font-medium">
            Score: {state.score}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <ProgressBar current={state.currentQuestionIndex + 1} total={questions.length} />
        <Timer 
          timeRemaining={state.timeRemaining} 
          setTimeRemaining={setTimeRemaining} 
          isActive={!state.showAnswer} 
        />
        
        <Question
          question={currentQuestion}
          selectedOption={state.selectedOption}
          showAnswer={state.showAnswer}
          onSelectOption={handleSelectOption}
        />
        
        {state.showAnswer && state.selectedOption !== null && (
          <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm">
            <div className="flex items-start">
              <HelpCircle size={18} className="text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                {state.selectedOption === currentQuestion.correctAnswer ? (
                  <p className="text-green-700">Correct! Well done!</p>
                ) : (
                  <div>
                    <p className="text-red-600 mb-1">Incorrect!</p>
                    <p className="text-gray-700">
                      The correct answer is: <span className="font-medium">{currentQuestion.options[currentQuestion.correctAnswer]}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;