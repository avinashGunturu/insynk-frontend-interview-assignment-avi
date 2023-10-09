import './App.css';
import ExpenseList from './components/ExpenseList';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="expenselist">
      <Header />
       <ExpenseList />
      <Footer name={"Expense"}/>
    </div>
  );
}

export default App;
