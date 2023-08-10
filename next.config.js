/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['app', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },
}

module.exports = nextConfig
