import React, { useState } from 'react';
import { Calculator, History, Trash2 } from 'lucide-react';
import { useCalculationHistory } from '../../hooks/useCalculationHistory';
import { CalculationHistory } from '../CalculationHistory';

export function SGPAtoPercentage() {
  const [sgpa, setSGPA] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const { history, addToHistory, clearHistory } = useCalculationHistory('sgpa-to-percentage');

  const calculatePercentage = () => {
    const sgpaNum = parseFloat(sgpa);
    if (isNaN(sgpaNum) || sgpaNum < 0 || sgpaNum > 10) {
      setError('Please enter a valid SGPA between 0 and 10');
      setResult(null);
      return;
    }
    
    const percentage = sgpaNum * 9.5;
    const finalResult = Math.min(100, percentage);
    setResult(finalResult);
    setError('');
    
    addToHistory(
      `SGPA: ${sgpaNum}`,
      `${finalResult.toFixed(2)}%`
    );
  };

  return (
    <section id="sgpa-percentage" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <Calculator className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            SGPA to Percentage Calculator
          </h2>
          <p className="text-gray-600">
            Convert your Semester Grade Point Average (SGPA) to percentage using the standard formula (SGPA × 9.5)
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter SGPA
            </label>
            <input
              type="number"
              value={sgpa}
              onChange={(e) => {
                setSGPA(e.target.value);
                setError('');
                setResult(null);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your SGPA (0-10)"
              min="0"
              max="10"
              step="0.01"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={calculatePercentage}
              className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculate Percentage</span>
            </button>
            
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {result !== null && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-indigo-900">
                Your Percentage: {result.toFixed(2)}%
              </h3>
            </div>
          )}

          <CalculationHistory history={history} type="sgpa-to-percentage" />
        </div>
      </div>
    </section>
  );
}