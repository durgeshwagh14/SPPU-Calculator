import React from 'react';
import { History } from 'lucide-react';

interface HistoryEntry {
  id: string;
  timestamp: string;
  input: string;
  result: string;
  type: string;
}

interface CalculationHistoryProps {
  history: HistoryEntry[];
  type: string;
}

export function CalculationHistory({ history, type }: CalculationHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-indigo-600" />
        <h3 className="text-xl font-semibold text-gray-900">Calculation History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.input}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}