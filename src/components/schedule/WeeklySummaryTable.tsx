import React from 'react';
import { Calendar } from 'lucide-react';
import { DaySchedule } from '../../types/schedule'; // Removido CustomColor
import { getCellClass } from '../../utils/scheduleUtils'; // Importado getCellClass

interface WeeklySummaryTableProps {
  scheduleData: Record<string, DaySchedule>;
  daysOrder: string[];
  isEditing: boolean;
}

const WeeklySummaryTable: React.FC<WeeklySummaryTableProps> = ({ scheduleData, daysOrder, isEditing }) => {
  const professionals = [
    "Dr. Rubens Cavalcanti", "Dr. Felipe Jacobovitz (R1)", "Dra. Sabrynna Mayara (R2)",
    "Dr. Marcos Augusto", "Enf. Clariane Falcão", "Enf. Tharcia Bezerra",
    "Téc. Enf. Carmen Verônica", "Téc. Enf. (Suporte)", "Dra. Loala Lindoso",
    "Dra. Sania Buonora", "Agentes de Saúde"
  ];

  const summaryData: Record<string, Record<string, string>> = {
    "Dr. Rubens Cavalcanti": { segundaManha: "Atendimento", segundaTarde: "Atendimento", tercaManha: "Atendimento", tercaTarde: "Atendimento", quartaManha: "Atendimento", quartaTarde: "Atendimento", quintaManha: "Atendimento", quintaTarde: "Atendimento", sextaManha: "Atendimento", sextaTarde: "Atendimento" },
    "Dr. Felipe Jacobovitz (R1)": { segundaManha: "Atendimento", segundaTarde: "-", tercaManha: "Atendimento", tercaTarde: "-", quartaManha: "Atendimento", quartaTarde: "-", quintaManha: "Atendimento", quintaTarde: "-", sextaManha: "Atendimento", sextaTarde: "-" },
    "Dra. Sabrynna Mayara (R2)": { segundaManha: "-", segundaTarde: "-", tercaManha: "Atendimento", tercaTarde: "-", quartaManha: "Atendimento", quartaTarde: "-", quintaManha: "Atendimento", quintaTarde: "-", sextaManha: "Atendimento", sextaTarde: "-" },
    "Dr. Marcos Augusto": { segundaManha: "Atendimento", segundaTarde: "Atendimento", tercaManha: "Atendimento", tercaTarde: "Atendimento", quartaManha: "Atendimento", quartaTarde: "Atendimento", quintaManha: "Atendimento", quintaTarde: "Atendimento", sextaManha: "Atendimento", sextaTarde: "Atendimento" },
    "Enf. Clariane Falcão": { segundaManha: "Atendimento", segundaTarde: "Atendimento", tercaManha: "Estudo", tercaTarde: "Atendimento", quartaManha: "Atendimento", quartaTarde: "Atendimento", quintaManha: "Atendimento", quintaTarde: "Atendimento", sextaManha: "Atendimento", sextaTarde: "Atendimento" },
    "Enf. Tharcia Bezerra": { segundaManha: "Coleta", segundaTarde: "Atendimento", tercaManha: "Coleta", tercaTarde: "Atendimento", quartaManha: "Coleta", quartaTarde: "Atendimento", quintaManha: "Coleta", quintaTarde: "Atendimento", sextaManha: "Coleta", sextaTarde: "Atendimento" },
    "Téc. Enf. Carmen Verônica": { segundaManha: "Atendimento", segundaTarde: "Atendimento", tercaManha: "Atendimento", tercaTarde: "Atendimento", quartaManha: "Atendimento", quartaTarde: "Atendimento", quintaManha: "Atendimento", quintaTarde: "Atendimento", sextaManha: "Atendimento", sextaTarde: "Atendimento" },
    "Téc. Enf. (Suporte)": { segundaManha: "Coleta", segundaTarde: "Atendimento", tercaManha: "Coleta", tercaTarde: "Atendimento", quartaManha: "Coleta", quartaTarde: "Atendimento", quintaManha: "Coleta", quintaTarde: "Atendimento", sextaManha: "Coleta", sextaTarde: "Atendimento" },
    "Dra. Loala Lindoso": { segundaManha: "Atendimento", segundaTarde: "Atendimento", tercaManha: "Atendimento", tercaTarde: "Atendimento", quartaManha: "Atendimento", quartaTarde: "Atendimento", quintaManha: "Atendimento", quintaTarde: "Atendimento", sextaManha: "Atendimento", sextaTarde: "Atendimento" },
    "Dra. Sania Buonora": { segundaManha: "Atendimento", segundaTarde: "Atendimento", tercaManha: "Atendimento", tercaTarde: "Atendimento", quartaManha: "Atendimento", quartaTarde: "Atendimento", quintaManha: "Atendimento", quintaTarde: "Atendimento", sextaManha: "Atendimento", sextaTarde: "Atendimento" },
    "Agentes de Saúde": { segundaManha: "Visitas", segundaTarde: "Visitas", tercaManha: "Visitas", tercaTarde: "Visitas", quartaManha: "Visitas", quartaTarde: "Visitas", quintaManha: "Visitas", quintaTarde: "Visitas", sextaManha: "Reunião", sextaTarde: "Atividades" }
  };

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
          <Calendar className="w-8 h-8" /> Resumo Semanal
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Visão geral dos horários de funcionamento da USF Apipucos</p>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 dark:bg-blue-800 text-white">
            <tr>
              <th rowSpan={2} className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Profissional</th>
              {daysOrder.map(day => (
                <th colSpan={2} key={day} className="py-3 px-4 text-center text-sm font-semibold uppercase tracking-wider border-l border-blue-500 dark:border-blue-700">
                  {scheduleData[day]?.title.split('-')[0].trim()}
                </th>
              ))}
            </tr>
            <tr>
              {daysOrder.map(day => (
                <React.Fragment key={`${day}-periods`}>
                  <th className="py-2 px-3 text-center text-xs font-medium uppercase border-l border-blue-500 dark:border-blue-700">Manhã</th>
                  <th className="py-2 px-3 text-center text-xs font-medium uppercase">Tarde</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {professionals.map((prof) => (
              <tr key={prof} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{prof}</td>
                {daysOrder.map(day => (
                  <React.Fragment key={`${prof}-${day}`}>
                    <td
                      contentEditable={isEditing}
                      className={`py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-200 dark:border-gray-700 ${getCellClass(summaryData[prof][`${day}Manha`])}`}
                      suppressContentEditableWarning={true}
                    >
                      {summaryData[prof][`${day}Manha`]}
                    </td>
                    <td
                      contentEditable={isEditing}
                      className={`py-3 px-4 text-sm text-gray-700 dark:text-gray-300 ${getCellClass(summaryData[prof][`${day}Tarde`])}`}
                      suppressContentEditableWarning={true}
                    >
                      {summaryData[prof][`${day}Tarde`]}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WeeklySummaryTable;