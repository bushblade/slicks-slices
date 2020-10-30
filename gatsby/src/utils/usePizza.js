import { useState } from 'react'

export default function usePizza({ pizzas, inputs }) {
  // 1. create some state to hold our order
  const [order, setOrder] = useState([])
  // 2. make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza])
  }
  // 3. make a function remove things from order
  function removeFromOrder(index) {
    setOrder(order.filter((_, i) => i !== index))
  }
  // 4. send this data to a serverless function when then checkout
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  }
}
