import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/operator/', '/regulator/', '/api/'],
    },
    sitemap: 'https://veristiq.io/sitemap.xml',
  };
}



