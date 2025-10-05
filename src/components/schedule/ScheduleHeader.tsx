import React from 'react';

const ScheduleHeader: React.FC = () => {
  return (
    <header className="text-center mb-8 bg-blue-700 text-white p-6 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-2">Cronograma USF Apipucos</h1>
      <p className="text-xl opacity-90">Sistema Avançado de Agendamento e Visualização</p>
    </header>
  );
};

export default ScheduleHeader;