import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 mb-4">
          Cronograma USF Apipucos
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Sistema Avançado de Agendamento e Visualização
        </p>
      </header>

      <nav className="flex flex-col md:flex-row gap-6">
        <Link
          to="/sisreg"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-lg"
        >
          <i className="fas fa-search mr-3"></i> Demonstrativo SISREG
        </Link>
        <Link
          to="/flor"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-lg"
        >
          <i className="fas fa-robot mr-3"></i> Flor - Recepcionista Virtual
        </Link>
      </nav>

      <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; 2025 Unidade de Saúde da Família Apipucos</p>
        <p>O cronograma será integrado aqui em breve.</p>
      </footer>
    </div>
  );
};

export default IndexPage;