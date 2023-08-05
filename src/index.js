import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { AuthContextProvider } from './component/Context/AuthContext';
import { ChatContextProvider } from './component/Context/ChatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ChatContextProvider>
        <SnackbarProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </SnackbarProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
