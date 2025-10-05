export interface ScheduleSlot {
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
  // Propriedades dinâmicas para cores personalizadas
  [key: string]: string | ScheduleSlot[keyof ScheduleSlot];
}

export interface DaySchedule {
  day_key: string;
  title: string;
  date_text: string;
  schedule_slots: ScheduleSlot[];
}

export interface CustomColor {
  id: string;
  name: string;
  color: string;
}

export const defaultCustomColors: CustomColor[] = [
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