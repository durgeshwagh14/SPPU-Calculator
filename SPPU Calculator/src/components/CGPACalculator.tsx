import React, { useState } from 'react';
import { AlertCircle, Plus, Trash2, Calculator as CalcIcon } from 'lucide-react';

interface Subject {
  id: string;
  grade: string;
  creditHours: string;
}

const CGPACalculator = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', grade: '', creditHours: '' },
    { id: '2', grade: '', creditHours: '' },
    { id: '3', grade: '', creditHours: '' },
    { id: '4', grade: '', creditHours: '' },
    { id: '5', grade: '', creditHours: '' },
  ]);
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleGradeChange = (id: string, value: string) => {
    setSubjects(prev => 
      prev.map(subject => 
        subject.id === id ? { ...subject, grade: value.toUpperCase() } : subject
      )
    );
    setError('');
    setCgpa(null);
  };

  const handleCreditChange = (id: string, value: string) => {
    setSubjects(prev => 
      prev.map(subject => 
        subject.id === id ? { ...subject, creditHours: value } : subject
      )
    );
    setError('');
    setCgpa(null);
  };

  const addSubject = () => {
    if (subjects.length >= 25) {
      setError('Maximum 25 subjects allowed');
      return;
    }
    const newId = (subjects.length + 1).toString();
    setSubjects(prev => [...prev, { id: newId, grade: '', creditHours: '' }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 5) {
      setError('Minimum 5 subjects required');
      return;
    }
    setSubjects(prev => prev.filter(subject => subject.id !== id));
    setCgpa(null);
  };

  const validateInputs = () => {
    const validGrades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'F'];
    
    for (const subject of subjects) {
      if (!subject.grade || !subject.creditHours) {
        setError('Please fill in all fields');
        return false;
      }
      if (!validGrades.includes(subject.grade)) {
        setError(`Invalid grade: ${subject.grade}. Valid grades are: O, A+, A, B+, B, C, D, F`);
        return false;
      }
      if (isNaN(Number(subject.creditHours)) || Number(subject.creditHours) <= 0) {
        setError('Credit hours must be a positive number');
        return false;
      }
    }
    return true;
  };

  const calculateCGPA = () => {
    if (!validateInputs()) return;

    let totalPoints = 0;
    let totalCreditHours = 0;

    subjects.forEach(subject => {
      const credits = parseFloat(subject.creditHours);
      let gradePoint;

      switch (subject.grade) {
        case 'O': gradePoint = 10; break;
        case 'A+': gradePoint = 9; break;
        case 'A': gradePoint = 8; break;
        case 'B+': gradePoint = 7; break;
        case 'B': gradePoint = 6; break;
        case 'C': gradePoint = 5; break;
        case 'D': gradePoint = 4; break;
        case 'F': gradePoint = 0; break;
        default: return;
      }

      totalPoints += gradePoint * credits;
      totalCreditHours += credits;
    });

    setCgpa(totalPoints / totalCreditHours);
    setError('');
  };

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          CGPA Calculator
        </h2>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4 text-center">Grade Points</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p>O = 10</p>
                  <p>A+ = 9</p>
                  <p>A = 8</p>
                  <p>B+ = 7</p>
                </div>
                <div className="space-y-2">
                  <p>B = 6</p>
                  <p>C = 5</p>
                  <p>D = 4</p>
                  <p>F = 0</p>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg flex items-center">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                <div className="space-y-2 text-sm">
                  <p>Enter grades and credit hours for each subject.</p>
                  <p>All fields are required for calculation.</p>
                  <p>You can add up to 25 subjects.</p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div 
                key={subject.id}
                className="grid md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade for Subject {index + 1}
                  </label>
                  <input
                    type="text"
                    value={subject.grade}
                    onChange={(e) => handleGradeChange(subject.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter grade (O, A+, A, B+, B, C, D, F)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Hours
                  </label>
                  <input
                    type="number"
                    value={subject.creditHours}
                    onChange={(e) => handleCreditChange(subject.id, e.target.value)}
                    min="1"
                    step="0.5"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter credit hours"
                  />
                </div>
                <div className="md:col-span-1 flex items-end">
                  {index >= 5 && (
                    <button
                      onClick={() => removeSubject(subject.id)}
                      className="w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={addSubject}
              disabled={subjects.length >= 25}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Subject</span>
            </button>
            <button
              onClick={calculateCGPA}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <CalcIcon className="w-5 h-5" />
              <span>Calculate CGPA</span>
            </button>
          </div>
            
          {cgpa !== null && (
            <div className="mt-8 p-6 bg-indigo-50 rounded-lg text-center animate-fade-in">
              <h3 className="text-2xl font-bold text-indigo-900">
                Your CGPA: {cgpa.toFixed(2)}
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CGPACalculator;