/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: [
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      'secure.gravatar.com',
      'cms.calumrodger.com',
      'localhost' // Add localhost to allow images from local
    ],
  },
  experimental: {
    scrollRestoration: false,
  },
}
