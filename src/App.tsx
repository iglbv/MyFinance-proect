import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import './index.css';
import { Transaction } from './data/types';
import axios from 'axios';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [initialBalance, setInitialBalance] = useState(0);

  useEffect(() => {
    const storedBalance = localStorage.getItem('initialBalance');
    setInitialBalance(parseFloat(storedBalance || '0'));

    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const addTransaction = async (newTransaction: Transaction) => {
    try {
      await axios.post('http://localhost:3001/transactions', newTransaction);
      const fetchTransactions = async () => {
        try {
          const response = await axios.get('http://localhost:3001/transactions');
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
      fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleInitialBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBalance = parseInt(event.target.value, 10) || 0;
    setInitialBalance(newBalance);
    localStorage.setItem('initialBalance', newBalance.toString());
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Учёт личных финансов</h1>
          <nav>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/transactions">Транзакции</Link></li>
              <li><Link to="/reports">Отчёты</Link></li>
            </ul>
          </nav>
        </header>
        <div>
          <label htmlFor="initialBalance">Начальный баланс:</label>
          <input type="number" id="initialBalance" value={initialBalance} onChange={handleInitialBalanceChange} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions transactions={transactions} onAddTransaction={addTransaction} />} />
          <Route path="/reports" element={<Reports transactions={transactions} initialBalance={initialBalance} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;