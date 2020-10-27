import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import SEO from '../components/SEO'

function Slicemaster({
  data: {
    sanityPerson: {
      name,
      description,
      image: {
        asset: { fluid, src },
      },
    },
  },
}) {
  return (
    <>
      <SEO title={name} image={fluid.src} />
      <div className='center'>
        <Img fluid={fluid} />
        <h2 className='mark'>{name}</h2>
        <p>{description}</p>
      </div>
    </>
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
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`
