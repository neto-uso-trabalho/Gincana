/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false, // Mantenha false para detectar erros reais
  },
  images: {
    unoptimized: true, // Caso tenha problemas com otimização de imagens
  },
}

module.exports = nextConfig
