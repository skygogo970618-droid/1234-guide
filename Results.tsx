import React, { useEffect, useState, useMemo } from 'react';
import { Category, AnalysisResult } from '../types';
import { DOLLS, QUESTIONS } from '../constants';
import { generateConsultation } from '../services/geminiService';
import { RefreshCw, Share2, Heart, Sparkles as SparklesIcon, ScanFace, Smartphone, Smile, Clock } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface ResultsProps {
  answers: Record<number, number>;
  onRestart: () => void;
}

const IconMap = {
  Appearance: ScanFace,
  Phone: Smartphone,
  PeoplePleaser: Smile,
  Perfectionist: Clock,
};

const Results: React.FC<ResultsProps> = ({ answers, onRestart }) => {
  // 1. Calculate scores and dominant category Synchronously (Instant)
  const { scores, dominant, chartData } = useMemo(() => {
    const calculatedScores: Record<Category, number> = {
      Appearance: 0,
      Phone: 0,
      PeoplePleaser: 0,
      Perfectionist: 0
    };

    Object.entries(answers).forEach(([questionId, score]) => {
      const q = QUESTIONS.find(q => q.id === parseInt(questionId));
      if (q) {
        calculatedScores[q.category] += score as number;
      }
    });

    let maxScore = -1;
    let dominantCat: Category = 'Appearance';

    (Object.keys(calculatedScores) as Category[]).forEach(cat => {
      if (calculatedScores[cat] > maxScore) {
        maxScore = calculatedScores[cat];
        dominantCat = cat;
      }
    });

    const data = Object.entries(calculatedScores).map(([key, value]) => ({
      subject: DOLLS[key as Category].name, 
      A: value,
      fullMark: 25, 
    }));

    return { scores: calculatedScores, dominant: dominantCat, chartData: data };
  }, [answers]);

  const [aiResult, setAiResult] = useState<AnalysisResult | null>(null);
  const [imgError, setImgError] = useState(false);

  // Reset error state when dominant category changes
  useEffect(() => {
    setImgError(false);
  }, [dominant]);

  // 2. Fetch AI advice in background
  useEffect(() => {
    let isMounted = true;
    const fetchAdvice = async () => {
      // Pass the calculated data to the service
      const result = await generateConsultation(scores, dominant);
      if (isMounted) {
        setAiResult(result);
      }
    };
    fetchAdvice();
    return () => { isMounted = false; };
  }, [scores, dominant]);

  const doll = DOLLS[dominant];
  const adviceReady = !!aiResult;
  const FallbackIcon = IconMap[dominant] || SparklesIcon;
  
  return (
    <div className="min-h-screen bg-shixin-bg p-4 md:p-8 fade-in pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section - Renders Instantly */}
        <header className="text-center mb-8 pt-8 relative">
           {/* Character Image Display with Fallback */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              {/* Glow Effect Background */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-40 ${doll.color} animate-pulse`}></div>
              
              {imgError ? (
                <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full bg-white/60 backdrop-blur-sm border-4 border-white flex flex-col items-center justify-center relative z-10 shadow-xl ${doll.color.replace('bg-', 'text-')}`}>
                  <FallbackIcon className="w-24 h-24 mb-2 opacity-80" />
                  <span className="text-sm font-sans tracking-widest text-gray-400">IMAGE MISSING</span>
                </div>
              ) : (
                <img 
                  src={doll.imageUrl} 
                  alt={doll.name}
                  onError={() => setImgError(true)}
                  // Updated: Allow height to grow automatically and restrict max width/height to fit container
                  className="relative h-auto max-h-[350px] w-auto max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out z-10"
                />
              )}
            </div>
          </div>

          <div className="relative z-20">
            <p className="text-gray-400 font-sans mb-2 tracking-widest text-sm uppercase">您的心靈投影</p>
            <h1 className="text-4xl md:text-5xl font-serif text-shixin-text mb-4">
              {doll.name}
            </h1>
            <p className="text-lg text-shixin-primary font-sans italic max-w-2xl mx-auto leading-relaxed">
              "{doll.description}"
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Visual / Radar Chart - Renders Instantly */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
             <div className={`absolute top-0 w-full h-2 ${doll.color}`}></div>
             <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                  <PolarGrid stroke="#f3f4f6" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 13, fontFamily: '"Zen Maru Gothic", sans-serif' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 25]} tick={false} axisLine={false} />
                  <Radar
                    name="指數"
                    dataKey="A"
                    stroke="#8e9eab"
                    strokeWidth={2}
                    fill={doll.color.replace('bg-', 'var(--color-')} 
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-2 text-center">
                 <span className="text-xs text-gray-400 font-sans">各項指標分析</span>
              </div>
          </div>

          {/* Advice Section - Shows Skeleton if loading, text if ready */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[400px]">
             <Heart className="absolute top-8 right-8 text-pink-200 w-8 h-8 fill-current opacity-50 animate-bounce delay-700" />
             <h3 className="text-xl font-serif text-gray-800 mb-6 border-b pb-4">給您的心靈處方</h3>
             
             {!adviceReady ? (
               // Loading Skeleton
               <div className="animate-pulse space-y-4">
                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                 <div className="h-4 bg-gray-200 rounded w-full"></div>
                 <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                 <div className="h-4 bg-gray-200 rounded w-full"></div>
                 <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                      <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                    </div>
                 </div>
                 <p className="text-sm text-shixin-primary text-center mt-6 animate-pulse">
                   正在解讀您的心靈頻率...
                 </p>
               </div>
             ) : (
               // Actual Content
               <div className="fade-in">
                 <p className="text-gray-600 leading-loose font-sans whitespace-pre-line mb-8 text-justify">
                   {aiResult.advice}
                 </p>
                 
                 <h4 className="font-serif text-shixin-primary mb-4 flex items-center">
                   <SparklesIcon className="w-4 h-4 mr-2" /> 
                   今日小練習
                 </h4>
                 <ul className="space-y-3">
                   {aiResult.actionItems.map((item, idx) => (
                     <li key={idx} className="flex items-start bg-gray-50/80 p-3 rounded-lg text-sm text-gray-600 transition-colors hover:bg-gray-100">
                       <span className="flex-shrink-0 w-5 h-5 rounded-full bg-shixin-primary text-white flex items-center justify-center text-xs mr-3 mt-0.5">
                         {idx + 1}
                       </span>
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
             )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center space-x-4">
          <button 
            onClick={onRestart}
            className="group flex items-center px-8 py-3 bg-shixin-text text-white rounded-full hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg font-sans"
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" /> 重新測驗
          </button>
           <button 
            className="flex items-center px-8 py-3 bg-white text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md font-sans"
            onClick={() => alert("功能開發中：分享您的心靈卡片")}
          >
            <Share2 className="w-4 h-4 mr-2" /> 分享結果
          </button>
        </div>

      </div>
    </div>
  );
};

export default Results;