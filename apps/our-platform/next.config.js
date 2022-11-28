// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// withBundleAnalyzer(

// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      'src/app',
      'src/common',
      'src/modules',
      'src/pages',
      'src/utils/index.ts',
    ],
  },
  // extends: ['plugin:@next/next/recommended'],
  images: {
    // limit of 25 deviceSizes values
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // limit of 50 domains values
    domains: [
      'ipfs.io',
      'ipfs.fleek.co',
      'storage.fleek.co',
      'storageapi.fleek.co',
      'arweave.net',
      'gateway.pinata.cloud',
      'ipfs.dweb.link',
      'images.mirror-media.xyz',
      'media.giphy.com',
      'zora-dev.mypinata.cloud',
      'avatars.githubusercontent.com',
    ],
    path: '/_next/image',
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    loader: 'default',
    // disable static imports for image files
    disableStaticImages: false,
    // minimumCacheTTL is in seconds, must be integer 0 or more
    minimumCacheTTL: 604800, // 1 week
  },
  experimental: {
    appDir: true,
    // allowMiddlewareResponseBody: true,
    // serverComponentsExternalPackages: ["mongodb"],
  },
  swcMinify: false, // Required to fix: https://nextjs.org/docs/messages/failed-loading-swc,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //   }

  //   return config;
  // },
  // fallback: {
  //   fs: false,
  // },
}

module.exports = nextConfig
