import React from 'react'
import Layout from '../components/Layout'
import '../css/styles.css'


const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>

  )
}

export default App