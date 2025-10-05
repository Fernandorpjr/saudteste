import React from 'react';
import { Edit, Save, Download, Share2, Printer } from 'lucide-react';
import { showNotification } from '../../utils/scheduleUtils';
import { DaySchedule } from '../../types/schedule';

interface ScheduleActionsProps {
  isEditing: boolean;
  toggleEditing: () => void;
  exportToCSV: (dayData: DaySchedule, activeTab: string) => void;
  printCurrentSchedule: (contentHtml: string) => void;
  activeTab: string;
  currentDayData: DaySchedule | undefined;
}

const ScheduleActions: React.FC<ScheduleActionsProps> = ({
  isEditing,
  toggleEditing,
  exportToCSV,
  printCurrentSchedule,
  activeTab,
  currentDayData
}) => {
  const handlePrint = () => {
    const printContent = document.getElementById('schedule-content')?.innerHTML;
    if (printContent) {
      printCurrentSchedule(printContent);
    } else {
      showNotification('Nenhum conteúdo para imprimir.', 'warning');
    }
  };

  const handleExport = () => {
    if (currentDayData) {
      exportToCSV(currentDayData, activeTab);
    } else {
      showNotification('Nenhum dado para exportar.', 'warning');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <button
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
        onClick={toggleEditing}
      >
        {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
        {isEditing ? 'Salvar Alterações' : 'Editar Cronograma'}
      </button>
      <button
        className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
        onClick={handleExport}
      >
        <Download className="w-5 h-5" /> Exportar CSV
      </button>
      <button
        className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
        onClick={handlePrint}
      >
        <Printer className="w-5 h-5" /> Imprimir Cronograma
      </button>
      <button
        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
        onClick={() => showNotification('Funcionalidade de WhatsApp em desenvolvimento!', 'info')}
      >
        <Share2 className="w-5 h-5" /> Compartilhar WhatsApp
      </button>
    </div>
  );
};

export default ScheduleActions;