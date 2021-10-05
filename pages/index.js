import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/PageTitle'


const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {

  const { data, error } = useSWR('/api/get-promo', fetcher)

  return (
    <div>
      <PageTitle title='Seja Bem-Vindo' />

      <p className='text-center'>
        O restaurante x sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir sua opinião
      </p>

      <div className='text-center my-12'>
        <Link href='/survey'>
          <a className='bg-blue-400 px-12 py-4 font-medium rounded-lg shadow-lg hover:shadow'>
            Dar opinião ou sugestão
          </a>
        </Link>
      </div>

      {!data && <p className='my-10 text-center font-thin text-yellow-500'>Carregando...</p>}

      {!error && data && data.showCoupon &&
        <p className='my-10 text-center'>
          {data.message}
        </p>
      }

    </div>
  )
}

export default Index