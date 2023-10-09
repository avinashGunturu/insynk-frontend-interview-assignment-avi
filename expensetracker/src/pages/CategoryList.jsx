import React, { useState } from 'react'
import './category.css'
import Footer from '../components/Footer'

function CategoryList() {
  
  const Category = [
    { isMain: true, order: 1, name: "Food" },
    { isMain: true, order: 2, name: "Transportation" },
    { isMain: true, order: 3, name: "Work" },
    { isMain: false, order: 4, name: "Traveling" },
  ]
  const [categoryList,setCategoryLit] = useState(localStorage.getItem("Category") ? JSON.parse(localStorage.getItem("Category")) : Category)
  const [categoryname,setCategoryname] = useState("")
  const [model,setModel]=useState(false)
  const [cremovename,setcategoryrename] = useState("")
  const [removeorder,setRemoveorder]=useState("")
  const [error,setError]=useState("")
  
  const handleAddCategory = () => {
     if(categoryname === ""){
      setError("Please add the Category")
      return 
     }
    let newCategory = {
      isMain:true,
      order:categoryList[categoryList.length - 1 ].order + 1,
      name:categoryname,
    }
    
    let exparray = localStorage.getItem("Category") ? localStorage.getItem("Category") : JSON.stringify(categoryList) ;
    let parsearray = JSON.parse(exparray)
    let newexpArray = [...parsearray,newCategory ] 
    setCategoryLit([...parsearray,newCategory ] )
    localStorage.setItem("Category", JSON.stringify(newexpArray));
    setCategoryname("")
    setError("")
  }

  const removeCategory = (Corder,name)=>{
     setModel(true)
     setcategoryrename(name)
     setRemoveorder(Corder)
  }

  const confirmremove = (Corder)=> {
    setCategoryLit(categoryList.filter(item => item.order !== Corder))
    localStorage.setItem("Category", JSON.stringify(categoryList.filter(item => item.order !== Corder)));
    // getting ecpense array and changing acording to the delit
     let expensearray = JSON.parse(localStorage.getItem("Expenses")) 
     expensearray && expensearray.length >= 0 && localStorage.setItem("Expenses",JSON.stringify(expensearray.filter(item => item.category !== cremovename))) 
     setModel(false)
  }

  return (
    <div className='categorymain'>
      <div className="addHeader">
         <p className='addexptext'>Category List</p>
      </div>
      <div className="categoresList">
        {
          categoryList.map(ec=>
            <div className="eachCategory" key={ec.order}>
            <p className='eachctext'>{ec.name}</p>
            <div className='crossbtn' onClick={()=>removeCategory(ec.order,ec.name)}>X</div>
          </div>
            )
        }
      </div>
      <div className="addingbox">
        <input type="text" placeholder='Enter category' className='addtext' value={categoryname} onChange={(e)=>setCategoryname(e.target.value)} />
        <button onClick={handleAddCategory} className='addbutton'>Add</button>
      </div>
      {
        error ? <p>{error}</p> : null
      }
      <Footer name={"Category"} />
      {
        model ? 

      <div className="modelwindow">
          <ul>
            <li>{cremovename} will be Removed</li>
            <li>All Expense with this category will also be removed</li>
          </ul>
          <p className="errortext">Do you really Want to Remove ?</p>
          <div className="actiondiv">
            <div className="cancel" onClick={()=>setModel(false)}>Cancel</div>
            <div className="Confiram" onClick={()=>confirmremove(removeorder)}>Confirm</div>
          </div>
      </div> : null

      }
    </div>
  )
}

export default CategoryList