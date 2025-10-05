import React from 'react';
import { Palette } from 'lucide-react';
import { CustomColor, defaultCustomColors } from '../../types/schedule';

interface ScheduleLegendProps {
  customColors: CustomColor[];
}

const ScheduleLegend: React.FC<ScheduleLegendProps> = ({ customColors }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5" /> Legenda de Cores
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
          <div className="w-6 h-6 rounded-md mr-3 bg-yellow-400 border border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-700 dark:text-gray-200">Horário de Almoço</span>
        </div>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
          <div className="w-6 h-6 rounded-md mr-3 bg-green-600 border border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-700 dark:text-gray-200">Coleta de Exames</span>
        </div>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
          <div className="w-6 h-6 rounded-md mr-3 bg-teal-600 border border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-700 dark:text-gray-200">Dia de Estudo</span>
        </div>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
          <div className="w-6 h-6 rounded-md mr-3 bg-purple-700 border border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-700 dark:text-gray-200">Vagas Disponíveis</span>
        </div>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
          <div className="w-6 h-6 rounded-md mr-3 bg-pink-600 border border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-700 dark:text-gray-200">Atendimento Odontológico</span>
        </div>
        {customColors.filter(c => !defaultCustomColors.some(dc => dc.id === c.id)).map(color => (
          <div key={color.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
            <div className="w-6 h-6 rounded-md mr-3 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: color.color }}></div>
            <span className="text-gray-700 dark:text-gray-200">{color.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleLegend;