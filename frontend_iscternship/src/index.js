import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UserProvider from './UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </UserProvider>
);
