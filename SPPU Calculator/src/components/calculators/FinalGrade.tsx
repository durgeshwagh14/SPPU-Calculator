import React, { useState } from 'react';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import { useCalculationHistory } from '../../hooks/useCalculationHistory';
import { CalculationHistory } from '../CalculationHistory';

interface Semester {
  id: string;
  sgpa: string;
  credits: string;
}

export function FinalGrade() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: '1', sgpa: '', credits: '' },
    { id: '2', sgpa: '', credits: '' },
    { id: '3', sgpa: '', credits: '' },
    { id: '4', sgpa: '', credits: '' },
  ]);
  const [result, setResult] = useState<{ cgpa: number; percentage: number } | null>(null);
  const [error, setError] = useState<string>('');
  const { history, addToHistory, clearHistory } = useCalculationHistory('final-grade');

  const handleSGPAChange = (id: string, value: string) => {
    setSemesters(prev =>
      prev.map(sem =>
        sem.id === id ? { ...sem, sgpa: value } : sem
      )
    );
    setError('');
    setResult(null);
  };

  const handleCreditsChange = (id: string, value: string) => {
    setSemesters(prev =>
      prev.map(sem =>
        sem.id === id ? { ...sem, credits: value } : sem
      )
    );
    setError('');
    setResult(null);
  };

  const addSemester = () => {
    if (semesters.length >= 8) {
      setError('Maximum 8 semesters allowed');
      return;
    }
    const newId = (semesters.length + 1).toString();
    setSemesters(prev => [...prev, { id: newId, sgpa: '', credits: '' }]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length <= 4) {
      setError('Minimum 4 semesters required');
      return;
    }
    setSemesters(prev => prev.filter(sem => sem.id !== id));
    setResult(null);
  };

  const calculateFinalGrade = () => {
    // Validate inputs
    for (const semester of semesters) {
      if (!semester.sgpa || !semester.credits) {
        setError('Please fill in all fields');
        return;
      }
      const sgpa = parseFloat(semester.sgpa);
      if (isNaN(sgpa) || sgpa < 0 || sgpa > 10) {
        setError('SGPA must be between 0 and 10');
        return;
      }
      if (isNaN(Number(semester.credits)) || Number(semester.credits) <= 0) {
        setError('Credits must be a positive number');
        return;
      }
    }

    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      const sgpa = parseFloat(semester.sgpa);
      const credits = parseFloat(semester.credits);
      totalPoints += sgpa * credits;
      totalCredits += credits;
    });

    if (totalCredits === 0) {
      setError('Total credits cannot be zero');
      return;
    }

    const cgpa = totalPoints / totalCredits;
    const percentage = cgpa * 9.5;

    setResult({
      cgpa: cgpa,
      percentage: percentage
    });
    setError('');

    // Add to history
    const inputStr = semesters.map((sem, idx) => 
      `Sem ${idx + 1}: SGPA ${sem.sgpa} (${sem.credits} credits)`
    ).join(', ');

    addToHistory(
      inputStr,
      `CGPA: ${cgpa.toFixed(2)}, Percentage: ${percentage.toFixed(2)}%`
    );
  };

  return (
    <section id="final-grade" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <Calculator className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Final Grade Calculator (SPPU)
          </h2>
          <p className="text-gray-600">
            Calculate your final CGPA based on semester-wise SGPA
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {semesters.map((semester, index) => (
              <div key={semester.id} className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester {index + 1} SGPA
                  </label>
                  <input
                    type="number"
                    value={semester.sgpa}
                    onChange={(e) => handleSGPAChange(semester.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter SGPA (0-10)"
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credits
                  </label>
                  <input
                    type="number"
                    value={semester.credits}
                    onChange={(e) => handleCreditsChange(semester.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Credits"
                    min="1"
                    step="0.5"
                  />
                </div>
                {semesters.length > 4 && (
                  <div className="flex items-end">
                    <button
                      onClick={() => removeSemester(semester.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={addSemester}
              disabled={semesters.length >= 8}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Semester</span>
            </button>
            <button
              onClick={calculateFinalGrade}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculate Final Grade</span>
            </button>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-6 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {result !== null && (
            <div className="mt-6 p-6 bg-indigo-50 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                Final Results
              </h3>
              <p className="text-lg text-indigo-800 mb-2">
                CGPA: {result.cgpa.toFixed(2)}
              </p>
              <p className="text-lg text-indigo-800">
                Percentage: {result.percentage.toFixed(2)}%
              </p>
              <p className="mt-2 text-indigo-600">
                {result.cgpa >= 9.5 ? 'Outstanding' :
                 result.cgpa >= 8.5 ? 'Excellent' :
                 result.cgpa >= 7.5 ? 'Very Good' :
                 result.cgpa >= 6.5 ? 'Good' :
                 result.cgpa >= 5.5 ? 'Above Average' :
                 result.cgpa >= 4.5 ? 'Average' :
                 'Needs Improvement'}
              </p>
            </div>
          )}

          <CalculationHistory history={history} type="final-grade" />
        </div>
      </div>
    </section>
  );
}