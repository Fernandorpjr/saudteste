import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react'; // Importando o ícone Home do Lucide React
import SisregSearch from '../components/sisreg/SisregSearch';

const SisregPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-blue-700 text-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-bold">Demonstração SISREG</h1>
        <Link to="/" className="text-white hover:text-blue-200 transition-colors flex items-center gap-2">
          <Home className="w-5 h-5" /> Voltar ao Início
        </Link>
      </header>
      <div className="flex-grow p-4">
        <SisregSearch />
      </div>
    </div>
  );
};

export default SisregPage;