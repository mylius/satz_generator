"use client"

import React, { useEffect, useState } from 'react';
import { AnlauteSelector } from './AnlautSelector';
import { SentenceGenerator } from './SentenceGenerator';
import { SentenceDisplay } from './SentenceDisplay';
import {  getValidWordsFromCategory,hyphenate, getValidSubjects, getValidObjects, getValidAdverbials, getValidAdjectives  } from '../utils/wordUtils';


const ReadingApp = () => {
  const [selectedAnlaute, setSelectedAnlaute] = useState<Set<string>>(new Set());
  const [sentences, setSentences] = useState<string[]>([]);
  const [processedSentences, setProcessedSentences] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [showSyllables, setShowSyllables] = useState(false);


 useEffect(() => {
    const processSentences = async () => {
      if (!showSyllables) {
        setProcessedSentences(sentences);
        return;
      }

      const processed = await Promise.all(
        sentences.map(async (sentence) => {
          return  hyphenate(sentence);
        })
      );
      setProcessedSentences(processed);
    };

    processSentences();
  }, [sentences, showSyllables]);



const generateSentences = () => {
  const validSubjects = getValidSubjects(selectedAnlaute);
  const validPredicates = getValidWordsFromCategory('predicates', selectedAnlaute);
  const validAdjectives = getValidAdjectives(selectedAnlaute);
  const validObjects = getValidObjects(selectedAnlaute);
  const validAdverbials = getValidAdverbials(selectedAnlaute);
  
  const totalSentences = 15;
  const spoProportion = 0.6;
  const spoCount = Math.floor(totalSentences * spoProportion);
  const istCount = totalSentences - spoCount;
  
  const generateRandomSentences = () => {
    const spoSentences = [];
    const istSentences = [];

    const canMakeSpO = validSubjects.length > 0 && validPredicates.length > 0;
    const canMakeIstSentences = validSubjects.length > 0 && 
                               validAdjectives.regular.length > 0 && 
                               [...selectedAnlaute].some(anlaut => 'ist'.includes(anlaut.toLowerCase()));

    // Helper function to add adverbials to a sentence
    const addAdverbials = (sentence: string) => {
      const addLocal = validAdverbials.local.length > 0 && Math.random() < 0.7; // 70% chance
      const addTemporal = validAdverbials.temporal.length > 0 && Math.random() < 0.5; // 50% chance

      let result = sentence.slice(0, -1); // Remove the period
      
      if (addTemporal) {
        result += ' ' + validAdverbials.temporal[Math.floor(Math.random() * validAdverbials.temporal.length)];
      }
      if (addLocal) {
        result += ' ' + validAdverbials.local[Math.floor(Math.random() * validAdverbials.local.length)];
      }
      
      return result + '.';
    };

    // Generate SPO sentences if possible
    if (canMakeSpO) {
      for (let i = 0; i < spoCount; i++) {
        const subject = validSubjects[Math.floor(Math.random() * validSubjects.length)];
        const predicate = validPredicates[Math.floor(Math.random() * validPredicates.length)];
        
        // Get all valid objects with articles and possible adjectives
        const allObjects = [
          ...validObjects.masculine.map(obj => ({
            object: obj,
            article: 'den',
            adjectives: validAdjectives.akkusative.masculine
          })),
          ...validObjects.feminine.map(obj => ({
            object: obj,
            article: 'die',
            adjectives: validAdjectives.akkusative.feminine
          })),
          ...validObjects.neuter.map(obj => ({
            object: obj,
            article: 'das',
            adjectives: validAdjectives.akkusative.neuter
          }))
        ];

        if (allObjects.length > 0) {
          const { article, object, adjectives } = allObjects[
            Math.floor(Math.random() * allObjects.length)
          ];
          
          // 70% chance to add an adjective if available
          const addAdjective = adjectives.length > 0 && Math.random() < 0.7;
          const adjective = addAdjective 
            ? adjectives[Math.floor(Math.random() * adjectives.length)] + ' '
            : '';
          
          const baseSentence = `${subject} ${predicate} ${article} ${adjective}${object}.`;
          spoSentences.push(addAdverbials(baseSentence));
        }
      }
    }
    
    // Generate ist sentences if possible
    if (canMakeIstSentences) {
      for (let i = 0; i < istCount; i++) {
        const subject = validSubjects[Math.floor(Math.random() * validSubjects.length)];
        const adjective = validAdjectives.regular[
          Math.floor(Math.random() * validAdjectives.regular.length)
        ];
        const baseSentence = `${subject} ist ${adjective}.`;
        istSentences.push(addAdverbials(baseSentence));
      }
    }

    return [...spoSentences, ...istSentences].sort(() => Math.random() - 0.5);
  };
  
  setSentences(generateRandomSentences());
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
          ${processedSentences.map(sentence => 
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
      
      <div className="flex items-center justify-between">
        <SentenceGenerator 
          selectedAnlaute={selectedAnlaute}
          onGenerate={generateSentences}
        />
        
        <label className="flex items-center ml-4 space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showSyllables}
            onChange={(e) => setShowSyllables(e.target.checked)}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span>Silbentrennung</span>
        </label>
      </div>

 {processedSentences.length > 0 && (
        <SentenceDisplay 
          sentences={processedSentences}
          onPrint={handlePrint}
        />
      )}
    </div>
  );
};

export default ReadingApp;
