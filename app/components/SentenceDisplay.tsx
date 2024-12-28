import { Printer } from 'lucide-react';

interface SentenceDisplayProps {
  sentences: string[];
  onPrint: () => void;
}

export const SentenceDisplay = ({ sentences, onPrint }: SentenceDisplayProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Übungssätze</h2>
      <button 
        onClick={onPrint}
        className="flex items-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg 
                 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 
                 transition-colors"
      >
        <Printer className="w-4 h-4 mr-2" />
        Drucken
      </button>
    </div>
    <div className="space-y-4">
      {sentences.map((sentence, index) => (
        <p key={index} className="text-xl border-b border-gray-200 dark:border-gray-700 pb-2 
                                text-gray-900 dark:text-gray-100">
          {sentence}
        </p>
      ))}
    </div>
  </div>
);
