import React from 'react';
import { CalendarDays } from 'lucide-react';
import { DaySchedule, ScheduleSlot } from '../../types/schedule';
import { getCellClass, getContrastColor } from '../../utils/scheduleUtils';

interface DayScheduleTableProps {
  dayData: DaySchedule;
  isEditing: boolean;
  handleCellClick: (e: React.MouseEvent<HTMLTableCellElement>, dayKey: string, slotIndex: number, cellKey: keyof ScheduleSlot) => void;
}

const DayScheduleTable: React.FC<DayScheduleTableProps> = ({ dayData, isEditing, handleCellClick }) => {
  if (!dayData || !dayData.schedule_slots || dayData.schedule_slots.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-300">Nenhum horário disponível para este dia.</p>;
  }

  const headers = [
    "Horário", "Dr. Rubens", "Dr. Felipe (R1)", "Dra. Sabrynna (R2)", "Dr. Marcos",
    "Enf. Clariane", "Enf. Tharcia", "Téc. Carmen", "Téc. Suporte", "Dra. Loala",
    "Dra. Sania", "Agentes"
  ];
  const slotKeys: (keyof ScheduleSlot)[] = [
    'horario', 'drA', 'resA', 'resB', 'drB', 'enfC', 'enfD', 'tecL', 'tecM', 'draE', 'draF', 'agentes'
  ];

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
          <CalendarDays className="w-8 h-8" /> {dayData.title}
        </h2>
        <p className="editable-date text-gray-600 dark:text-gray-300 mt-2" contentEditable={isEditing} suppressContentEditableWarning={true}>
          {dayData.date_text}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 dark:bg-blue-800 text-white">
            <tr>
              {headers.map(header => (
                <th key={header} className="py-3 px-4 text-sm font-semibold uppercase tracking-wider border-r border-blue-500 dark:border-blue-700 last:border-r-0">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {dayData.schedule_slots.map((slot, slotIndex) => (
              <tr key={slotIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                {slotKeys.map((key, cellIndex) => (
                  <td
                    key={cellIndex}
                    contentEditable={isEditing && key !== 'horario'}
                    className={`py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 last:border-r-0
                      ${key === 'horario' ? 'font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap' : ''}
                      ${getCellClass(slot[key] as string)}
                      ${(slot as any)[`custom_color_${key}`] ? `custom-color-${(slot as any)[`custom_color_${key}`]}` : ''}
                    `}
                    style={{
                      backgroundColor: (slot as any)[`custom_color_value_${key}`] || '',
                      color: (slot as any)[`custom_color_value_${key}`] ? getContrastColor((slot as any)[`custom_color_value_${key}`]) : ''
                    }}
                    suppressContentEditableWarning={true}
                    onClick={(e) => handleCellClick(e, dayData.day_key, slotIndex, key)}
                  >
                    {slot[key] as string}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DayScheduleTable;