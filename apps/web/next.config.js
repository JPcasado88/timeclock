/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@timeclock/shared', '@timeclock/ui'],
}

module.exports = nextConfig
