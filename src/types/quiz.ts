export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedOption: number | null;
  showAnswer: boolean;
  quizCompleted: boolean;
  timeRemaining: number;
}