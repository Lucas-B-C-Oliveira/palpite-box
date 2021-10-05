import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'


const Contact = () => {
  return (
    <div>
      <PageTitle title='Contato' />
      <h1>Contact</h1>
      <div>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </div>
    </div>
  )
}

export default Contact