import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-1000"></div>

      <div className="z-10 text-center max-w-2xl fade-in space-y-8">
        <div className="inline-flex items-center justify-center p-3 bg-white/50 backdrop-blur-sm rounded-full shadow-sm mb-4">
          <Sparkles className="w-5 h-5 text-shixin-primary mr-2" />
          <span className="text-shixin-primary text-sm font-sans tracking-widest">線上心理諮詢所</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif text-shixin-text mb-4 tracking-wider">
          拾心所
        </h1>
        
        <p className="text-xl md:text-2xl font-serif text-gray-500 italic mb-8">
          「找回原本的自己」
        </p>

        <div className="space-y-6 text-gray-600 font-sans leading-relaxed text-lg bg-white/40 p-8 rounded-2xl backdrop-blur-sm border border-white/50 shadow-sm">
          <p>
            在這喧囂的世界裡，我們常常不小心遺失了部分靈魂。
          </p>
          <p>
            或許是困在<span className="text-doll-appearance font-bold mx-1">鏡子</span>裡的容貌焦慮，<br/>
            或許是被<span className="text-doll-phone font-bold mx-1">訊號</span>綁架的手機成癮，<br/>
            或許是為了<span className="text-doll-pleaser font-bold mx-1">討好型</span>而戴上的面具，<br/>
            又或許是被<span className="text-doll-perfection font-bold mx-1">完美主義</span>追趕的時鐘。
          </p>
          <p>
            這裡有四隻受傷的人偶，正等待著被聆聽。<br/>
            讓我們透過 20 道問題的對話，一起解開那個最纏繞的心結。
          </p>
        </div>

        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 bg-shixin-primary rounded-full hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shixin-primary overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <span className="relative flex items-center font-sans">
            開始拾心之旅 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Landing;