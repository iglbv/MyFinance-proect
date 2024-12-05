import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="not-found-page">
            <h1>404 - Страница не найдена</h1>
            <p>К сожалению, запрашиваемая вами страница не найдена.</p>
            <Link to="/">Вернуться на главную страницу</Link>
        </div>
    );
};

export default NotFound;