import React from 'react';
import { Palette, Plus, Eraser, X } from 'lucide-react';
import { CustomColor } from '../../types/schedule';

interface ColorPaletteCurtainProps {
  isCurtainOpen: boolean;
  setIsCurtainOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void; // Corrigido o tipo para aceitar função
  customColors: CustomColor[];
  currentPaintingColor: CustomColor | null;
  setCurrentPaintingColor: (color: CustomColor | null) => void;
  addCustomColor: () => void;
  clearAllCustomColors: () => void;
}

const ColorPaletteCurtain: React.FC<ColorPaletteCurtainProps> = ({
  isCurtainOpen,
  setIsCurtainOpen,
  customColors,
  currentPaintingColor,
  setCurrentPaintingColor,
  addCustomColor,
  clearAllCustomColors,
}) => {
  return (
    <>
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
        onClick={() => setIsCurtainOpen((prev: boolean) => !prev)} // Corrigido o tipo de 'prev'
        title={isCurtainOpen ? 'Fechar paleta de cores' : 'Abrir paleta de cores'}
      >
        {isCurtainOpen ? <X className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
      </button>
    </>
  );
};

export default ColorPaletteCurtain;