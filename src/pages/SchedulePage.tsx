import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';
import { CalendarWeek, CalendarDays, Palette, Edit, Save, Download, Share2, Printer, Eraser, Plus, X } from 'lucide-react';

interface ScheduleSlot {
  horario: string;
  drA: string;
  resA: string;
  resB: string;
  drB: string;
  enfC: string;
  enfD: string;
  tecL: string;
  tecM: string;
  draE: string;
  draF: string;
  agentes: string;
}

interface DaySchedule {
  day_key: string;
  title: string;
  date_text: string;
  schedule_slots: ScheduleSlot[];
}

interface CustomColor {
  id: string;
  name: string;
  color: string;
}

const defaultCustomColors: CustomColor[] = [
  { id: 'baby-blue', name: 'Azul Bebê', color: '#89CFF0' },
  { id: 'light-green', name: 'Verde Claro', color: '#90EE90' },
  { id: 'light-pink', name: 'Rosa Claro', color: '#FFB6C1' },
  { id: 'light-yellow', name: 'Amarelo Claro', color: '#FFFFE0' },
  { id: 'light-purple', name: 'Roxo Claro', color: '#D8BFD8' },
  { id: 'light-orange', name: 'Laranja Claro', color: '#FFD580' },
  { id: 'women-health', name: 'Saúde da Mulher', color: '#FFB6C1' },
  { id: 'pediatrics', name: 'Pediatria', color: '#89CFF0' },
  { id: 'general-practitioner', name: 'Clínico General', color: '#98FB98' }
];

const SchedulePage: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<Record<string, DaySchedule>>({});
  const [activeTab, setActiveTab] = useState<string>('resumo');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCurtainOpen, setIsCurtainOpen] = useState<boolean>(false);
  const [currentPaintingColor, setCurrentPaintingColor] = useState<CustomColor | null>(null);
  const [customColors, setCustomColors] = useState<CustomColor[]>(defaultCustomColors);

  const daysOrder = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

  const fetchScheduleData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('daily_schedules')
        .select('*')
        .order('day_key', { ascending: true });

      if (error) throw error;

      const formattedData: Record<string, DaySchedule> = {};
      data.forEach((day: any) => {
        formattedData[day.day_key] = {
          day_key: day.day_key,
          title: day.title,
          date_text: day.date_text,
          schedule_slots: day.schedule_slots,
        };
      });
      setScheduleData(formattedData);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching schedule data:', err.message);
      setError('Não foi possível carregar o cronograma. Tente novamente mais tarde.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScheduleData();
    const savedColors = localStorage.getItem('customColors');
    if (savedColors) {
      setCustomColors(JSON.parse(savedColors));
    }
  }, [fetchScheduleData]);

  const getCellClass = (cellContent: string) => {
    if (!cellContent) return '';
    const content = cellContent.toLowerCase();
    if (content.includes('almoço')) return 'bg-yellow-400 text-gray-900';
    if (content.includes('coleta')) return 'bg-green-600 text-white';
    if (content.includes('estudo')) return 'bg-teal-600 text-white';
    if (content.includes('vaga')) return 'bg-purple-700 text-white';
    if (content.includes('odonto')) return 'bg-pink-600 text-white';
    return '';
  };

  const renderWeeklySummary = () => {
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
            <CalendarWeek className="w-8 h-8" /> Resumo Semanal
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
              {professionals.map((prof, profIndex) => (
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

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
            <i className="fas fa-user-md"></i> Profissionais da Unidade
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Médicos</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Dr. Rubens Cavalcanti</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Dr. Marcos Augusto</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Dra. Loala Lindoso</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Dra. Sania Buonora</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Residentes</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Dr. Felipe Jacobovitz</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Dra. Sabrynna Mayara</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Enfermeiros</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Enf. Clariane Falcão</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Enf. Tharcia Bezerra</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Técnicos de Enfermagem</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Téc. Enf. Carmen Verônica</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Téc. Enf. (Suporte)</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Agentes de Saúde</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Débora Ellen</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Margareth Lopes</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Simone Firmino</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Jadilene Paz</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Sandra Cristina</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Sandra Tavares</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">Márcia Araújo</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderDaySchedule = (dayKey: string) => {
    const dayData = scheduleData[dayKey];
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
          <p className="text-gray-600 dark:text-gray-300 mt-2" contentEditable={isEditing} suppressContentEditableWarning={true}>
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
                      onClick={(e) => handleCellClick(e, dayKey, slotIndex, key)}
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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
    // Optionally, save changes when exiting edit mode
    if (isEditing) {
      saveSchedule();
    }
  };

  const saveSchedule = async () => {
    try {
      const currentDayData = scheduleData[activeTab];
      if (!currentDayData) return;

      const updatedSlots = currentDayData.schedule_slots.map((slot, slotIndex) => {
        const row = document.querySelectorAll(`tbody tr`)[slotIndex];
        if (!row) return slot;

        const newSlot = { ...slot };
        const cells = row.querySelectorAll('td');
        const slotKeys: (keyof ScheduleSlot)[] = [
          'horario', 'drA', 'resA', 'resB', 'drB', 'enfC', 'enfD', 'tecL', 'tecM', 'draE', 'draF', 'agentes'
        ];

        cells.forEach((cell, cellIndex) => {
          if (cellIndex > 0 && slotKeys[cellIndex]) { // Skip 'horario'
            (newSlot as any)[slotKeys[cellIndex]] = cell.textContent?.trim() || '';
            // Save custom color if applied
            const customColorClass = Array.from(cell.classList).find(cls => cls.startsWith('custom-color-'));
            if (customColorClass) {
              const colorId = customColorClass.replace('custom-color-', '');
              const colorValue = cell.style.backgroundColor;
              (newSlot as any)[`custom_color_${slotKeys[cellIndex]}`] = colorId;
              (newSlot as any)[`custom_color_value_${slotKeys[cellIndex]}`] = colorValue;
            } else {
              delete (newSlot as any)[`custom_color_${slotKeys[cellIndex]}`];
              delete (newSlot as any)[`custom_color_value_${slotKeys[cellIndex]}`];
            }
          }
        });
        return newSlot;
      });

      const { error } = await supabase
        .from('daily_schedules')
        .update({ schedule_slots: updatedSlots, date_text: document.querySelector('.editable-date')?.textContent?.trim() || '' })
        .eq('day_key', activeTab);

      if (error) throw error;

      // Update local state after successful save
      setScheduleData(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          schedule_slots: updatedSlots,
          date_text: document.querySelector('.editable-date')?.textContent?.trim() || ''
        }
      }));
      showNotification('Cronograma salvo com sucesso!', 'success');
    } catch (err: any) {
      console.error('Error saving schedule:', err.message);
      showNotification('Erro ao salvar cronograma.', 'error');
    }
  };

  const exportToCSV = () => {
    const dayData = scheduleData[activeTab];
    if (!dayData || !dayData.schedule_slots || dayData.schedule_slots.length === 0) {
      showNotification('Nenhum dado para exportar.', 'warning');
      return;
    }

    const headers = [
      "Horário", "Dr. Rubens", "Dr. Felipe (R1)", "Dra. Sabrynna (R2)", "Dr. Marcos",
      "Enf. Clariane", "Enf. Tharcia", "Téc. Carmen", "Téc. Suporte", "Dra. Loala",
      "Dra. Sania", "Agentes"
    ];
    const slotKeys: (keyof ScheduleSlot)[] = [
      'horario', 'drA', 'resA', 'resB', 'drB', 'enfC', 'enfD', 'tecL', 'tecM', 'draE', 'draF', 'agentes'
    ];

    let csvContent = "data:text/csv;charset=utf-8," + headers.map(h => `"${h}"`).join(',') + "\n";

    dayData.schedule_slots.forEach(slot => {
      const rowData = slotKeys.map(key => `"${(slot[key] as string).replace(/"/g, '""')}"`).join(',');
      csvContent += rowData + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cronograma-usf-apipucos-${activeTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Arquivo CSV exportado com sucesso!', 'success');
  };

  const printCurrentSchedule = () => {
    const printContent = document.getElementById('schedule-content')?.innerHTML;
    if (!printContent) {
      showNotification('Nenhum conteúdo para imprimir.', 'warning');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Cronograma USF Apipucos</title>
            <style>
                body { font-family: 'Inter', sans-serif; margin: 20px; color: #333; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; page-break-inside: avoid; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px; }
                th { background-color: #f0f0f0; font-weight: bold; }
                h2 { color: #007bff; margin-bottom: 10px; }
                p { margin: 5px 0; font-size: 12px; }
                .bg-yellow-400 { background-color: #ffc107 !important; }
                .bg-green-600 { background-color: #28a745 !important; color: white !important; }
                .bg-teal-600 { background-color: #17a2b8 !important; color: white !important; }
                .bg-purple-700 { background-color: #6f42c1 !important; color: white !important; }
                .bg-pink-600 { background-color: #e83e8c !important; color: white !important; }
                @page { margin: 1cm; size: A4 landscape; }
            </style>
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #007bff; margin: 0;">USF Apipucos</h1>
                <p style="margin: 5px 0;">Cronograma de Atendimento</p>
                <p style="margin: 5px 0; font-size: 12px;">Impresso em: ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            ${printContent}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
      showNotification('Abrindo janela de impressão.', 'info');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    // Implement a simple notification system (e.g., using a state variable and rendering a div)
    // For now, we'll just log to console. In a real app, you'd use a toast library or custom component.
    console.log(`Notification (${type}): ${message}`);
    // Example: setNotification({ message, type });
    // Then render a component based on notification state.
  };

  const getContrastColor = (hexcolor: string) => {
    if (!hexcolor || hexcolor.length < 7) return '#000000'; // Default to black for invalid hex
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  };

  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>, dayKey: string, slotIndex: number, cellKey: keyof ScheduleSlot) => {
    if (isEditing && currentPaintingColor && cellKey !== 'horario') {
      const cell = e.currentTarget;
      const newScheduleData = { ...scheduleData };
      const currentSlot = newScheduleData[dayKey].schedule_slots[slotIndex];

      const customColorIdKey = `custom_color_${cellKey}` as keyof ScheduleSlot;
      const customColorValueKey = `custom_color_value_${cellKey}` as keyof ScheduleSlot;

      if ((currentSlot as any)[customColorIdKey] === currentPaintingColor.id) {
        // Toggle off
        delete (currentSlot as any)[customColorIdKey];
        delete (currentSlot as any)[customColorValueKey];
        cell.style.backgroundColor = '';
        cell.style.color = '';
        cell.classList.remove(`custom-color-${currentPaintingColor.id}`);
      } else {
        // Remove existing custom colors
        Object.keys(currentSlot).forEach(key => {
          if (key.startsWith('custom_color_') && key.endsWith(cellKey as string)) {
            delete (currentSlot as any)[key];
          }
        });
        Array.from(cell.classList).filter(cls => cls.startsWith('custom-color-')).forEach(cls => cell.classList.remove(cls));

        // Apply new color
        (currentSlot as any)[customColorIdKey] = currentPaintingColor.id;
        (currentSlot as any)[customColorValueKey] = currentPaintingColor.color;
        cell.style.backgroundColor = currentPaintingColor.color;
        cell.style.color = getContrastColor(currentPaintingColor.color);
        cell.classList.add(`custom-color-${currentPaintingColor.id}`);
      }
      setScheduleData(newScheduleData);
    }
  };

  const addCustomColor = () => {
    const color = prompt('Digite a cor em formato hexadecimal (ex: #FF5733):');
    if (color && /^#[0-9A-F]{6}$/i.test(color)) {
      const name = prompt('Digite o nome da cor:') || 'Cor Personalizada';
      const id = 'custom-' + Date.now();
      const newColor: CustomColor = { id, name, color };
      setCustomColors(prev => {
        const updatedColors = [...prev, newColor];
        localStorage.setItem('customColors', JSON.stringify(updatedColors));
        return updatedColors;
      });
      showNotification('Cor adicionada com sucesso!', 'success');
    } else if (color) {
      showNotification('Formato de cor inválido. Use formato hex (#FF5733)', 'error');
    }
  };

  const clearAllCustomColors = () => {
    const confirmation = window.confirm("Tem certeza que deseja remover todas as cores personalizadas das células?");
    if (!confirmation) return;

    const newScheduleData = { ...scheduleData };
    Object.values(newScheduleData).forEach(day => {
      day.schedule_slots.forEach(slot => {
        Object.keys(slot).forEach(key => {
          if (key.startsWith('custom_color_')) {
            delete (slot as any)[key];
          }
        });
      });
    });
    setScheduleData(newScheduleData);
    showNotification('Cores personalizadas limpas com sucesso!', 'success');
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
      <header className="text-center mb-8 bg-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2">Cronograma USF Apipucos</h1>
        <p className="text-xl opacity-90">Sistema Avançado de Agendamento e Visualização</p>
      </header>

      <nav className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
            ${activeTab === 'resumo' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600'}`}
          onClick={() => handleTabClick('resumo')}
        >
          <CalendarWeek className="w-5 h-5" /> Resumo da Semana
        </button>
        {daysOrder.map(dayKey => (
          <button
            key={dayKey}
            className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
              ${activeTab === dayKey ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600'}`}
            onClick={() => handleTabClick(dayKey)}
          >
            <CalendarDays className="w-5 h-5" /> {scheduleData[dayKey]?.title.split('-')[0].trim()}
          </button>
        ))}
      </nav>

      <main id="schedule-content" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 min-h-[500px]">
        {activeTab === 'resumo' ? renderWeeklySummary() : renderDaySchedule(activeTab)}
      </main>

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
          onClick={exportToCSV}
        >
          <Download className="w-5 h-5" /> Exportar CSV
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          onClick={printCurrentSchedule}
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

      {/* Curtain Panel for Colors */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isCurtainOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Palette className="w-5 h-5" /> Paleta de Cores
            </h3>
            <button onClick={() => setIsCurtainOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4" /> Cores Personalizadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {customColors.map(color => (
                <button
                  key={color.id}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200
                    ${currentPaintingColor?.id === color.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 dark:border-gray-600 hover:scale-105'}`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                  onClick={() => setCurrentPaintingColor(color)}
                ></button>
              ))}
              <button
                className="w-10 h-10 rounded-full border-2 border-dashed border-gray-400 dark:border-gray-500 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={addCustomColor}
                title="Adicionar nova cor"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
              onClick={clearAllCustomColors}
            >
              <Eraser className="w-5 h-5" /> Limpar Cores das Células
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
              onClick={() => setCurrentPaintingColor(null)}
            >
              <X className="w-5 h-5" /> Desativar Modo Pintura
            </button>
          </div>
        </div>
      </div>

      {/* Curtain Panel Toggle Button */}
      <button
        className="fixed top-1/2 right-0 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-l-lg shadow-lg z-50 transition-colors duration-200"
        onClick={() => setIsCurtainOpen(prev => !prev)}
        title={isCurtainOpen ? 'Fechar paleta de cores' : 'Abrir paleta de cores'}
      >
        {isCurtainOpen ? <X className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
      </button>

      <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; 2025 Unidade de Saúde da Família Apipucos - Sistema desenvolvido para melhor atendimento à comunidade</p>
      </footer>
    </div>
  );
};

export default SchedulePage;