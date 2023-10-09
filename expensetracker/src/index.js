import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AddExpense from './pages/AddExpense';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import EditExpense from './pages/EditExpense';
import CategoryList from './pages/CategoryList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path="/"  element={<App/>}/>
        <Route path="/addexpense"  element={<AddExpense />}/>
        <Route path="/editexpense/:id"  element={<EditExpense />}/>
        <Route path="/categorylist"  element={<CategoryList />}/>



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


