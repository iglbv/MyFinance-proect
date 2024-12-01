import React from 'react';
import { Transaction } from '../data/types';
import AddTransaction from '../components/AddTransaction';
import AccountSummary from '../components/AccountSummary';


interface TransactionProps {
    transactions: Transaction[];
    onAddTransaction: (transaction: Transaction) => void;
}


const Transactions: React.FC<TransactionProps> = ({ transactions, onAddTransaction }) => {

    return (
        <div className="transactions-page">
            <h2>Транзакции</h2>
            <AddTransaction transaction={{ date: new Date(), description: '', amount: 0, category: '', type: 'доход' }} onChange={onAddTransaction} />
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Описание</th>
                        <th>Сумма</th>
                        <th>Категория</th>
                        <th>Тип</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={new Date(transaction.date).toISOString()}>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount} ₽</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.type === 'доход' ? 'Доход' : 'Расход'}</td>
                        </tr>
                    ))}
                    {transactions.length > 0 && (
                        <AccountSummary transactions={transactions} />
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;