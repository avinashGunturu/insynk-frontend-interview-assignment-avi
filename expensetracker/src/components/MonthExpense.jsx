import React, { useEffect, useState } from 'react'
import './Common.css'
import { Link }from 'react-router-dom'

const MonthExpense = ({data,date}) => {
    const [totalAmount,setTotalamount]=useState(0)
    const [Expenseslist,setExpense] = useState([])
    


   
   
    


  const formatDate = (date)=>{
     let a = date.split("-")
     return `${a[1]}/${a[0]}`
  }

  const caluculateTotalExpense = () => {

    const totalAmount = data.reduce((accumulator, currentItem) => {
        // Convert the amount to a number (removing any commas if present)
        const amount = parseFloat(currentItem.amount) || 0;
      
        // Add the current item's amount to the accumulator
        return accumulator + amount;
      }, 0);
      setTotalamount(totalAmount)
  }   

  const findExpenseNamesWithTotalPRice = ()=> {
    const categorySums = {};

    // Iterate through the transactions and calculate the sums for each category
    data.forEach((transaction) => {
      const category = transaction.category;
      const amount = transaction.amount;
    
      // Skip transactions with an empty category
      if (category === "") return;
    
      // Initialize the category sum if it doesn't exist
      if (!categorySums[category]) {
        categorySums[category] = 0;
      }
    
      // Add the transaction amount to the category sum
      categorySums[category] = +categorySums[category] + +amount;
    });

    ObjtoArray(categorySums)
  }
  
  const ObjtoArray = (categorySums)=> {
    const categorySumsArray = [];

    // Iterate over the properties of the categorySums object
    for (const category in categorySums) {
      if (categorySums.hasOwnProperty(category)) {
        const sum = categorySums[category];
        categorySumsArray.push({ category, sum });
      }
    }
    setExpense(categorySumsArray)
  }

  useEffect(()=>{
  caluculateTotalExpense()
  findExpenseNamesWithTotalPRice()
  },[])

 
    
  return (
    <div className='mainList'>
        {console.log("avi inside props",data)}
        <div  className="monthandex">
            <p className="datetext">{formatDate(date)}</p>
            <p className="expense">{totalAmount>0 ? <span>+</span> :<span>-</span> } {Math.abs(totalAmount)}</p>
        </div >
        <div className="everycategory">
          {
            Expenseslist.map((item)=>
            <Link to={`/editexpense/${item.category}--${date}--${item.sum}`} className={`eachcategory ${item.sum > 0 ? "inflow" : "outflow"}`} key={item.category}>
              <p className="categoryname">{item.category}</p>
               <p className="categoryAmount">{item.sum}</p>
           </Link>
            )
          //   .map((item) => 
          //     <div className="eachcategory outflow" key={item.category}>
          //     <p className="categoryname">{item.category}</p>
          //     <p className="categoryAmount">{item.sum}</p>
          // </div>
          //   )
          }
        </div>
    </div>
  )
}

export default MonthExpense