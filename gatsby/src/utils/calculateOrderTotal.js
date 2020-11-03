import calculatePizzaPrice from './calculatePizzaPrice'
import formatMoney from './formatMoney'

export default function calculateOrderTotal(order) {
  const totalPrice = order.reduce(
    (acc, { price, size }) => acc + calculatePizzaPrice(price, size),
    0
  )
  return formatMoney(totalPrice)
}
