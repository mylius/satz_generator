"use client"

import React, { useState } from 'react';
import { AnlauteSelector } from './AnlautSelector';
import { SentenceGenerator } from './SentenceGenerator';
import { SentenceDisplay } from './SentenceDisplay';
import { getValidWordsFromCategory } from '../utils/wordUtils';

const ReadingApp = () => {
  const [selectedAnlaute, setSelectedAnlaute] = useState<Set<string>>(new Set());
  const [sentences, setSentences] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(0);

const generateSentences = () => {
    const validSubjects = getValidWordsFromCategory('subjects', selectedAnlaute);
    const validPredicates = getValidWordsFromCategory('predicates', selectedAnlaute);
    const validObjects = getValidWordsFromCategory('objects', selectedAnlaute);
    const validAdjectives = getValidWordsFromCategory('adjectives', selectedAnlaute);
    
    const totalSentences = 15;
    const spoProportion = 0.6;
    const spoCount = Math.floor(totalSentences * spoProportion);
    const istCount = totalSentences - spoCount;
    
    const generateRandomSentences = () => {
      const spoSentences = [];
      const istSentences = [];

      // Generate SPO sentences
      if (validPredicates.length > 0){
      for (let i = 0; i < spoCount; i++) {
        const subject = validSubjects[Math.floor(Math.random() * validSubjects.length)];
        const predicate = validPredicates[Math.floor(Math.random() * validPredicates.length)];
        const object = validObjects[Math.floor(Math.random() * validObjects.length)];
        spoSentences.push(`${subject} ${predicate} ${object}.`);
      }}
        if (validAdjectives.length > 0){
      // Generate ist sentences
      if ([...selectedAnlaute].some(anlaut => 'ist'.includes(anlaut.toLowerCase()))) {
        for (let i = 0; i < istCount; i++) {
          const subject = validSubjects[Math.floor(Math.random() * validSubjects.length)];
          const adjective = validAdjectives[Math.floor(Math.random() * validAdjectives.length)];
          istSentences.push(`${subject} ist ${adjective}.`);
        }
      }}

      return [...spoSentences, ...istSentences].sort(() => Math.random() - 0.5);
    };
    
    setSentences(generateRandomSentences()
    );
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Übungssätze</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .sentence { font-size: 20px; padding: 10px 0; border-bottom: 1px solid #eee; }
          </style>
        </head>
        <body>
          ${sentences.map(sentence => 
            `<div class="sentence">${sentence}</div>`
          ).join('')}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <AnlauteSelector 
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        setSelectedAnlaute={setSelectedAnlaute}
      />
      <SentenceGenerator 
        selectedAnlaute={selectedAnlaute}
        onGenerate={generateSentences}
      />
      {sentences.length > 0 && (
        <SentenceDisplay 
          sentences={sentences}
          onPrint={handlePrint}
        />
      )}
    </div>
  );
};

export default ReadingApp;
