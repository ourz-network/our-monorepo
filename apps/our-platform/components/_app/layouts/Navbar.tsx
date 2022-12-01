'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'

export function Navbar() {
  return (
    <NavigationMenu.Root className='flex justify-center w-full z-[1] text-center'>
      <NavigationMenu.List className='flex justify-center p-1 m-0 w-screen list-none text-black bg-white border-b border-orange-400 dark:bg-black dark:text-white'>
        <div className='flex justify-center w-full max-w-[1536px]'>
          {/* logo */}
          <NavigationMenu.Item className='w-1/4 border border-orange-500 border-solid'>
            <NavigationMenu.Link className='' href='/home'>
              OURZ
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          {/* center nav */}
          <NavigationMenu.Sub className='flex w-1/2 border border-red-500 border-solid'>
            <NavigationMenu.Item className='w-1/3'>
              <NavigationMenu.Link className='' href='/drops'>
                DROPS
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item className='w-1/3'>
              <NavigationMenu.Link className='' href='/splits'>
                SPLITS
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item className='w-1/3'>
              <NavigationMenu.Link className='' href='/stats'>
                STATS
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Sub>
          {/* wallet */}
          <NavigationMenu.Item className='w-1/4 border border-green-500 border-solid'>
            <NavigationMenu.Link // TODO button
              className=''
              href='/splits'
            >
              Wallet
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          {/* <NavigationMenu.Item className='border border-red-500 border-solid'> */}
          {/* <NavigationMenu.Trigger className='border border-red-500 border-solid' /> */}
          {/* <NavigationMenu.Content className='border border-red-500 border-solid'> */}
          {/* <NavigationMenu.Sub className='border border-red-500 border-solid'> */}
          {/* <NavigationMenu.List className='border border-red-500 border-solid' /> */}
          {/* <NavigationMenu.Viewport className='border border-red-500 border-solid' /> */}
          {/* </NavigationMenu.Sub> */}
          {/* </NavigationMenu.Content> */}
          {/* </NavigationMenu.Item> */}
          <NavigationMenu.Indicator className='border border-red-500 border-solid' />
        </div>
      </NavigationMenu.List>
      <NavigationMenu.Viewport className='border border-red-500 border-solid' />
    </NavigationMenu.Root>
  )
}
