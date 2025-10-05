import React from 'react';

const ProfessionalsList: React.FC = () => {
  return (
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
  );
};

export default ProfessionalsList;