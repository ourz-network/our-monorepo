// These styles apply to every route in the application

// import 'our-components/dist/our-components.css'
import '@/styles/_app/globals.css'

export default async function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      // className='dark-theme'
      // style={{ 'color-scheme': 'dark-theme' }}
    >
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body>{children}</body>
    </html>
  )
}
