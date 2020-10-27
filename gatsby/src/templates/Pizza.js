import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import SEO from '../components/SEO'

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minMax(400px, 1fr));
`

function SinglePizzaPage({
  data: {
    sanityPizza: { image, name, toppings },
  },
}) {
  return (
    <>
      <SEO title={name} image={image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={image.asset.fluid} />
        <div>
          <h2 className='mark'>{name}</h2>
          <ul>
            {toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  )
}

export default SinglePizzaPage

// this needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`
