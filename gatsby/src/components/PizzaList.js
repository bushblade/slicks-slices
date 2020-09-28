import React from 'react'
import { Link } from 'gatsby'

function SinglePizza({
  pizza: {
    name,
    slug: { current },
    toppings,
  },
}) {
  return (
    <div>
      <Link to={`/pizza/${current}`}>
        <h2>
          <span className='mark'>{name}</span>
        </h2>
        <p>{toppings.map((topping) => topping.name).join(', ')}</p>
      </Link>
    </div>
  )
}

function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </div>
  )
}

export default PizzaList
