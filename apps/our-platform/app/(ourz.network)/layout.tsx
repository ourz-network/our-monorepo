// These styles apply to every route in the application

// import 'our-components/dist/our-components.css'
import '@/styles/_app/globals.css'
import Script from 'next/script'

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className='bg-white dark:bg-black dark:text-[color:var(--hello-world)]'
      // className='dark-theme'
      // style={{ 'color-scheme': 'dark-theme' }}
    >
      <body>{children}</body>
      <Script
        id='tailwind-theme'
        strategy='afterInteractive'
        // document.documentElement.styleSheets.cssRules.insertRule('--hello-world: #666')
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          try {
            if (
              localStorage.theme === 'dark' ||
              (
                !('theme' in localStorage) &&
                window.matchMedia(
                  '(prefers-color-scheme: dark)'
                  ).matches
                  )
                  ) {
                    document.documentElement.classList.add('dark')
                    document.documentElement.setAttribute("style", "--hello-world: #666;")
                    let style = document.querySelector("style")
                    style.append("html:{--hello-world:#666}")

                document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0B1120')
              } else {
                document.documentElement.classList.remove('dark')
              }
              // } catch (_) {}
            } catch (error) {
              console.log(error)
            }
          `,
        }}
      />
    </html>
  )
}
