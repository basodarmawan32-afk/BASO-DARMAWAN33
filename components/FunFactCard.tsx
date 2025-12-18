import React from 'react';
import { AiInsights, LoadingState } from '../types';

interface FunFactCardProps {
  loadingState: LoadingState;
  data: AiInsights | null;
  onRetry: () => void;
}

const FunFactCard: React.FC<FunFactCardProps> = ({ loadingState, data, onRetry }) => {
  if (loadingState === LoadingState.IDLE) return null;

  return (
    <div className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 bg-purple-300 opacity-20 rounded-full blur-xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.288 14.594L17.5 15.75l-.788-1.156a3.375 3.375 0 00-2.317-2.317L13.25 11.5l1.144-.777a3.375 3.375 0 002.317-2.317L17.5 7.25l.788 1.156a3.375 3.375 0 002.317 2.317L21.75 11.5l-1.144.777a3.375 3.375 0 00-2.317 2.317z" />
          </svg>
          <h3 className="text-xl font-bold">Wawasan AI</h3>
        </div>

        {loadingState === LoadingState.LOADING && (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
            <div className="h-16 bg-white/10 rounded w-full mt-4"></div>
          </div>
        )}

        {loadingState === LoadingState.ERROR && (
          <div className="text-center py-4">
            <p className="mb-2 opacity-90">Maaf, gagal memuat fakta menarik.</p>
            <button 
              onClick={onRetry}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {loadingState === LoadingState.SUCCESS && data && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <p className="text-indigo-100 text-xs uppercase tracking-wide font-semibold mb-1">Tahukah Anda?</p>
              <p className="text-lg leading-relaxed font-light">
                "{data.historicalFact}"
              </p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <p className="text-indigo-100 text-xs uppercase tracking-wide font-semibold mb-2">Kutipan Hari Ini</p>
              <p className="italic font-serif text-lg">
                "{data.inspirationalQuote}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunFactCard;