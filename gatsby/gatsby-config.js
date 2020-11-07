import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'Best Pizza in West Yorkshire!',
    twitter: `@slicksSlices`,
  },
  proxy: {
    prefix: '/api',
    url: 'http://localhost:8888',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      // this is the name of the plugin you're adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'slp01qjk',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
}
