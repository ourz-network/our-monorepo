import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|examples|[\\w-]+\\.\\w+).*)',
  ],
}

// eslint-disable-next-line import/no-default-export
export default function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get('host') ?? 'ourz.network/about'

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.ourz.xyz`, '').replace(`.ourz.network`, '')
      : hostname.replace(`.localhost:3000`, '')
  // console.log({ hostname, path, currentHost })
  // rewrites for app pages
  if (
    currentHost === 'app' &&
    (hostname.includes('ourz.network') || hostname.includes('localhost:3000'))
  ) {
    switch (path) {
      case '/':
        console.log(0)
        return NextResponse.rewrite(new URL(`/_dapp/1/drops${path}`, req.url))

      default:
        console.log(1)
        return NextResponse.rewrite(new URL(`/_dapp/1${path}`, req.url))
    }
  }

  switch (hostname) {
    // rewrite root application to `/home` folder
    case 'ourz.xyz':
      console.log(2)
    // fallthrough
    case 'ourz.network':
      console.log(3)
      url.pathname = `/_home${url.pathname}`
      return NextResponse.rewrite(new URL(`/_home${path}`, req.url))

    case 'localhost:3000':
      if (!path || path === '/') {
        console.log(4)
        url.pathname = `/_dapp/1/drops${url.pathname}`
        // console.log(url.pathname, { path }, req)
        return NextResponse.rewrite(new URL(`/_dapp/1/drops${path}`, req.url))
      } else {
        console.log(5)
        url.pathname = `/_dapp/1${url.pathname}`
        return NextResponse.rewrite(new URL(`/_dapp/1${path}`, req.url))
      }
    default:
      console.log(6)
      // rewrite everything else to `/_sites/[site] dynamic route
      return NextResponse.rewrite(
        new URL(`/_gallery/${currentHost}${path}`, req.url)
      )
  }
}
