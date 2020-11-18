import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import useForm from '../utils/useForm'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'
import OrderStyles from '../styles/OrderStyles'
import MenuItemStyles from '../styles/MenuItemStyles'
import usePizza from '../utils/usePizza'
import PizzaOrder from '../components/PizzaOrder'
import calculateOrderTotal from '../utils/calculateOrderTotal'

function OrdersPage({ data: { allSanityPizza } }) {
  const [formData, setFormData] = useForm({
    name: '',
    email: '',
    maplesyrup: '',
  })

  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza(formData)

  if (message) {
    return <p>{message}</p>
  }

  return (
    <>
      <SEO title='Order a Pizza!!' />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
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
          <input
            type='email'
            name='maplesyrup'
            id='maplesyrup'
            onChange={setFormData}
            value={formData.maplesyrup}
            className='maplesyrup'
          />
        </fieldset>
        <fieldset className='menu' disabled={loading}>
          <legend>Menu</legend>
          {allSanityPizza.nodes.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
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
                  <button
                    key={size}
                    type='button'
                    onClick={() => addToOrder({ ...pizza, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className='order' disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder order={order} removeFromOrder={removeFromOrder} />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Your Total is {formatMoney(calculateOrderTotal(order))}</h3>
          <div>{error ? <p>{error}</p> : null}</div>
          <button type='submit' disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
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
