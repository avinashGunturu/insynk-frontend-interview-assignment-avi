import React from 'react'
import {Link} from 'react-router-dom'

const Footer = ({name}) => {
  return (
    <div className='fotter'>
        <Link to='/' className={`Expense ${name === 'Expense' ? "active" : ""}`}>Expense</Link>
        <Link to='/categorylist' className={`Category ${name === 'Category' ? "active" : ""}`}>Category</Link>

    </div>
  )
}

export default Footer