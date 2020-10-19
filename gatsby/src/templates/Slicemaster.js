import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

function Slicemaster({
  data: {
    sanityPerson: {
      name,
      description,
      image: {
        asset: { fluid },
      },
    },
  },
}) {
  return (
    <div>
      <Img fluid={fluid} />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Slicemaster

export const query = graphql`
  query($id: String!) {
    sanityPerson(id: { eq: $id }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`
