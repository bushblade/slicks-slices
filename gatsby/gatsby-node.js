import path from 'path'

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js')
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)
  // 3. Loop over each pizza and create a page for that pizza
  data.allSanityPizza.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the url for this new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        wes: 'is cool',
        slug: pizza.slug.current,
      },
    })
  })
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. get the template
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js')
  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      allSanityTopping {
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)
  // 3. cratePage for that topping
  data.allSanityTopping.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.slug.current}`,
      component: toppingsTemplate,
      context: {
        topping,
        // TODO regex for topping
      },
    })
  })
  // 4. pass topping data to pizza.js
}

export async function createPages(params) {
  // create pages dynamically
  // wait for all promises to resolve before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ])
  // 1. pizzas
  // 2. toppings
  // 3. slicemasters
}
