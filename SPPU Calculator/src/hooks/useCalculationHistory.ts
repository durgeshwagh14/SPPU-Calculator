import { useState, useEffect } from 'react';

interface HistoryEntry {
  id: string;
  timestamp: string;
  input: string;
  result: string;
  type: string;
}

export function useCalculationHistory(type: string) {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const savedHistory = localStorage.getItem(`calculator_history_${type}`);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(`calculator_history_${type}`, JSON.stringify(history));
  }, [history, type]);

  const addToHistory = (input: string, result: string) => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      input,
      result,
      type,
    };

    setHistory(prev => [newEntry, ...prev].slice(0, 10)); // Keep only last 10 entries
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addToHistory, clearHistory };
}