/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, navigate } from "gatsby"

import Header from "./header"
import "./layout.css"

const getRedirectLanguage = () => {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const lang = navigator && navigator.language && navigator.language.split('-')[0];
  if (!lang) return 'en';

  switch (lang) {
    case 'ar':
      return 'ar';
    default:
      return 'en';
  }
};


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useEffect(() => {
    const urlLang = getRedirectLanguage();

    if(urlLang != 'en')
      navigate(`/${urlLang}`);
  }, []);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
