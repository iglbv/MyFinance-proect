import { Transaction } from '../data/types';

export const calculateTotals = (transactions: Transaction[]) => {
    const totalIncome = transactions.reduce((sum, transaction) =>
        transaction.type === 'доход' ? sum + transaction.amount : sum, 0);
    const totalExpenses = transactions.reduce((sum, transaction) =>
        transaction.type === 'расход' ? sum + transaction.amount : sum, 0);
    return { income: totalIncome, expenses: totalExpenses };
};