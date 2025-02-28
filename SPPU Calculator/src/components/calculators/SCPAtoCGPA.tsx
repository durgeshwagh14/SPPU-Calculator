import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export function SCPAtoCGPA() {
  const [scpa, setSCPA] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateCGPA = () => {
    const scpaNum = parseFloat(scpa);
    if (isNaN(scpaNum) || scpaNum < 0 || scpaNum > 10) {
      setError('Please enter a valid SCPA between 0 and 10');
      setResult(null);
      return;
    }
    
    // Using a simple conversion formula (this can be adjusted based on specific requirements)
    setResult(scpaNum);
    setError('');
  };

  return (
    <section id="scpa-cgpa" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <Calculator className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            SCPA to CGPA Calculator
          </h2>
          <p className="text-gray-600">
            Convert your Semester Cumulative Performance Average (SCPA) to CGPA
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter SCPA
            </label>
            <input
              type="number"
              value={scpa}
              onChange={(e) => {
                setSCPA(e.target.value);
                setError('');
                setResult(null);
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your SCPA (0-10)"
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

          <button
            onClick={calculateCGPA}
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Calculate CGPA
          </button>

          {result !== null && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-indigo-900">
                Your CGPA: {result.toFixed(2)}
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}