if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `)
}

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      process.env.WORDPRESS_API_URL.match()[0], // Valid WP Image domain. DELETE REGEX IN PARENTHESIS
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




