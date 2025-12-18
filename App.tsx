import React, { useState, useCallback } from 'react';
import { calculateAge } from './utils/dateUtils';
import { fetchAgeInsights } from './services/geminiService';
import StatsCard from './components/StatsCard';
import FunFactCard from './components/FunFactCard';
import { AgeResult, AiInsights, LoadingState } from './types';

function App() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [aiData, setAiData] = useState<AiInsights | null>(null);
  const [loadingAI, setLoadingAI] = useState<LoadingState>(LoadingState.IDLE);

  const handleCalculate = useCallback(async () => {
    if (!birthDate) return;

    const result = calculateAge(birthDate);
    if (!result) {
      alert("Tanggal lahir tidak valid atau di masa depan.");
      return;
    }

    setAgeResult(result);
    setAiData(null); // Reset previous AI data
    setLoadingAI(LoadingState.LOADING);

    const birthYear = new Date(birthDate).getFullYear();
    
    // Slight delay to allow UI to settle before fetching
    try {
        const insights = await fetchAgeInsights(birthYear, result.years);
        setAiData(insights);
        setLoadingAI(LoadingState.SUCCESS);
    } catch (error) {
        console.error("Failed to fetch insights", error);
        setLoadingAI(LoadingState.ERROR);
    }
  }, [birthDate]);

  const handleReset = () => {
    setBirthDate('');
    setAgeResult(null);
    setAiData(null);
    setLoadingAI(LoadingState.IDLE);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-2">
          Kalkulator <span className="text-indigo-600">Umur</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Hitung perjalanan waktu Anda di bumi dengan presisi, dan temukan fakta unik tentang kelahiran Anda.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full flex-1">
              <label htmlFor="birthdate" className="block text-sm font-semibold text-slate-700 mb-2">
                Tanggal Lahir Anda
              </label>
              <input
                type="date"
                id="birthdate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800 bg-slate-50 text-lg"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <button
              onClick={handleCalculate}
              disabled={!birthDate}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Hitung Umur</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            {ageResult && (
               <button
               onClick={handleReset}
               className="w-full md:w-auto px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-semibold rounded-xl transition-all active:scale-95"
             >
               Reset
             </button>
            )}
          </div>
        </div>

        {ageResult && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Main Result */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                label="Tahun" 
                value={ageResult.years} 
                subValue="Putaran Matahari"
                colorClass="text-indigo-600"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <StatsCard 
                label="Bulan" 
                value={ageResult.months} 
                subValue="Bulan Berjalan"
                colorClass="text-pink-500"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
              />
              <StatsCard 
                label="Hari" 
                value={ageResult.days} 
                subValue="Hari Tambahan"
                colorClass="text-blue-500"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
              />
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                  <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Total Hari</span>
                  <span className="text-xl md:text-2xl font-bold text-slate-800">
                    {ageResult.totalDays.toLocaleString('id-ID')}
                  </span>
               </div>
               <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                  <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Ulang Tahun Berikutnya</span>
                  <span className="text-xl md:text-2xl font-bold text-slate-800">
                    {ageResult.nextBirthdayDays} <span className="text-sm font-normal text-slate-500">hari lagi</span>
                  </span>
               </div>
               <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center col-span-2 md:col-span-2">
                  <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Zodiak</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl md:text-2xl font-bold text-purple-600">{ageResult.zodiac}</span>
                  </div>
               </div>
            </div>

            {/* AI Integration */}
            <FunFactCard 
              loadingState={loadingAI} 
              data={aiData} 
              onRetry={() => {
                  setLoadingAI(LoadingState.LOADING);
                  const birthYear = new Date(birthDate).getFullYear();
                  fetchAgeInsights(birthYear, ageResult.years)
                    .then(data => {
                        setAiData(data);
                        setLoadingAI(LoadingState.SUCCESS);
                    })
                    .catch(() => setLoadingAI(LoadingState.ERROR));
              }}
            />
          </div>
        )}
      </main>

      <footer className="mt-12 text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Kalkulator Umur AI.</p>
      </footer>
    </div>
  );
}

export default App;