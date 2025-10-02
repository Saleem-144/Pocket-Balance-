'use client';

import { useState } from 'react';
import { FinancialData, BudgetAdvice as BudgetAdviceType } from '@/types';

interface BudgetAdviceProps {
  financialData: FinancialData;
}

export default function BudgetAdvice({ financialData }: BudgetAdviceProps) {
  const [advice, setAdvice] = useState<BudgetAdviceType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(financialData),
      });

      if (!response.ok) {
        throw new Error('Failed to get advice');
      }

      const result = await response.json();
      setAdvice(result);
    } catch (err) {
      setError('Failed to get budget advice. Please try again.');
      console.error('Error getting budget advice:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h3 className="text-lg font-semibold">AI Budget Advice</h3>
        </div>
        <button
          onClick={handleGetAdvice}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Getting Advice...' : 'Get Advice'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {advice && (
        <div className="space-y-4">
          {/* Risk Level */}
          <div className={`p-3 rounded-md border ${getRiskColor(advice.riskLevel)}`}>
            <p className="text-sm font-medium">
              Risk Level: <span className="capitalize">{advice.riskLevel}</span>
            </p>
          </div>

          {/* Main Advice */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-900 mb-2">Financial Assessment</h4>
            <p className="text-blue-800 text-sm">{advice.advice}</p>
          </div>

          {/* Suggestions */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
            <ul className="space-y-2">
              {advice.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!advice && !isLoading && !error && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Click &quot;Get Advice&quot; to receive personalized budget recommendations based on your financial data.</p>
        </div>
      )}
    </div>
  );
}
