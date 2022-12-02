// These styles apply to every route in the application

// import 'our-components/dist/our-components.css'
import '@/styles/_app/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import Script from 'next/script'

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      // dark:text-[color:var(--hello-world)]
      className='overflow-x-hidden w-full h-full text-black bg-white dark:bg-black dark:text-white'
    >
      <body>{children}</body>
      <Script
        id='tailwind-theme'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              // document.documentElement.setAttribute("style", "--hello-world: #666;")
              // document?.documentElement?.classList?.add('dark')
            } else {
              document?.documentElement?.classList?.remove('dark')
            }
          } catch (_) {}
          `,
        }}
      />
    </html>
  )
}
