import React from 'react';

const FlorPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-blue-700 text-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-bold">Flor - Recepcionista Virtual</h1>
        <a href="/" className="text-white hover:text-blue-200 transition-colors">
          <i className="fas fa-home mr-2"></i> Voltar ao Cronograma
        </a>
      </header>
      <div className="flex-grow">
        <iframe
          src="/flor-recepcionista-virtual.html"
          title="Flor Recepcionista Virtual"
          className="w-full h-full border-none"
        ></iframe>
      </div>
    </div>
  );
};

export default FlorPage;