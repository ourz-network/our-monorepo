import NavLink from './NavLink'

const Footer = () => (
  <footer className='2xl:px-24'>
    <div className='flex justify-start w-1/3 text-left'>
      <a
        target='_blank'
        href='https://zora.co'
        className='zora-branding'
        rel='noreferrer'
      >
        ☼☽
      </a>
    </div>
    <div className='flex justify-center w-1/3 text-center'>
      <NavLink passHref href='/about'>
        About
      </NavLink>
    </div>
    <div className='flex justify-end w-1/3 text-right'>
      <a
        target='_blank'
        href='https://docs.zora.co'
        rel='noreferrer'
        className='zora-branding'
      >
        Powered by Zora
      </a>
    </div>
  </footer>
)

export default Footer
