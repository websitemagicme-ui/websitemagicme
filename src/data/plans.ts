export type PlanId = 'starter' | 'business' | 'pro';

export interface Plan {
  id: PlanId;
  name: string;
  popular?: boolean;
  setupPrice: string;
  monthlyPrice: string;
  description: string;
  features: string[];
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    setupPrice: '$179',
    monthlyPrice: '$29/month',
    description: 'A professional online presence for small businesses.',
    features: [
      '1–5 pages',
      'Professionally designed responsive website',
      'Custom branding and colors',
      'Hosting and SSL',
      'Contact form',
      'Basic AI chatbot',
      'Basic AI usage allowance',
      'Security and backups',
      '1 website change request per month',
      'Human support',
    ],
    cta: 'Choose Starter',
  },
  {
    id: 'business',
    name: 'Business',
    popular: true,
    setupPrice: '$349',
    monthlyPrice: '$39/month',
    description: 'For growing businesses that want more customers and bookings.',
    features: [
      'Up to 10 pages',
      'Premium custom design',
      'Advanced AI receptionist',
      'Business-specific FAQ knowledge base',
      'Lead capture forms',
      'Appointment request functionality',
      'Booking or calendar integration',
      'Website analytics',
      'Higher AI usage allowance',
      '3 website change requests per month',
      'Priority human support',
    ],
    cta: 'Choose Business',
  },
  {
    id: 'pro',
    name: 'Pro',
    setupPrice: '$699+',
    monthlyPrice: '$69/month',
    description: 'For businesses that need advanced functionality and integrations.',
    features: [
      'Custom website architecture',
      'Advanced AI receptionist',
      'Online booking functionality',
      'Advanced forms and workflows',
      'E-commerce functionality',
      'CRM and API integrations',
      'Advanced analytics',
      'Larger AI knowledge base',
      'Higher AI usage allowance',
      '6 website change requests per month',
      'Priority human support',
    ],
    cta: 'Choose Pro',
  },
];

export interface ZeroUpfrontTier {
  plan: string;
  setupPrice: string;
  regularMonthly: string;
  zeroMonthly: string;
}

export const ZERO_UPFRONT_TIERS: ZeroUpfrontTier[] = [
  { plan: 'Starter', setupPrice: '$179', regularMonthly: '$29/mo', zeroMonthly: '$57/mo' },
  { plan: 'Business', setupPrice: '$349', regularMonthly: '$39/mo', zeroMonthly: '$98/mo' },
  { plan: 'Pro', setupPrice: '$699+', regularMonthly: '$69/mo', zeroMonthly: '$147/mo' },
];

export const getPlan = (id: PlanId): Plan =>
  PLANS.find((p) => p.id === id) ?? PLANS[0];

export const getZeroMonthly = (id: PlanId): string =>
  ZERO_UPFRONT_TIERS.find((t) => t.plan.toLowerCase() === id)?.zeroMonthly ?? '$57/mo';