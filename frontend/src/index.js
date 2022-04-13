import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// React 18 way
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
