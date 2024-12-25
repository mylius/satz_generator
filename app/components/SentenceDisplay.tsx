import { Printer } from 'lucide-react';

interface SentenceDisplayProps {
  sentences: string[];
  onPrint: () => void;
}

export const SentenceDisplay = ({ sentences, onPrint }: SentenceDisplayProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Übungssätze</h2>
      <button 
        onClick={onPrint}
        className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        <Printer className="w-4 h-4 mr-2" />
        Drucken
      </button>
    </div>
    <div className="space-y-4">
      {sentences.map((sentence, index) => (
        <p key={index} className="text-xl border-b pb-2">
          {sentence}
        </p>
      ))}
    </div>
  </div>
);
