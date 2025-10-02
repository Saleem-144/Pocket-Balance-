'use client';

import { Transaction, TransactionCategory } from '@/types';
import { storageUtils } from '@/utils/storage';
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon } from '@/utils/ui';

interface TransactionListProps {
  category: TransactionCategory;
  transactions: Transaction[];
  onTransactionDeleted: () => void;
}

export default function TransactionList({ category, transactions, onTransactionDeleted }: TransactionListProps) {
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      storageUtils.deleteTransaction(id);
      onTransactionDeleted();
    }
  };

  const categoryLabels = {
    incoming: 'Income',
    payments: 'Payments',
    personal: 'Personal Expenses',
    savings: 'Savings',
  };

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className={`p-6 rounded-lg border-2 ${getCategoryColor(category)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getCategoryIcon(category)}</span>
          <h3 className="text-lg font-semibold">{categoryLabels[category]}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-75">Total</p>
          <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-sm opacity-75 italic">No transactions yet</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-md"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs opacity-75">{formatDate(transaction.date)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">{formatCurrency(transaction.amount)}</span>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
