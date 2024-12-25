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
            <span 
              key={anlaut} 
              className={`px-3 py-1 text-center rounded-lg ${
                index < sliderValue 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {anlaut}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
