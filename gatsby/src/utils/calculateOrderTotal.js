import calculatePizzaPrice from './calculatePizzaPrice'

export default function calculateOrderTotal(order) {
  return order.reduce(
    (acc, { price, size }) => acc + calculatePizzaPrice(price, size),
    0
  )
}
