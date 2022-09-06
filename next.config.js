/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponents: true,
    newNextLinkBehavior: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
};

module.exports = nextConfig;
