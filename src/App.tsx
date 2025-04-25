import React from 'react';
import Quiz from './components/Quiz';
import quizData from './data/quizData';
import { Brain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center py-8 px-4">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <Brain size={32} className="text-purple-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">QuizMaster</h1>
        </div>
        <p className="text-gray-600">Test your knowledge with our interactive quiz!</p>
      </header>
      
      <main className="w-full max-w-2xl mx-auto">
        <Quiz questions={quizData} />
      </main>
      
      <footer className="mt-auto pt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2025 QuizMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;