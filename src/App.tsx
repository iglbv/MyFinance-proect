import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import './index.css';
import { Transaction } from './data/types';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [initialBalance, setInitialBalance] = useState(0);

  useEffect(() => {
    const storedBalance = localStorage.getItem('initialBalance');
    setInitialBalance(Number(storedBalance) || 0);

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
      const updatedTransactions = await axios.get('http://localhost:3001/transactions');
      setTransactions(updatedTransactions.data);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/transactions/${id}`);
      const updatedTransactions = await axios.get('http://localhost:3001/transactions');
      setTransactions(updatedTransactions.data);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleInitialBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBalance = parseFloat(event.target.value);
    if (!isNaN(newBalance)) {
      setInitialBalance(newBalance);
      localStorage.setItem('initialBalance', newBalance.toString());
    } else if (event.target.value === "") {
      setInitialBalance(0);
      localStorage.setItem('initialBalance', '0');
    } else {
      alert("Некорректный ввод. Введите число.");
    }
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
          <input
            type="number"
            id="initialBalance"
            value={initialBalance}
            onChange={handleInitialBalanceChange}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions transactions={transactions} onAddTransaction={addTransaction} onDeleteTransaction={deleteTransaction} />} />
          <Route path="/reports" element={<Reports transactions={transactions} initialBalance={initialBalance} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;