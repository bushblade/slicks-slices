import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'

function PizzasPage({
  data: {
    allSanityPizza: { nodes: pizzas },
  },
}) {
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </>
  )
}

export const query = graphql`
  query PizzaQuery($toppingId: String) {
    allSanityPizza(
      filter: { toppings: { elemMatch: { id: { eq: $toppingId } } } }
    ) {
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
