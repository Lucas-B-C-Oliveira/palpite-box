import React from 'react'


const siteLink = 'https://herkul.itch.io/'
const linkedInLink = 'https://www.linkedin.com/in/lucas-c-oliveira-8b5317143/'
const gitHubLink = 'https://github.com/lucascoliveira189'
const Footer = () => {
  return (
    <div className='bg-gray-700 p-4'>

      <div className='container mx-auto text-center font-thin text-white'>

        Projeto desenvolvido por:{' '}
        <a className='hover:underline' href={siteLink}>Lucas B C Oliveira</a> | {' '}
        <a className='hover:underline' href={linkedInLink}>Linkedin</a> | {' '}
        <a className='hover:underline' href={gitHubLink}>Github</a>

        <div className='mt-2'>
          <img className='inline p-5' src='/logo_semana_fsm.png' />
          <img className='inline p-5' src='/logo_devpleno.png' />
        </div>

      </div>

    </div>
  )
}

export default Footer