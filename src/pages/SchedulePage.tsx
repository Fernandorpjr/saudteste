import React, { useState } from 'react';
import { useScheduleData } from '../hooks/useScheduleData';
import ScheduleHeader from '../components/schedule/ScheduleHeader';
import ScheduleTabs from '../components/schedule/ScheduleTabs';
import WeeklySummaryTable from '../components/schedule/WeeklySummaryTable';
import DayScheduleTable from '../components/schedule/DayScheduleTable';
import ScheduleActions from '../components/schedule/ScheduleActions';
import ScheduleLegend from '../components/schedule/ScheduleLegend';
import ProfessionalsList from '../components/schedule/ProfessionalsList';
import ColorPaletteCurtain from '../components/schedule/ColorPaletteCurtain';
import { exportToCSV, printCurrentSchedule } from '../utils/scheduleUtils';
// Imports 'X' e 'Palette' removidos, pois são usados apenas no ColorPaletteCurtain
// import { X, Palette } from 'lucide-react'; 

const SchedulePage: React.FC = () => {
  const {
    scheduleData,
    loading,
    error,
    isEditing,
    setIsEditing,
    activeTab,
    setActiveTab,
    customColors,
    currentPaintingColor,
    setCurrentPaintingColor,
    saveSchedule,
    addCustomColor,
    clearAllCustomColors,
    handleCellClick,
    fetchScheduleData,
  } = useScheduleData();

  const [isCurtainOpen, setIsCurtainOpen] = useState<boolean>(false);
  const daysOrder = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
  const currentDayData = scheduleData[activeTab];

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
    if (isEditing) { // Se estiver saindo do modo de edição, salva as alterações
      saveSchedule();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-blue-700 dark:text-blue-300 text-lg">Carregando cronograma...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 p-4">
        <i className="fas fa-exclamation-triangle text-5xl mb-4"></i>
        <h2 className="text-2xl font-bold mb-2">Erro ao carregar dados</h2>
        <p className="text-lg text-center">{error}</p>
        <button
          onClick={fetchScheduleData}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-colors duration-200"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <ScheduleHeader />

      <ScheduleTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scheduleData={scheduleData}
        daysOrder={daysOrder}
      />

      <main id="schedule-content" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 min-h-[500px]">
        {activeTab === 'resumo' ? (
          <>
            <WeeklySummaryTable
              scheduleData={scheduleData}
              daysOrder={daysOrder}
              isEditing={isEditing}
            />
            <ScheduleLegend customColors={customColors} />
            <ProfessionalsList />
          </>
        ) : (
          <DayScheduleTable
            dayData={currentDayData}
            isEditing={isEditing}
            handleCellClick={handleCellClick}
          />
        )}
      </main>

      <ScheduleActions
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        exportToCSV={exportToCSV}
        printCurrentSchedule={printCurrentSchedule}
        activeTab={activeTab}
        currentDayData={currentDayData}
      />

      <ColorPaletteCurtain
        isCurtainOpen={isCurtainOpen}
        setIsCurtainOpen={setIsCurtainOpen}
        customColors={customColors}
        currentPaintingColor={currentPaintingColor}
        setCurrentPaintingColor={setCurrentPaintingColor}
        addCustomColor={addCustomColor}
        clearAllCustomColors={clearAllCustomColors}
      />

      <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; 2025 Unidade de Saúde da Família Apipucos - Sistema desenvolvido para melhor atendimento à comunidade</p>
      </footer>
    </div>
  );
};

export default SchedulePage;