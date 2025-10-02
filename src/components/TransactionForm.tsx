'use client';

import React, { useState } from 'react';
import { TransactionCategory } from '@/types';
import { storageUtils } from '@/utils/storage';
import { cn } from '@/utils/ui';

interface TransactionFormProps {
  category: TransactionCategory;
  onClose: () => void;
  onTransactionAdded: () => void;
}

export default function TransactionForm({ category, onClose, onTransactionAdded }: TransactionFormProps) {
  // Get form data from localStorage or use defaults
  const getStoredFormData = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`pocket-balance-form-${category}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing stored form data:', e);
        }
      }
    }
    return {
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
    };
  };

  const [description, setDescription] = useState(() => getStoredFormData().description);
  const [amount, setAmount] = useState(() => getStoredFormData().amount);
  const [date, setDate] = useState(() => getStoredFormData().date);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Save form data to localStorage
  const saveFormData = () => {
    if (typeof window !== 'undefined') {
      const formData = { description, amount, date };
      localStorage.setItem(`pocket-balance-form-${category}`, JSON.stringify(formData));
    }
  };

  // Clear form data from localStorage
  const clearFormData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`pocket-balance-form-${category}`);
    }
  };

  // Handle input changes and save to localStorage
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // Handle clear form
  const handleClearForm = () => {
    if (confirm('Are you sure you want to clear the form? This will remove all entered data.')) {
      clearFormData();
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  // Save form data whenever inputs change
  React.useEffect(() => {
    saveFormData();
  }, [description, amount, date, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!amount || amount.trim() === '') {
      alert('Please enter an amount');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    if (amountNum > 999999999) {
      alert('Amount cannot exceed PKR 999,999,999');
      return;
    }

    if (!date) {
      alert('Please select a date');
      return;
    }

    setIsSubmitting(true);

    try {
      storageUtils.addTransaction({
        description: description.trim(),
        amount: amountNum,
        date,
        category,
      });

      // Clear form data after successful submission
      clearFormData();
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);

      onTransactionAdded();
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Error adding transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryLabels = {
    incoming: 'Income',
    payments: 'Payment',
    personal: 'Personal Expense',
    savings: 'Savings',
  };

  const getButtonColor = (category: TransactionCategory): string => {
    switch (category) {
      case 'incoming':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'payments':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'personal':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'savings':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add {categoryLabels[category]}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter description..."
              maxLength={100}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.length}/100 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (PKR)
            </label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="0.00"
              step="0.01"
              min="0"
              max="999999999"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="px-4 py-2 border border-orange-300 text-orange-700 rounded-md hover:bg-orange-50 hover:border-orange-400 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex-1 px-4 py-2 rounded-md transition-colors disabled:opacity-50",
                getButtonColor(category)
              )}
            >
              {isSubmitting ? 'Adding...' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
