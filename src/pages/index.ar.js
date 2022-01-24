import * as React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <Seo title="Home" />
    <h1>WordPress CMS</h1>
    {data.allWpPost.nodes.map(post => (
      <div className="post">
        <h2>{post.title}</h2>
        {/* <p>{post.excerpt}</p> */}
        <p>{parse(post.excerpt)}</p>
        {/* <div dangerouslySetInnerHTML={{__html: post.excerpt}} /> */}
      </div>
    ))}
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query getArabicText {
    allWpPost(filter: {language: {code: {eq: AR}}}) {
      nodes {
        id
        title
        excerpt
        slug
        date(formatString: "MMMM DD, YYYY")
        uri
      }
    }
  }
`