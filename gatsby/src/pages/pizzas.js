import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'

function PizzasPage({
  data: {
    allSanityPizza: { nodes: pizzas },
  },
}) {
  return (
    <>
      <PizzaList pizzas={pizzas} />
    </>
  )
}

export const query = graphql`
  query {
    allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`

export default PizzasPage
