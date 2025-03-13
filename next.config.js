/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
