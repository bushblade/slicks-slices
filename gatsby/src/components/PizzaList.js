import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`

const PizzaStyles = styled.div`
  display: grid;
  /* take your row sizing not from the PizzaStyles containing div but from the PizzaGridStyles grid*/
  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: auto auto 1fr;
  }
  grid-template-rows: subgrid;
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`

function SinglePizza({
  pizza: {
    name,
    slug: { current },
    toppings,
    image,
  },
}) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${current}`}>
        <h2>
          <span className='mark'>{name}</span>
        </h2>
      </Link>
      <p>{toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={image.asset.fluid} alt={name} />
    </PizzaStyles>
  )
}

function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  )
}

export default PizzaList
