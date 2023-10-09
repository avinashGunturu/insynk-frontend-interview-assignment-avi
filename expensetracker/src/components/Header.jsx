import React from 'react'
import './Common.css'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='heaermain'>
        <p className="apptext">Expense Tracker</p>
        <Link to="/addexpense" className='addbtn'>Add</Link>
    </div>
  )
}

export default Header