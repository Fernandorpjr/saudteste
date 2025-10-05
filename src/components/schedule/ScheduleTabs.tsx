import React from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import { DaySchedule } from '../../types/schedule';

interface ScheduleTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  scheduleData: Record<string, DaySchedule>;
  daysOrder: string[];
}

const ScheduleTabs: React.FC<ScheduleTabsProps> = ({ activeTab, setActiveTab, scheduleData, daysOrder }) => {
  return (
    <nav className="flex flex-wrap justify-center gap-3 mb-8">
      <button
        className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
          ${activeTab === 'resumo' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600'}`}
        onClick={() => setActiveTab('resumo')}
      >
        <Calendar className="w-5 h-5" /> Resumo da Semana
      </button>
      {daysOrder.map(dayKey => (
        <button
          key={dayKey}
          className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
            ${activeTab === dayKey ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600'}`}
          onClick={() => setActiveTab(dayKey)}
        >
          <CalendarDays className="w-5 h-5" /> {scheduleData[dayKey]?.title.split('-')[0].trim()}
        </button>
      ))}
    </nav>
  );
};

export default ScheduleTabs;