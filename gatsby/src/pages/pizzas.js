import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'

function PizzasPage({
  data: {
    allSanityPizza: { nodes: pizzas },
  },
  pageContext,
}) {
  // filter Pizzas by topping or show all pizzas
  const pizzasToShow = pageContext.topping
    ? pizzas.filter(({ toppings }) => {
        for (const { id } of toppings) {
          if (id === pageContext.topping.id) return true
        }
        return false
      })
    : pizzas

  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={pizzasToShow} />
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
