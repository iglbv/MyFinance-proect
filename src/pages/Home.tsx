import React from 'react';
import finance from '../assets/finance.png'

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Добро пожаловать в приложение для учёта финансов!</h1>
            <img src={finance} alt="Finance App Image" className="hero-image" />
            <p>
                Здесь вы можете отслеживать свои доходы и расходы, анализировать свои
                финансовые данные и планировать свой бюджет.
            </p>
            <div className="content-container">
                <div className="features">
                    <h2>Ключевые возможности:</h2>
                    <ul>
                        <li>Отслеживание доходов и расходов</li>
                        <li>Генерация отчётов</li>
                        <li>Анализ финансовых данных</li>
                        <li>Планирование бюджета</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;