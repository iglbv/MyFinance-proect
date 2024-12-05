import React, { useMemo } from 'react';
import { Transaction } from '../data/types';
import AddTransaction from '../components/AddTransaction';
import AccountSummary from '../components/AccountSummary';

interface TransactionProps {
    transactions: Transaction[];
    onAddTransaction: (transaction: Transaction) => void;
    onDeleteTransaction: (id: number) => void;
}

const Transactions: React.FC<TransactionProps> = ({ transactions, onAddTransaction, onDeleteTransaction }) => {
    const parsedTransactions = useMemo(() => {
        return transactions.map(transaction => ({
            ...transaction,
            date: new Date(transaction.date)
        }));
    }, [transactions]);

    const sortedTransactions = useMemo(() => {
        try {
            return [...parsedTransactions].sort((a, b) => b.date.getTime() - a.date.getTime());
        } catch (error) {
            console.error("Error sorting transactions:", error);
            return [...parsedTransactions];
        }
    }, [parsedTransactions]);

    const summary = useMemo(() => <AccountSummary transactions={sortedTransactions} />, [sortedTransactions]);

    return (
        <div className="transactions-page">
            <h2>Транзакции</h2>
            <AddTransaction transaction={{ date: new Date(), description: '', amount: 0, category: '', type: 'расход' }} onChange={onAddTransaction} />
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Описание</th>
                        <th>Сумма</th>
                        <th>Категория</th>
                        <th>Тип</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTransactions.map((transaction) => (
                        <tr key={transaction.id || transaction.date.toISOString()}>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount} ₽</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.type === 'доход' ? 'Доход' : 'Расход'}</td>
                            <td>
                                <button onClick={() => onDeleteTransaction(transaction.id!)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    {sortedTransactions.length > 0 && summary}
                    {sortedTransactions.length === 0 && (<tr><td colSpan={6}>Транзакций нет</td></tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;