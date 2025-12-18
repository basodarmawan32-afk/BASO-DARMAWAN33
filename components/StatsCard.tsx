import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  colorClass: string;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, subValue, colorClass, icon }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 shadow-sm border border-slate-100 bg-white hover:shadow-md transition-shadow duration-300`}>
      <div className={`absolute top-0 right-0 p-4 opacity-10 ${colorClass}`}>
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
        <h3 className={`text-4xl font-bold ${colorClass.replace('text-', 'text-slate-800 ')}`}>
          {value}
        </h3>
        {subValue && (
          <p className="text-sm text-slate-400 mt-1">{subValue}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;