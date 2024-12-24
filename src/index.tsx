import React from 'react'
import ReactDOM from 'react-dom/client'
import Demo from './Demo.tsx'
import './index.css';
import './font.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
)
