import React, { useEffect, useState } from 'react'
import './AddExpense.css'
import {Link} from 'react-router-dom'
import { useNavigate,useParams } from "react-router-dom";

function EditExpense() {
  const Category = [
    { isMain: true, order: 1, name: "Food" },
    { isMain: true, order: 2, name: "Transportation" },
    { isMain: true, order: 3, name: "Work" },
    { isMain: false, order: 4, name: "Traveling" },
  ]
  const [categoryList,setCategoryList] = useState(JSON.parse(localStorage.getItem("Category")) ? JSON.parse(localStorage.getItem("Category")) : Category )
  const [type,setType] = useState("")
  const [category,setCategory] = useState("")
  const [amount,setAmount] = useState("")
  const [Dates,setDate] = useState("")
  const [description,setDescription] = useState("")
  const [isAdded,setIsAdded]= useState(false)
  const [showmsg,setShowmsg] =useState(false)
  const [errorMsg,setErrorMsg] = useState("")
  
  // date wise list  

  const navigate = useNavigate();
  const { id } = useParams();
 const  handleRender = () => {
    setTimeout(() => {
      setShowmsg(true)
    }, 1000);
  }

const addHandler = ()=>{
   if(type === ''||category=== ""||Dates===""||amount ==="") {
    setErrorMsg("All fields are Required Except 'Description' ")
    return
   }

     let newExpense = {
       id:  Date.now(),
       type: type,
       category: category,
       date: Dates,
       amount:type ===  "Cash in" ? +amount:-amount,
       description: description,
     }
     let exparray = localStorage.getItem("Expenses") ? localStorage.getItem("Expenses") : `[]` ;
     let parsearray = JSON.parse(exparray)
     let newexpArray = [...parsearray,newExpense ] 
     localStorage.setItem("Expenses", JSON.stringify(newexpArray));
     setIsAdded(true)
     handleRender()
}
   
useEffect(()=>{
    let category = id.split("--")[0]
    let Expesndate =  id.split("--")[1]
    let sum =  id.split("--")[2]
// console.log("sum",sum)
  //   let eData = JSON.parse(localStorage.getItem("expenseDates")) 
  //   let clickedData = eData[Expesndate]
  //   setDateWiseList(eData[Expesndate])
  //   let clickedExpense = eData[Expesndate].filter((item) => (item.category) === category)
  //  console.log("clicked data",clickedExpense)

  //   let totalamount=0;
  //     clickedExpense.reduc((item)=>{
  //           totalamount = totalamount + +item.amount 
  //     })
    setAmount(sum)
    setCategory(category) 
    setType(sum > 0 ? "Cash in" : "Cash out" )
    setDate(Expesndate)

    // console.log("category",category,"eDate",Expesndate,"eData",eData[Expesndate])
},[])

  return (
    <div className='addMain'>
      <div className="addHeader">
         <p className='addexptext'>Edit Expense</p>
         <Link to="/" className='removeLink'>Remove</Link>
      </div>
      <div className="addBody">
        <div className="eachinput">
          <p className="inptitle">Type</p>
          <div className="types">
            <div className={`cashout ${type === "Cash out" ? 'active' : ''}`} onClick={()=> setType("Cash out")}>Cash Out</div>
            <div className={`cashin ${type === "Cash in" ? 'active' : ''}`} onClick={()=>setType("Cash in")}>Cash in</div>
          </div>
        </div>
        <div className="eachinput">
          <p className="inptitle">Category</p>
          <select name="Category" id="Category" className='Categorys' value={category} onChange={(e)=> setCategory(e.target.value)}>
            {
              categoryList.map(item => <option key={item.order} value={item.name}>{item.name}</option> )
            }
          </select>
        </div>
        <div className="eachinput">
          <p className="inptitle">Amount</p>
          <input type="number" name="amount" className='amount' value={amount} placeholder='enterAmount' onChange={(e)=>setAmount(e.target.value)} />
        </div>
        <div className="eachinput">
          <p className="inptitle">Date</p>
          <input type="date" name="date" className='date' value={Dates} onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div className="eachinput">
          <p className="inptitle">Description</p>
          <textarea name="description" className='description' value={description} placeholder='Enter Description' cols="30" rows="10" onChange={(e)=>setDescription(e.target.value)} ></textarea>
        </div>
      </div>
      {
        isAdded ? <p className='Addedexptext'>Added Expense</p> :  null
      }
      {
        errorMsg ? <p className='errorMsg'>{errorMsg}</p> : null
      }
      {
        showmsg ? navigate('/') : null
      }
      <div className="addFotter">
        <Link to="/" className="Canclebtn button">Cancel</Link>
        <div className="addbtn button" onClick={addHandler}>Update</div>
      </div>
    </div>
  )
}

export default EditExpense