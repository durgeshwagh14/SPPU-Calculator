import React, { useState } from 'react';
import { Calculator, History, Trash2 } from 'lucide-react';
import { useCalculationHistory } from '../../hooks/useCalculationHistory';
import { CalculationHistory } from '../CalculationHistory';

export function PercentageToCGPA() {
  const [percentage, setPercentage] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const { history, addToHistory, clearHistory } = useCalculationHistory('percentage-to-cgpa');

  const calculateCGPA = () => {
    const percentageNum = parseFloat(percentage);
    if (isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) {
      setError('Please enter a valid percentage between 0 and 100');
      setResult(null);
      return;
    }
    
    const cgpa = percentageNum / 9.5;
    const finalResult = Math.min(10, cgpa);
    setResult(finalResult);
    setError('');
    
    addToHistory(
      `${percentageNum}%`,
      `CGPA: ${finalResult.toFixed(2)}`
    );
  };

  return (
    <section id="percentage-cgpa" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <Calculator className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Percentage to CGPA Calculator
          </h2>
          <p className="text-gray-600">
            Convert your percentage marks to CGPA using the standard conversion formula (Percentage / 9.5)
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Percentage
            </label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => {
                setPercentage(e.target.value);
                setError('');
                setResult(null);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your percentage (0-100)"
              min="0"
              max="100"
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
              onClick={calculateCGPA}
              className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculate CGPA</span>
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
                Your CGPA: {result.toFixed(2)}
              </h3>
            </div>
          )}

          <CalculationHistory history={history} type="percentage-to-cgpa" />
        </div>
      </div>
    </section>
  );
}