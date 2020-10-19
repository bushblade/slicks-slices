import path from 'path'
import fetch from 'isomorphic-fetch'

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
        // provide topping id to filter in page query
        toppingId: topping.id,
      },
    })
  })
  // 4. pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. fetch a list of beers
  const response = await fetch('https://sampleapis.com/beers/api/ale')
  const beers = await response.json()
  // 2. loop over each one
  for (const beer of beers) {
    // gatsby needs some meta data for the node
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    }
    // 3. create a node for each beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    })
  }
}

async function turnSliceMastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      allSanityPerson {
        totalCount
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

  // 2.  turn each slicemaster into their own page
  data.allSanityPerson.nodes.forEach((person) => {
    actions.createPage({
      path: `slicemaster/${person.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        id: person.id,
      },
    })
  })

  // 3. figure out how many pages there are, and how many per page!
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(data.allSanityPerson.totalCount / pageSize)
  // 4. loop from 1. n and create the pages for them
  Array(pageCount)
    .fill('')
    .forEach((_, i) => {
      actions.createPage({
        path: `/slicemasters/${i + 1}`,
        component: path.resolve('./src/pages/slicemasters.js'),
        // this data is passed to the template when we create it
        // available as variables in our page graphql query
        context: {
          skip: i * pageSize,
          currentPage: i + 1,
          pageSize,
        },
      })
    })
}

// source data into our graphql
export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API!
  await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

// createPages
export async function createPages(params) {
  // create pages dynamically
  // wait for all promises to resolve before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
  ])
  // 1. pizzas
  // 2. toppings
  // 3. slicemasters
}
