import React from 'react'
import Img from 'gatsby-image'
import MenuItemStyles from '../styles/MenuItemStyles'
import formatMoney from '../utils/formatMoney'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'

function PizzaOrder({ order, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => (
        <MenuItemStyles key={singleOrder.id + index}>
          <Img fluid={singleOrder.image.asset.fluid} />
          <h2>
            {singleOrder.name} {singleOrder.size}
          </h2>
          <p>
            {formatMoney(
              calculatePizzaPrice(singleOrder.price, singleOrder.size)
            )}
            <button
              type='button'
              className='remove'
              title={`Remove ${singleOrder.size} ${singleOrder.name} from order`}
              onClick={() => removeFromOrder(index)}
            >
              &times;
            </button>
          </p>
        </MenuItemStyles>
      ))}
    </>
  )
}

export default PizzaOrder
