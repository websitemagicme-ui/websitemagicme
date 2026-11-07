import SEO from '@/components/SEO';
import Hero from '@/components/home/Hero';
import IntroOffer from '@/components/home/IntroOffer';
import Showroom from '@/components/home/Showroom';
import HowItWorks from '@/components/home/HowItWorks';
import AiReceptionist from '@/components/home/AiReceptionist';
import Benefits from '@/components/home/Benefits';
import Pricing from '@/components/home/Pricing';
import SeoServices from '@/components/home/SeoServices';
import DomainHosting from '@/components/home/DomainHosting';
import ZeroUpfront from '@/components/home/ZeroUpfront';
import CustomerShowcase from '@/components/home/CustomerShowcase';
import B2bMarketing from '@/components/home/B2bMarketing';
import Faq from '@/components/home/Faq';
import FinalCta from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <>
      <SEO
        canonicalPath="/"
        title="Managed Websites for Small Businesses"
        description="WebsiteMagic.me builds, hosts, and maintains professional websites for small businesses. AI receptionist, hosting, SEO, and ongoing support — all handled by one team. $0 upfront options available."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'WebsiteMagic.me',
          description: 'Managed websites for small businesses — design, hosting, AI receptionist, and ongoing support.',
          url: 'https://websitemagic.me',
          areaServed: 'US',
          offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: '29', highPrice: '69', offerCount: '6' },
        }}
      />
      <Hero />
      <IntroOffer />
      <Showroom />
      <CustomerShowcase />
      <HowItWorks />
      <AiReceptionist />
      <Benefits />
      <Pricing />
      <DomainHosting />
      <SeoServices />
      <ZeroUpfront />
      <B2bMarketing />
      <Faq />
      <FinalCta />
    </>
  );
}
