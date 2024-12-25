import { Dispatch, SetStateAction } from 'react';
import { ANLAUTE } from '../constants';

interface AnlauteSelectorProps {
  sliderValue: number;
  setSliderValue: Dispatch<SetStateAction<number>>;
  setSelectedAnlaute: Dispatch<SetStateAction<Set<string>>>;
}

export const AnlauteSelector = ({ sliderValue, setSliderValue, setSelectedAnlaute }: AnlauteSelectorProps) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateValues(value);
  };

  const handleAnlautClick = (index: number) => {
    updateValues(index + 1);
  };

  const updateValues = (value: number) => {
    setSliderValue(value);
    setSelectedAnlaute(new Set(ANLAUTE.slice(0, value)));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Anlaute auswählen</h2>
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={ANLAUTE.length}
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full"
        />
        <div className="mt-4 grid grid-cols-11 gap-2">
          {ANLAUTE.map((anlaut, index) => (
            <button 
              key={anlaut} 
              onClick={() => handleAnlautClick(index)}
              className={`px-3 py-1 text-center rounded-lg transition-colors ${
                index < sliderValue 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {anlaut}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
