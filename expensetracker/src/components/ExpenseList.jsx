import React, { useState } from 'react'
import MonthExpense from './MonthExpense'
import './Common.css'


function ExpenseList() {
  // main function
  const segregateAndSortByMonth =(data) => {
    // Sort the data array in descending order based on dates
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    const segregatedData = {};
  
    data.forEach(entry => {
      const dateParts = entry.date.split('-');
      const year = dateParts[0];
      const month = dateParts[1];
      const key = year + '-' + month;
  
      if (!segregatedData[key]) {
        segregatedData[key] = [];
      }
  
      segregatedData[key].push(entry);
    });
     
    localStorage.setItem("expenseDates",JSON.stringify(segregatedData))
    return segregatedData;
  }

    const [allExpenseList,setAllExpenselist] = useState(JSON.parse(localStorage.getItem("Expenses")) ? segregateAndSortByMonth(JSON.parse(localStorage.getItem("Expenses"))) : ''  ) 
   

   
 
    
  return (
    <div className='expenseLists'>
        {/* <MonthExpense />
        <MonthExpense />
        <MonthExpense /> */}

        {
          // here we are converting the object into map then we are appling map function on that
          allExpenseList ?
          Object.keys(allExpenseList).map(function(key, index) {
          return <MonthExpense key={key} data = {allExpenseList[key]} date={key}/>
        }) : <p className='noRecord'>No record Found Please add Expences</p>

        }
    </div>
  )
}

export default ExpenseList