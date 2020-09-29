import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

function SinglePizza({
  pizza: {
    name,
    slug: { current },
    toppings,
    image,
  },
}) {
  return (
    <div>
      <Link to={`/pizza/${current}`}>
        <h2>
          <span className='mark'>{name}</span>
        </h2>
        <p>{toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fluid={image.asset.fluid} alt={name} />
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
