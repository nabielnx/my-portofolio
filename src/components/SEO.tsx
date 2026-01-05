import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  name?: string
  type?: string
}

export const SEO = ({ 
  title, 
  description, 
  name = 'Muhammad Zaiimun Nabil', 
  type = 'website' 
}: SEOProps) => {
  const siteTitle = title ? `${title} | ${name}` : name
  const metaDescription = description || "A full-stack developer crafting high-performance, minimalist digital experiences."

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={metaDescription} />
      
      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content="/images/og-image.jpg" /> {/* Ensure you have this image or change it */}
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  )
}
