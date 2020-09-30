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

export async function createPages(params) {
  // create pages dynamically
  // 1. pizzas
  await turnPizzasIntoPages(params)
  // 2. toppings
  // 3. slicemasters
}
