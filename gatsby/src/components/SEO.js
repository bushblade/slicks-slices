import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ image, children, location, description, title }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `)
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang='en' />
      <title>{title}</title>
      {/* { fav icons } */}
      <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      <link rel='alternate icon' href='/favicion.ico' />
      {/* {meta tags} */}
      <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      <meta charSet='utf-8' />
      <meta name='description' content={site.siteMetadata.description} />
      {/* {open graph} */}
      {location && <meta property='og:url' content={location.href} />}
      <meta property='og:image' content={image || '/logo.svg'} />
      <meta property='og:title' content={title} key='ogtitle' />
      <meta
        property='og:site_name'
        content={site.siteMetadata.title}
        key='ogsitename'
      />
      <meta property='og:description' content={description} key='description' />
      {children}
    </Helmet>
  )
}

export default SEO
