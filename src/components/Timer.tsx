import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, setTimeRemaining, isActive }) => {
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, setTimeRemaining]);
  
  const getTimerColor = () => {
    if (timeRemaining > 10) return 'text-purple-500';
    if (timeRemaining > 5) return 'text-orange-500';
    return 'text-red-500';
  };
  
  return (
    <div className="flex items-center justify-center mb-4">
      <div className={`flex items-center gap-2 text-lg font-medium ${getTimerColor()} transition-colors duration-300`}>
        <Clock size={20} />
        <span>{timeRemaining}s</span>
      </div>
    </div>
  );
};

export default Timer;