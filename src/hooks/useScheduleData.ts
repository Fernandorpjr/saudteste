import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';
import { DaySchedule, ScheduleSlot, CustomColor, defaultCustomColors } from '../types/schedule';
import { showNotification, getContrastColor } from '../utils/scheduleUtils';

interface UseScheduleDataResult {
  scheduleData: Record<string, DaySchedule>;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  customColors: CustomColor[];
  setCustomColors: React.Dispatch<React.SetStateAction<CustomColor[]>>;
  currentPaintingColor: CustomColor | null;
  setCurrentPaintingColor: React.Dispatch<React.SetStateAction<CustomColor | null>>;
  saveSchedule: () => Promise<void>;
  addCustomColor: () => void;
  clearAllCustomColors: () => void;
  handleCellClick: (e: React.MouseEvent<HTMLTableCellElement>, dayKey: string, slotIndex: number, cellKey: keyof ScheduleSlot) => void;
  fetchScheduleData: () => Promise<void>;
}

export const useScheduleData = (): UseScheduleDataResult => {
  const [scheduleData, setScheduleData] = useState<Record<string, DaySchedule>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('resumo');
  const [customColors, setCustomColors] = useState<CustomColor[]>(defaultCustomColors);
  const [currentPaintingColor, setCurrentPaintingColor] = useState<CustomColor | null>(null);

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

  const saveSchedule = useCallback(async () => {
    try {
      const currentDayData = scheduleData[activeTab];
      if (!currentDayData) return;

      // Create a deep copy to avoid direct state mutation issues
      const updatedSlots = JSON.parse(JSON.stringify(currentDayData.schedule_slots));

      // Iterate through the DOM to get current editable values
      const tableElement = document.getElementById('schedule-content')?.querySelector('table');
      if (!tableElement) {
        showNotification('Erro: Tabela não encontrada para salvar.', 'error');
        return;
      }

      const rows = tableElement.querySelectorAll('tbody tr');
      const slotKeys: (keyof ScheduleSlot)[] = [
        'horario', 'drA', 'resA', 'resB', 'drB', 'enfC', 'enfD', 'tecL', 'tecM', 'draE', 'draF', 'agentes'
      ];

      rows.forEach((row, slotIndex) => {
        if (updatedSlots[slotIndex]) {
          const newSlot = updatedSlots[slotIndex];
          const cells = row.querySelectorAll('td');

          cells.forEach((cell, cellIndex) => {
            if (cellIndex > 0 && slotKeys[cellIndex]) { // Skip 'horario'
              const key = slotKeys[cellIndex];
              (newSlot as any)[key] = cell.textContent?.trim() || '';

              // Save custom color if applied
              const customColorClass = Array.from(cell.classList).find(cls => cls.startsWith('custom-color-'));
              if (customColorClass) {
                const colorId = customColorClass.replace('custom-color-', '');
                const colorValue = cell.style.backgroundColor;
                (newSlot as any)[`custom_color_${key}`] = colorId;
                (newSlot as any)[`custom_color_value_${key}`] = colorValue;
              } else {
                delete (newSlot as any)[`custom_color_${key}`];
                delete (newSlot as any)[`custom_color_value_${key}`];
              }
            }
          });
        }
      });

      const dateTextElement = document.getElementById('schedule-content')?.querySelector('.editable-date');
      const updatedDateText = dateTextElement?.textContent?.trim() || currentDayData.date_text;

      const { error } = await supabase
        .from('daily_schedules')
        .update({ schedule_slots: updatedSlots, date_text: updatedDateText })
        .eq('day_key', activeTab);

      if (error) throw error;

      // Update local state after successful save
      setScheduleData(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          schedule_slots: updatedSlots,
          date_text: updatedDateText
        }
      }));
      showNotification('Cronograma salvo com sucesso!', 'success');
    } catch (err: any) {
      console.error('Error saving schedule:', err.message);
      showNotification('Erro ao salvar cronograma.', 'error');
    }
  }, [scheduleData, activeTab]);

  const handleCellClick = useCallback((e: React.MouseEvent<HTMLTableCellElement>, dayKey: string, slotIndex: number, cellKey: keyof ScheduleSlot) => {
    if (isEditing && currentPaintingColor && cellKey !== 'horario') {
      const cell = e.currentTarget;
      setScheduleData(prev => {
        const newScheduleData = { ...prev };
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
        return newScheduleData;
      });
    }
  }, [isEditing, currentPaintingColor]);

  const addCustomColor = useCallback(() => {
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
  }, []);

  const clearAllCustomColors = useCallback(() => {
    const confirmation = window.confirm("Tem certeza que deseja remover todas as cores personalizadas das células?");
    if (!confirmation) return;

    setScheduleData(prev => {
      const newScheduleData = { ...prev };
      Object.values(newScheduleData).forEach(day => {
        day.schedule_slots.forEach(slot => {
          Object.keys(slot).forEach(key => {
            if (key.startsWith('custom_color_')) {
              delete (slot as any)[key];
            }
          });
        });
      });
      return newScheduleData;
    });
    showNotification('Cores personalizadas limpas com sucesso!', 'success');
  }, []);

  return {
    scheduleData,
    loading,
    error,
    isEditing,
    setIsEditing,
    activeTab,
    setActiveTab,
    customColors,
    setCustomColors,
    currentPaintingColor,
    setCurrentPaintingColor,
    saveSchedule,
    addCustomColor,
    clearAllCustomColors,
    handleCellClick,
    fetchScheduleData,
  };
};