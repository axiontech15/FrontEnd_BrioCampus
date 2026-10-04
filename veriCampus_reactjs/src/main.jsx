import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/responsive.css';
import './styles/super-admin.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
