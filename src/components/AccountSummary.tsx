import React, { useEffect, useState } from 'react';
import { Transaction } from '../data/types';
import { calculateTotals } from '../utils/calculations';

const AccountSummary: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const [initialBalance, setInitialBalance] = useState(0);
    useEffect(() => {
        const storedBalance = localStorage.getItem('initialBalance');
        setInitialBalance(Number(storedBalance) || 0);
    }, []);

    const total = calculateTotals(transactions);
    const balance = initialBalance + total.income - total.expenses;

    return (
        <div className="account-summary">
            <h2>Сводка по счёту</h2>
            <p><strong>Доходы:</strong> {total.income} ₽</p>
            <p><strong>Расходы:</strong> {total.expenses} ₽</p>
            <p><strong>Баланс:</strong> {balance.toFixed(2)} ₽</p>
        </div>
    );
};

export default AccountSummary;