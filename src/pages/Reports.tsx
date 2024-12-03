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

    const transactionsByMonth = transactions.reduce((acc, curr) => {
        const month = curr.date.toLocaleString('ru', { month: 'long', year: 'numeric' });
        acc[month] = acc[month] || { income: 0, expenses: 0 };
        if (curr.type === 'доход') {
            acc[month].income += curr.amount;
        } else {
            acc[month].expenses += curr.amount;
        }
        return acc;
    }, {} as { [key: string]: { income: number; expenses: number } });


    const dataIncome = Object.entries(incomeByCategory).map(([category, amount]) => ({ name: category, amount }));
    const dataExpenses = Object.entries(expensesByCategory).map(([category, amount]) => ({ name: category, amount }));

    const dataMonthly = Object.entries(transactionsByMonth).map(([month, data]) => ({
        name: month,
        income: data.income,
        expenses: data.expenses,
    }));

    return (
        <div className="reports-page">
            <h1>Отчеты</h1>
            <h2>Общий баланс: {balance.toFixed(2)} ₽</h2>

            <h2>Доходы по категориям:</h2>
            {dataIncome.length > 0 && (
                <BarChart width={500} height={300} data={dataIncome}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" label="сумма" />
                </BarChart>
            )}

            <h2>Расходы по категориям:</h2>
            {dataExpenses.length > 0 && (
                <BarChart width={500} height={300} data={dataExpenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#82ca9d" label="сумма" />
                </BarChart>
            )}

            <h2>Транзакции по месяцам:</h2>
            {dataMonthly.length > 0 && (
                <BarChart width={500} height={300} data={dataMonthly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#8884d8" label="доходы" />
                    <Bar dataKey="expenses" fill="#82ca9d" label="расходы" />
                </BarChart>
            )}
        </div>
    );
};

export default Reports;