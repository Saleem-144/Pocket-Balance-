'use client';

import { useState, useEffect } from 'react';
import { FinancialData, TransactionCategory } from '@/types';
import { storageUtils } from '@/utils/storage';
import { formatCurrency, getCategoryColor } from '@/utils/ui';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import BudgetAdvice from '@/components/BudgetAdvice';

export default function Dashboard() {
  const [financialData, setFinancialData] = useState<FinancialData>({
    transactions: [],
    totalIncome: 0,
    totalPayments: 0,
    totalPersonal: 0,
    totalSavings: 0,
    remainingBalance: 0,
  });
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('incoming');

  useEffect(() => {
    const data = storageUtils.getFinancialData();
    setFinancialData(data);
  }, []);

  const handleTransactionAdded = () => {
    const data = storageUtils.getFinancialData();
    setFinancialData(data);
    setShowTransactionForm(false);
  };

  const handleTransactionDeleted = () => {
    const data = storageUtils.getFinancialData();
    setFinancialData(data);
  };

  const categories = [
    { key: 'incoming', label: 'Income', icon: '💰', amount: financialData.totalIncome },
    { key: 'payments', label: 'Payments', icon: '💳', amount: financialData.totalPayments },
    { key: 'personal', label: 'Personal', icon: '🛍️', amount: financialData.totalPersonal },
    { key: 'savings', label: 'Savings', icon: '🏦', amount: financialData.totalSavings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pocket Balance</h1>
          <p className="text-gray-600 mt-2">Your Personal Budget Planner</p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <div
              key={category.key}
              className={`p-6 rounded-lg border-2 ${getCategoryColor(category.key)}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-75">{category.label}</p>
                  <p className="text-2xl font-bold">{formatCurrency(category.amount)}</p>
                </div>
                <span className="text-3xl">{category.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining Balance */}
        <div className="mb-8">
          <div className={`p-8 rounded-lg border-2 ${
            financialData.remainingBalance >= 0 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="text-center">
              <p className="text-lg font-medium mb-2">Remaining Balance</p>
              <p className="text-4xl font-bold">
                {formatCurrency(financialData.remainingBalance)}
              </p>
              <p className="text-sm mt-2 opacity-75">
                Income - (Payments + Personal + Savings)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => {
              setSelectedCategory('incoming');
              setShowTransactionForm(true);
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            + Add Income
          </button>
          <button
            onClick={() => {
              setSelectedCategory('payments');
              setShowTransactionForm(true);
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            + Add Payment
          </button>
          <button
            onClick={() => {
              setSelectedCategory('personal');
              setShowTransactionForm(true);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Personal Expense
          </button>
          <button
            onClick={() => {
              setSelectedCategory('savings');
              setShowTransactionForm(true);
            }}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            + Add Savings
          </button>
        </div>

        {/* Transaction Form Modal */}
        {showTransactionForm && (
          <TransactionForm
            category={selectedCategory as TransactionCategory}
            onClose={() => setShowTransactionForm(false)}
            onTransactionAdded={handleTransactionAdded}
          />
        )}

        {/* Transaction Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TransactionList
            category="incoming"
            transactions={financialData.transactions.filter(t => t.category === 'incoming')}
            onTransactionDeleted={handleTransactionDeleted}
          />
          <TransactionList
            category="payments"
            transactions={financialData.transactions.filter(t => t.category === 'payments')}
            onTransactionDeleted={handleTransactionDeleted}
          />
          <TransactionList
            category="personal"
            transactions={financialData.transactions.filter(t => t.category === 'personal')}
            onTransactionDeleted={handleTransactionDeleted}
          />
          <TransactionList
            category="savings"
            transactions={financialData.transactions.filter(t => t.category === 'savings')}
            onTransactionDeleted={handleTransactionDeleted}
          />
        </div>

        {/* AI Budget Advice */}
        <BudgetAdvice financialData={financialData} />
      </div>
    </div>
  );
}
