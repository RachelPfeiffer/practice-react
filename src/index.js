import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import {BookingsContextProvider} from './store/bookings-context.js';

ReactDOM.render(  
    <BookingsContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </BookingsContextProvider>, 
    document.getElementById('root'));
