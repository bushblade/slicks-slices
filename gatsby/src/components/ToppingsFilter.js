import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
  }
  .count {
    background: white;
    padding: 2px 5px;
  }
  .active {
    background: var(--yellow);
  }
`

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      // if it is, increment by 1, 'two'
      // otherwise create a new entry in our acc and set it to 1
      if (acc[topping.id]) {
        acc[topping.id].count++
      } else {
        acc[topping.id] = {
          name: topping.name,
          id: topping.id,
          count: 1,
          slug: topping.slug.current,
        }
      }
      return acc
    }, {})

  return Object.values(counts).sort((a, b) => b.count - a.count)
}

function ToppingsFilter() {
  // Get a list of all the toppings
  // Get a list of all the Pizzas with their toppings
  const { allSanityTopping, allSanityPizza } = useStaticQuery(graphql`
    query {
      allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      allSanityPizza {
        nodes {
          toppings {
            name
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)
  // count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(allSanityPizza.nodes)

  // Loop over the list of toppings and display topping and count of pizzas with that topping
  return (
    <ToppingStyles>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.slug}`} key={topping.id}>
          <span className='name'>{topping.name}</span>
          <span className='count'>{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  )
}

export default ToppingsFilter
