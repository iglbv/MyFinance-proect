import React from 'react';
import { Transaction } from '../data/types';

interface ReportsProps {
    transactions: Transaction[];
    initialBalance: number;
}

const Reports: React.FC<ReportsProps> = ({ transactions, initialBalance }) => {
    const totalIncome = transactions.reduce((sum, transaction) => transaction.type === 'доход' ? sum + transaction.amount : sum, 0);
    const totalExpenses = transactions.reduce((sum, transaction) => transaction.type === 'расход' ? sum + transaction.amount : sum, 0);
    const balance = initialBalance + totalIncome - totalExpenses;

    return (
        <div className="reports-page">
            <h1>Отчеты</h1>
            <h2>Общий баланс: {balance} ₽</h2>
        </div>
    );
};

export default Reports;