import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: Record<number, number>) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  // Use progress to animate width
  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

  const question = QUESTIONS[currentIdx];

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);

    if (currentIdx < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIdx(prev => prev + 1), 250); // Small delay for visual feedback
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    } else {
      onBack();
    }
  };

  // 升級版選項：豐富的色彩與情緒隱喻
  const options = [
    { 
      value: 1, 
      label: "幾乎沒有", 
      emoji: "☁️", 
      // Sky Blue Theme - Calm
      baseClass: "bg-sky-50 border-sky-100 text-sky-600",
      activeClass: "bg-sky-500 border-sky-500 text-white shadow-sky-200 ring-sky-200",
    },
    { 
      value: 2, 
      label: "偶爾會有", 
      emoji: "🌱", 
      // Emerald Green Theme - Growth
      baseClass: "bg-emerald-50 border-emerald-100 text-emerald-600",
      activeClass: "bg-emerald-500 border-emerald-500 text-white shadow-emerald-200 ring-emerald-200",
    },
    { 
      value: 3, 
      label: "有時候吧", 
      emoji: "🌼", 
      // Amber Orange Theme - Change
      baseClass: "bg-amber-50 border-amber-100 text-amber-600",
      activeClass: "bg-amber-500 border-amber-500 text-white shadow-amber-200 ring-amber-200",
    },
    { 
      value: 4, 
      label: "經常這樣", 
      emoji: "🌧️", 
      // Indigo Blue Theme - Heavy
      baseClass: "bg-indigo-50 border-indigo-100 text-indigo-600",
      activeClass: "bg-indigo-500 border-indigo-500 text-white shadow-indigo-200 ring-indigo-200",
    },
    { 
      value: 5, 
      label: "總是如此", 
      emoji: "⛈️", 
      // Rose Red Theme - Storm
      baseClass: "bg-rose-50 border-rose-100 text-rose-600",
      activeClass: "bg-rose-500 border-rose-500 text-white shadow-rose-200 ring-rose-200",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full fixed top-0 left-0 h-2 bg-gray-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-sky-300 via-emerald-300 to-rose-300 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full mb-12 flex justify-between items-center text-gray-400 font-sans text-sm relative z-10">
        <button onClick={handlePrev} className="hover:text-shixin-text flex items-center transition-colors px-4 py-2 rounded-full hover:bg-white/50">
          <ArrowLeft className="w-4 h-4 mr-1" /> 上一題
        </button>
        <span className="font-mono">{currentIdx + 1} / {QUESTIONS.length}</span>
      </div>

      <div className="w-full bg-white/60 backdrop-blur-md rounded-[3rem] p-8 md:p-16 shadow-xl border border-white/80 flex flex-col justify-center relative overflow-hidden transition-all duration-500 min-h-[500px]">
        
        {/* Animated Question Transition */}
        <div key={currentIdx} className="fade-in flex flex-col items-center justify-between h-full py-4">
          
          <h2 className="text-2xl md:text-3xl font-serif text-shixin-text leading-snug text-center mb-16 max-w-3xl">
            {question.text}
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 w-full">
            {options.map((option) => {
              const isSelected = answers[question.id] === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`
                    group relative flex flex-col items-center justify-center rounded-2xl transition-all duration-300 ease-out border-2
                    w-20 h-24 md:w-28 md:h-32
                    ${isSelected 
                      ? `${option.activeClass} scale-110 shadow-lg ring-4` 
                      : `${option.baseClass} hover:-translate-y-1 hover:shadow-md`}
                  `}
                >
                  <span className="text-3xl md:text-4xl mb-3 filter drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {option.emoji}
                  </span>
                  <span className="text-xs md:text-sm font-bold font-sans tracking-widest opacity-90">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="mt-12 flex w-full justify-center text-xs text-gray-400 font-sans tracking-widest uppercase">
            <span className="bg-white/40 px-4 py-1.5 rounded-full border border-white/60">
              請依照您的真實感受回答
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Quiz;