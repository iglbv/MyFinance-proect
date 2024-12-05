import React from 'react';
import { Transaction } from '../data/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateTotals } from '../utils/calculations';

interface ReportsProps {
    transactions: Transaction[];
    initialBalance: number;
}

const Reports: React.FC<ReportsProps> = ({ transactions, initialBalance }) => {
    const total = calculateTotals(transactions);
    const balance = initialBalance + total.income - total.expenses;

    const incomeByCategory = transactions
        .filter(t => t.type === 'доход')
        .reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {} as { [key: string]: number });

    const expensesByCategory = transactions
        .filter(t => t.type === 'расход')
        .reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {} as { [key: string]: number });


    const sortedDataIncome = Object.entries(incomeByCategory)
        .sort(([, a], [, b]) => b - a)
        .map(([category, amount]) => ({ name: category, amount }));

    const sortedDataExpenses = Object.entries(expensesByCategory)
        .sort(([, a], [, b]) => b - a)
        .map(([category, amount]) => ({ name: category, amount }));


    return (
        <div className="reports-page">
            <h1>Отчеты</h1>
            <h2>Общий баланс: {balance.toFixed(2)} ₽</h2>

            <h2>Доходы по категориям:</h2>
            {sortedDataIncome.length > 0 && (
                <BarChart width={500} height={300} data={sortedDataIncome}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" label="сумма" />
                </BarChart>
            )}

            <h2>Расходы по категориям:</h2>
            {sortedDataExpenses.length > 0 && (
                <BarChart width={500} height={300} data={sortedDataExpenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#82ca9d" label="сумма" />
                </BarChart>
            )}
        </div>
    );
};

export default Reports;