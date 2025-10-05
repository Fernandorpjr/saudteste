import { DaySchedule, ScheduleSlot } from '../types/schedule';

export const getCellClass = (cellContent: string): string => {
  if (!cellContent) return '';
  const content = cellContent.toLowerCase();
  if (content.includes('almoço')) return 'bg-yellow-400 text-gray-900';
  if (content.includes('coleta')) return 'bg-green-600 text-white';
  if (content.includes('estudo')) return 'bg-teal-600 text-white';
  if (content.includes('vaga')) return 'bg-purple-700 text-white';
  if (content.includes('odonto')) return 'bg-pink-600 text-white';
  return '';
};

export const getContrastColor = (hexcolor: string): string => {
  if (!hexcolor || hexcolor.length < 7) return '#000000';
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
};

export const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
  // Implementação simples de notificação via console. Em um app real, usaria uma biblioteca de toast.
  console.log(`Notification (${type}): ${message}`);
  // Você pode expandir isso para usar um componente de toast real, por exemplo:
  // toast[type](message);
};

export const exportToCSV = (dayData: DaySchedule, activeTab: string) => {
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

export const printCurrentSchedule = (contentHtml: string) => {
  if (!contentHtml) {
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
          ${contentHtml}
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