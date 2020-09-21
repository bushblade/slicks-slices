import React from 'react'
import { Link } from 'gatsby'

function Nav() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Hot Now</Link>
          </li>
          <li>
            <Link to='/pizzas'>Pizza Menu</Link>
          </li>
          <li>
            <Link to='/'>LOGO</Link>
          </li>
          <li>
            <Link to='/slicemasters'>SliceMasteres</Link>
          </li>
          <li>
            <Link to='/order'>Order Ahead!</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
