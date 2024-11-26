import React, { useEffect, useState } from 'react';
import { Transaction } from '../data/types';

const AccountSummary: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const [initialBalance, setInitialBalance] = useState(0);
    useEffect(() => {
        const storedBalance = localStorage.getItem('initialBalance');
        setInitialBalance(parseFloat(storedBalance || '0'));
    }, []);


    const totalIncome = transactions.reduce((sum, transaction) =>
        transaction.type === 'доход' ? sum + transaction.amount : sum, 0);

    const totalExpenses = transactions.reduce((sum, transaction) =>
        transaction.type === 'расход' ? sum + transaction.amount : sum, 0);

    const balance = initialBalance + totalIncome - totalExpenses;

    return (
        <div className="account-summary">
            <h2>Сводка по счёту</h2>
            <p><strong>Доходы:</strong> {totalIncome} ₽</p>
            <p><strong>Расходы:</strong> {totalExpenses} ₽</p>
            <p><strong>Баланс:</strong> {balance.toFixed(2)} ₽</p>
        </div>
    );
};

export default AccountSummary;