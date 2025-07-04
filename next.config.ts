// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Discord.js için gerekli konfigürasyonlar
    if (isServer) {
      // Server-side externals - bu paketleri bundle'a dahil etme
      config.externals = [
        ...config.externals,
        {
          'utf-8-validate': 'commonjs utf-8-validate',
          'bufferutil': 'commonjs bufferutil',
          'zlib-sync': 'commonjs zlib-sync',
          'erlpack': 'commonjs erlpack',
          'node-opus': 'commonjs node-opus',
          'opusscript': 'commonjs opusscript',
          '@discordjs/opus': 'commonjs @discordjs/opus',
          'sodium': 'commonjs sodium',
          'libsodium-wrappers': 'commonjs libsodium-wrappers',
          'tweetnacl': 'commonjs tweetnacl',
        }
      ];
    }

    // Client-side fallback'ler
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      fs: false,
      crypto: false,
      stream: false,
      util: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      os: false,
      path: false,
      'zlib-sync': false,
      'utf-8-validate': false,
      'bufferutil': false,
    };

    return config;
  },
  
  // Discord.js'i server component'lerden hariç tut
  experimental: {
    serverComponentsExternalPackages: ['discord.js', '@discordjs/ws'],
  },
  
  // Transpile edilmeyecek paketler
  transpilePackages: [],
  
  // Build optimizasyonları
  swcMinify: true,
};

module.exports = nextConfig;