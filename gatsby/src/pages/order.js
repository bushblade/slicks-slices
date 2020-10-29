import React, { useState } from 'react'
import SEO from '../components/SEO'
import useForm from '../utils/useForm'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'

function OrdersPage({ data: { allSanityPizza } }) {
  const [formData, setFormData] = useForm({
    name: '',
    email: '',
  })

  return (
    <>
      <SEO title='Order a Pizza!!' />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={setFormData}
            value={formData.name}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={setFormData}
            value={formData.email}
          />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          {allSanityPizza.nodes.map((pizza) => (
            <div key={pizza.id}>
              <Img
                width='50'
                height='50'
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {'S,M,L'.split(',').map((size) => (
                  <button key={size} type='button'>
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  )
}

export default OrdersPage

export const query = graphql`
  query {
    allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
