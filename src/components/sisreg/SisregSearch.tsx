import React, { useState } from 'react';
import { Search, ListFilter } from 'lucide-react';
import { sisregProcedures } from '../../data/sisregProcedures';

interface Procedure {
  id: number;
  code: string;
  name: string;
}

const SisregSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Procedure[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const performSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = sisregProcedures.filter(proc =>
      proc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.code.includes(searchTerm)
    );
    setSearchResults(filtered);
    setShowAll(false); // Esconde a lista completa ao fazer uma nova busca
  };

  const demoExample = (example: string) => {
    setSearchTerm(example);
    const filtered = sisregProcedures.filter(proc =>
      proc.name.toLowerCase().includes(example.toLowerCase()) ||
      proc.code.includes(example)
    );
    setSearchResults(filtered);
    setShowAll(false);
  };

  const toggleShowAllProcedures = () => {
    setShowAll(prev => !prev);
    setSearchResults([]); // Limpa os resultados da busca ao mostrar todos
    setSearchTerm(''); // Limpa o termo de busca
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg my-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-3 flex items-center justify-center gap-3">
          <Search className="w-9 h-9" /> Demonstração SISREG
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Como sua recepcionista virtual ajudará a encontrar procedimentos rapidamente
        </p>
      </header>

      <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-700 p-5 mb-8 rounded-r-lg">
        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Exemplo de uso:</h3>
        <p className="text-gray-700 dark:text-gray-200">Você diz: <strong className="text-blue-700 dark:text-blue-300">"colonoscopia"</strong></p>
        <p className="text-gray-700 dark:text-gray-200">Recepcionista responde: <strong className="text-blue-700 dark:text-blue-300">"Número 6"</strong></p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner mb-8">
        <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Experimente você mesmo:</h3>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            id="searchInput"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100"
            placeholder="Digite o nome ou código do procedimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && performSearch()}
          />
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={performSearch}
          >
            <Search className="w-5 h-5" /> Buscar
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg mt-4 text-blue-800 dark:text-blue-100">
            <h4 className="font-semibold mb-2">Resultados da busca:</h4>
            {searchResults.length === 1 ? (
              <p>O procedimento "<strong>{searchResults[0].name}</strong>" tem o número <strong>{searchResults[0].id}</strong> na lista.</p>
            ) : (
              <>
                <p>Encontrei {searchResults.length} procedimentos:</p>
                <ul className="list-disc list-inside mt-2">
                  {searchResults.slice(0, 5).map(proc => (
                    <li key={proc.id}><strong>{proc.id}.</strong> {proc.name} ({proc.code})</li>
                  ))}
                  {searchResults.length > 5 && (
                    <li>... e mais {searchResults.length - 5} procedimentos.</li>
                  )}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={() => demoExample('colonoscopia')}
        >
          Exemplo: colonoscopia
        </button>
        <button
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={() => demoExample('vacina')}
        >
          Exemplo: vacina
        </button>
        <button
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={() => demoExample('0209010029')}
        >
          Exemplo: código
        </button>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 p-5 mb-8 rounded-r-lg">
        <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Como funciona:</h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
          <li>Lista completa com todos os 98 procedimentos SISREG</li>
          <li>Busca instantânea por nome ou código do procedimento</li>
          <li>Resposta imediata com o número do procedimento na lista</li>
          <li>Interface otimizada para uso rápido na recepção</li>
          <li>Design responsivo que funciona em qualquer dispositivo</li>
        </ul>
      </div>

      <div className="text-center mt-8">
        <button
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
          onClick={toggleShowAllProcedures}
        >
          <ListFilter className="w-5 h-5" /> {showAll ? 'Esconder todos os procedimentos' : 'Ver todos os procedimentos'}
        </button>
      </div>

      {showAll && (
        <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 max-h-96 overflow-y-auto shadow-inner">
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Todos os procedimentos:</h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-600">
            {sisregProcedures.map(proc => (
              <li key={proc.id} className="py-2 text-gray-700 dark:text-gray-200">
                <strong>{proc.id}.</strong> {proc.name} <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">({proc.code})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SisregSearch;