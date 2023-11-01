/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true,
        serverComponentsExternalPackages:["mongoose"],
        appDir:true
    },
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"img.clerk.com"
            },
            {
                protocol:"https",
                hostname:"imgages.clerk.dev"
            },
            {
                protocol:"https",
                hostname:"placehold.co"
            },

            
        ],
        domains: [
            "firebasestorage.googleapis.com"
        ],
        webpack(config) {
            config.experiments = {
                ...config.experiments,
                topLevelAwait: true
            }
            return config
        }
    }
}

module.exports = nextConfig
