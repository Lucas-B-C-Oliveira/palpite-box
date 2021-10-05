import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'


const About = () => {
  return (
    <div>
      <PageTitle title='Sobre' />
      <h1>About</h1>
      <div>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </div>
    </div>
  )
}

export default About