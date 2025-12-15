import React, { useState } from 'react';
import Landing from './components/landing';
import Quiz from './components/Quiz';
import Results from './components/Results';

type ViewState = 'landing' | 'quiz' | 'results';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStart = () => {
    setView('quiz');
    setAnswers({});
  };

  const handleQuizComplete = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    setView('results');
  };

  const handleRestart = () => {
    setView('landing');
    setAnswers({});
  };

  return (
    <div className="antialiased text-gray-800 bg-shixin-bg min-h-screen font-sans selection:bg-shixin-primary selection:text-white">
      {view === 'landing' && <Landing onStart={handleStart} />}
      {view === 'quiz' && (
        <Quiz 
          onComplete={handleQuizComplete} 
          onBack={() => setView('landing')} 
        />
      )}
      {view === 'results' && (
        <Results 
          answers={answers} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;
