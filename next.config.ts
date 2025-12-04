import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Transpile @tabler/icons-react to fix module resolution issues
  transpilePackages: ['@tabler/icons-react'],
  // Use webpack instead of Turbopack - set empty config to silence warning
  turbopack: {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: any, { isServer }: { isServer: boolean }): any => {
    // Fix for @tabler/icons-react module resolution with .mjs files
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
      '.mjs': ['.mjs', '.mts'],
    };
    
    // Ensure .mjs files are handled correctly - must come before other rules
    config.module.rules.unshift({
      test: /\.mjs$/,
      include: /node_modules\/@tabler/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    
    // General .mjs handling for node_modules
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      exclude: /node_modules\/@tabler/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    
    // Fix for @tabler/icons-react - allow resolving .mjs files
    config.resolve.extensions = [
      '.mjs',
      '.js',
      '.mts',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      ...(config.resolve.extensions || []),
    ];
    
    // Ensure proper module resolution for @tabler package
    config.resolve.mainFields = ['browser', 'module', 'main'];
    
    // Fix for @tabler/icons-react - ensure .mjs imports resolve correctly
    config.resolve.conditionNames = ['import', 'require', 'node', 'default'];
    
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ]
      }
    ]
  }
};
export default nextConfig;