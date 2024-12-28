interface SentenceGeneratorProps {
  selectedAnlaute: Set<string>;
  onGenerate: () => void;
}

export const SentenceGenerator = ({ selectedAnlaute, onGenerate }: SentenceGeneratorProps) => (
  <button 
    onClick={onGenerate}
    className={`px-6 py-3 rounded-lg transition-colors ${
      selectedAnlaute.size === 0
        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
    }`}
    disabled={selectedAnlaute.size === 0}
  >
    Sätze generieren
  </button>
);

