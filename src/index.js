import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import {BookingsContextProvider} from './store/bookings-context.js';
import {LaunchesContextProvider} from './store/launches-context.js';

ReactDOM.render(  
    <LaunchesContextProvider>
    <BookingsContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </BookingsContextProvider>
    </LaunchesContextProvider>, 
    document.getElementById('root'));
