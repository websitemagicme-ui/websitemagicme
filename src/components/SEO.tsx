import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = 'https://websitemagic.me';
const DEFAULT_TITLE = 'WebsiteMagic.me — Managed Websites for Small Businesses';
const DEFAULT_DESC =
  'Professional websites for small businesses — design, hosting, AI receptionist, and ongoing support in one plan. $0 upfront options available.';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({
  title,
  description = DEFAULT_DESC,
  canonicalPath,
  type = 'website',
  image = `${SITE_URL}/og-image.png`,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | WebsiteMagic.me` : DEFAULT_TITLE;
    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', `${SITE_URL}${canonicalPath ?? ''}`);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    if (canonicalPath) {
      setLink('canonical', `${SITE_URL}${canonicalPath}`);
    }

    const existing = document.getElementById('dynamic-jsonld');
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'dynamic-jsonld';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalPath, type, image, jsonLd]);

  return null;
}
