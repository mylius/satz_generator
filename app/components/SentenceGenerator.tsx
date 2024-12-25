interface SentenceGeneratorProps {
  selectedAnlaute: Set<string>;
  onGenerate: () => void;
}

export const SentenceGenerator = ({ selectedAnlaute, onGenerate }: SentenceGeneratorProps) => (
  <button 
    onClick={onGenerate}
    className={`w-full p-4 rounded-lg ${
      selectedAnlaute.size === 0
        ? 'bg-gray-300 cursor-not-allowed'
        : 'bg-blue-500 text-white hover:bg-blue-600'
    }`}
    disabled={selectedAnlaute.size === 0}
  >
    Sätze generieren
  </button>
);

