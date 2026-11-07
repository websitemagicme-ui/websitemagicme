export type DemoId =
  | 'blade-and-co'
  | 'luna-beauty'
  | 'olive-and-stone'
  | 'proflow-plumbing'
  | 'smilepoint'
  | 'northstar-consulting'
  | 'city-limo'
  | 'ironforge-fitness'
  | 'sterling-law'
  | 'pawsitive-vet'
  | 'meridian-realty'
  | 'ember-coffee'
  | 'lens-and-light';

export type DemoCategory =
  | 'Beauty'
  | 'Restaurants'
  | 'Home Services'
  | 'Healthcare'
  | 'Professional Services'
  | 'Transportation'
  | 'Fitness'
  | 'Legal'
  | 'Pet Care'
  | 'Real Estate'
  | 'Cafes';

export interface DemoService {
  title: string;
  desc: string;
  price?: string;
}

export interface DemoMenuItem {
  name: string;
  desc: string;
  price: string;
}

export interface DemoTeamMember {
  name: string;
  role: string;
  image: string;
}

export interface DemoTestimonial {
  quote: string;
  author: string;
  detail: string;
}

export interface DemoSite {
  id: DemoId;
  businessName: string;
  industry: string;
  category: DemoCategory;
  tagline: string;
  description: string;
  accentColor: string;
  heroImage: string;
  galleryImages: { src: string; alt: string; caption: string }[];
  preview: {
    hero: string;
    subhero: string;
    navItems: string[];
    services: DemoService[];
    menu?: DemoMenuItem[];
    hours: { day: string; time: string }[];
    address: string;
    phone: string;
    email: string;
    about: string;
    aboutImage: string;
    cta: string;
    team: DemoTeamMember[];
    testimonials: DemoTestimonial[];
    stats: { value: string; label: string }[];
    faqs?: { q: string; a: string }[];
  };
  knowledge: { keywords: string[]; answer: string }[];
}

export const CATEGORIES: ('All' | DemoCategory)[] = [
  'All',
  'Beauty',
  'Restaurants',
  'Home Services',
  'Healthcare',
  'Professional Services',
  'Transportation',
  'Fitness',
  'Legal',
  'Pet Care',
  'Real Estate',
  'Cafes',
];

export const DEMOS: DemoSite[] = [
  {
    id: 'blade-and-co',
    businessName: 'Blade & Co.',
    industry: 'Premium Barber Shop',
    category: 'Beauty',
    tagline: 'Sharp cuts. Classic craft.',
    description:
      'A refined barbershop showcasing traditional grooming services, online booking, and a strong neighborhood brand.',
    accentColor: '#b45309',
    heroImage:
      'https://images.pexels.com/photos/7518739/pexels-photo-7518739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/4625620/pexels-photo-4625620.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Barber trimming a client hair in a modern barbershop',
        caption: 'The chair',
      },
      {
        src: 'https://images.pexels.com/photos/37533244/pexels-photo-37533244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Close-up of a barber expertly cutting hair',
        caption: 'Attention to detail',
      },
      {
        src: 'https://images.pexels.com/photos/7518740/pexels-photo-7518740.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Barber working on a haircut in a stylish barbershop',
        caption: 'The craft',
      },
    ],
    preview: {
      hero: 'Premium grooming in the heart of the city',
      subhero:
        'Classic cuts, straight-razor shaves, and genuine conversation. Walk in a stranger, leave looking sharp.',
      navItems: ['Home', 'Services', 'Barbers', 'Gallery', 'Book'],
      services: [
        { title: 'Classic Cut', desc: 'Tailored cut and finish with hot towel.', price: '$32' },
        { title: 'Beard Sculpt', desc: 'Precision beard trim and shape-up.', price: '$24' },
        { title: 'Hot Towel Shave', desc: 'Traditional straight-razor shave.', price: '$38' },
        { title: 'Father & Son', desc: 'Two cuts, one relaxing visit.', price: '$54' },
        { title: 'Skin Fade', desc: 'High, mid, or low fade — your call.', price: '$36' },
        { title: 'Head Shave', desc: 'Straight-razor head shave with hot towel.', price: '$28' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '8:00 AM – 7:00 PM' },
        { day: 'Saturday', time: '8:00 AM – 5:00 PM' },
        { day: 'Sunday', time: 'Closed' },
      ],
      address: '214 Maple Street, Portland, OR',
      phone: '(503) 555-0142',
      email: 'hello@bladeandco.example',
      about:
        'Blade & Co. opened its doors in 2014 with one chair and a simple idea: a great haircut should come with great service. Today we have four barbers, a wall of vintage mirrors, and a waiting room that feels more like a friend\'s living room than a shop.',
      aboutImage:
        'https://images.pexels.com/photos/7697271/pexels-photo-7697271.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Book an Appointment',
      team: [
        {
          name: 'Marcus Reed',
          role: 'Master Barber & Owner',
          image:
            'https://images.pexels.com/photos/3998402/pexels-photo-3998402.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Diego Ortiz',
          role: 'Senior Barber',
          image:
            'https://images.pexels.com/photos/3998413/pexels-photo-3998413.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Sam Whitaker',
          role: 'Barber',
          image:
            'https://images.pexels.com/photos/9992819/pexels-photo-9992819.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'Best fade I\'ve had in ten years. Marcus actually listens to what you want.',
          author: 'James T.',
          detail: 'Regular since 2019',
        },
        {
          quote: 'The hot towel shave is worth every penny. Feels like a time machine.',
          author: 'Robert K.',
          detail: 'Monthly visitor',
        },
      ],
      stats: [
        { value: '10+', label: 'Years open' },
        { value: '4', label: 'Master barbers' },
        { value: '12k+', label: 'Cuts given' },
        { value: '4.9★', label: 'Avg. rating' },
      ],
      faqs: [
        { q: 'Do you take walk-ins?', a: 'Yes, when chairs are free — but booking ahead is best on weekends.' },
        { q: 'How long does a cut take?', a: 'Most cuts take 30–40 minutes. A shave adds 20 minutes.' },
        { q: 'Gift cards?', a: 'Available in any amount at the front desk.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'saturday', 'hours', 'sunday'],
        answer:
          'We\'re open Monday through Friday 8 AM to 7 PM, and Saturday 8 AM to 5 PM. We\'re closed on Sundays.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'charge', 'fee'],
        answer:
          'A classic cut is $32, a beard sculpt is $24, a hot towel shave is $38, and our Father & Son package is $54.',
      },
      {
        keywords: ['where', 'located', 'location', 'address'],
        answer:
          'You can find us at 214 Maple Street in Portland, OR. There\'s free street parking after 10 AM.',
      },
      {
        keywords: ['book', 'appointment', 'reserve', 'schedule'],
        answer:
          'You can book an appointment right on our website by tapping "Book an Appointment," or call us at (503) 555-0142.',
      },
      {
        keywords: ['walk', 'walk-in', 'appointment needed'],
        answer:
          'Walk-ins are welcome when chairs are free, but we recommend booking ahead on weekends to avoid a wait.',
      },
    ],
  },
  {
    id: 'luna-beauty',
    businessName: 'Luna Beauty',
    industry: 'Beauty Salon',
    category: 'Beauty',
    tagline: 'Glow that lasts.',
    description:
      'A calming beauty salon offering facials, waxing, and nail services with an elegant, spa-like online presence.',
    accentColor: '#9d174d',
    heroImage:
      'https://images.pexels.com/photos/37229304/pexels-photo-37229304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/3985331/pexels-photo-3985331.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Facial treatment with cream mask applied with a brush',
        caption: 'Signature facial',
      },
      {
        src: 'https://images.pexels.com/photos/3738377/pexels-photo-3738377.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Manicure session in a nail salon',
        caption: 'Nail care',
      },
      {
        src: 'https://images.pexels.com/photos/3985321/pexels-photo-3985321.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Woman enjoying a soothing facial treatment at a spa',
        caption: 'Pure relaxation',
      },
    ],
    preview: {
      hero: 'Your skin, beautifully cared for',
      subhero:
        'Tailored facials, nail care, and brow services in a calm, light-filled studio. Every treatment is designed around you.',
      navItems: ['Home', 'Treatments', 'Pricing', 'Gallery', 'Book'],
      services: [
        { title: 'Signature Facial', desc: 'Deep cleanse, exfoliation, and custom mask.', price: '$65' },
        { title: 'Glow Facial', desc: 'Brightening treatment with vitamin C.', price: '$80' },
        { title: 'Mani-Pedi Combo', desc: 'Shape, polish, and a relaxing massage.', price: '$55' },
        { title: 'Brow & Lash Tint', desc: 'Define your brows and lashes.', price: '$30' },
        { title: 'Gel Manicure', desc: 'Long-lasting chip-free color.', price: '$45' },
        { title: 'Hydro Facial', desc: 'Deep hydration with hyaluronic acid.', price: '$95' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '9:00 AM – 8:00 PM' },
        { day: 'Saturday', time: '9:00 AM – 6:00 PM' },
        { day: 'Sunday', time: '10:00 AM – 4:00 PM' },
      ],
      address: '78 Sunrise Blvd, Austin, TX',
      phone: '(512) 555-0188',
      email: 'hello@lunabeauty.example',
      about:
        'Luna Beauty is a neighborhood salon dedicated to healthy skin and confident glow. We believe self-care should feel personal — never rushed, never one-size-fits-all. Our estheticians take time to understand your skin before touching a single product.',
      aboutImage:
        'https://images.pexels.com/photos/5659018/pexels-photo-5659018.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Reserve Your Visit',
      team: [
        {
          name: 'Sofia Luna',
          role: 'Lead Esthetician & Owner',
          image:
            'https://images.pexels.com/photos/12115016/pexels-photo-12115016.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Maya Chen',
          role: 'Nail Artist',
          image:
            'https://images.pexels.com/photos/18112333/pexels-photo-18112333.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Priya Shah',
          role: 'Esthetician',
          image:
            'https://images.pexels.com/photos/7446667/pexels-photo-7446667.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'My skin has never looked better. Sofia customizes every facial to what I need that day.',
          author: 'Aisha M.',
          detail: 'Monthly client',
        },
        {
          quote: 'The gel mani lasted three weeks without a chip. The whole experience is so relaxing.',
          author: 'Nina R.',
          detail: 'Bi-weekly regular',
        },
      ],
      stats: [
        { value: '6', label: 'Treatment rooms' },
        { value: '3', label: 'Estheticians' },
        { value: '8k+', label: 'Treatments' },
        { value: '5.0★', label: 'Avg. rating' },
      ],
      faqs: [
        { q: 'Do you offer gift cards?', a: 'Yes — digital gift cards in any amount, available on our website or at the desk.' },
        { q: 'What products do you use?', a: 'We use professional, cruelty-free skincare brands chosen for sensitive and normal skin types.' },
        { q: 'How early should I arrive?', a: '5 minutes before your appointment is perfect.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'saturday', 'sunday', 'hours'],
        answer:
          'We\'re open Monday–Friday 9 AM–8 PM, Saturday 9 AM–6 PM, and Sunday 10 AM–4 PM.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'charge'],
        answer:
          'Our Signature Facial is $65, the Glow Facial is $80, a Mani-Pedi combo is $55, and brow & lash tinting is $30.',
      },
      {
        keywords: ['where', 'located', 'location', 'address'],
        answer: 'We\'re located at 78 Sunrise Blvd in Austin, TX, right next to Sunrise Park.',
      },
      {
        keywords: ['book', 'appointment', 'reserve', 'schedule'],
        answer:
          'You can reserve your visit online through the "Reserve Your Visit" button, or call us at (512) 555-0188.',
      },
      {
        keywords: ['gift', 'card', 'certificate'],
        answer:
          'Yes, we offer digital gift cards in any amount — just ask at the front desk or order one through our website.',
      },
    ],
  },
  {
    id: 'olive-and-stone',
    businessName: 'Olive & Stone',
    industry: 'Restaurant',
    category: 'Restaurants',
    tagline: 'Wood-fired. Seasonal. Local.',
    description:
      'A modern farm-to-table restaurant website featuring the seasonal menu, reservations, and a warm, inviting atmosphere.',
    accentColor: '#15803d',
    heroImage:
      'https://images.pexels.com/photos/30120984/pexels-photo-30120984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/8471699/pexels-photo-8471699.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Pizzas with white wine on a rustic wooden table',
        caption: 'Stone oven pies',
      },
      {
        src: 'https://images.pexels.com/photos/1327393/pexels-photo-1327393.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Luxurious gourmet meal plated with vegetables and sauce',
        caption: 'Seasonal plates',
      },
      {
        src: 'https://images.pexels.com/photos/5953552/pexels-photo-5953552.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Chef preparing pizza dough in a pizzeria',
        caption: 'Made from scratch',
      },
    ],
    preview: {
      hero: 'Seasonal plates, wood-fired soul',
      subhero:
        'A neighborhood kitchen cooking with what\'s grown nearby. Open for dinner Tuesday through Sunday.',
      navItems: ['Home', 'Menu', 'Reservations', 'Private Events', 'Contact'],
      services: [],
      menu: [
        { name: 'Wood-Fired Octopus', desc: 'Charred, smoked paprika, preserved lemon.', price: '$18' },
        { name: 'Stone Oven Margherita', desc: 'San Marzano, fior di latte, basil.', price: '$16' },
        { name: 'Burrata & Heirloom', desc: 'Local burrata, tomato, basil oil.', price: '$15' },
        { name: 'Braised Short Rib', desc: 'Polenta, gremolata, red wine jus.', price: '$28' },
        { name: 'Wild Mushroom Tagliatelle', desc: 'Hand-cut pasta, parmesan, thyme.', price: '$22' },
        { name: 'Roasted Half Chicken', desc: 'Market vegetables, salsa verde.', price: '$26' },
        { name: 'Olive Oil Cake', desc: 'Citrus, local honey, sea salt.', price: '$9' },
        { name: 'Affogato', desc: 'Vanilla gelato, espresso, amaretti.', price: '$8' },
      ],
      hours: [
        { day: 'Tue–Thu', time: '5:00 PM – 10:00 PM' },
        { day: 'Fri–Sat', time: '5:00 PM – 11:00 PM' },
        { day: 'Sunday', time: '5:00 PM – 9:00 PM' },
      ],
      address: '402 Vine Street, Napa, CA',
      phone: '(707) 555-0203',
      email: 'reserve@oliveandstone.example',
      about:
        'Olive & Stone is a wood-fired neighborhood kitchen. We cook with what\'s grown nearby, season by season — simple plates, real ingredients, and a room that feels like home. Our oven runs on oak and our menu changes with the harvest.',
      aboutImage:
        'https://images.pexels.com/photos/6223172/pexels-photo-6223172.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Reserve a Table',
      team: [
        {
          name: 'Chef Elena Rossi',
          role: 'Executive Chef & Owner',
          image:
            'https://images.pexels.com/photos/5953552/pexels-photo-5953552.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'The octopus is the best dish in Napa. Full stop.',
          author: 'Daniel V.',
          detail: 'Local food writer',
        },
        {
          quote: 'Felt like dinner at a friend\'s house — if your friend was an incredible chef.',
          author: 'Maria L.',
          detail: 'Anniversary dinner',
        },
      ],
      stats: [
        { value: '1', label: 'Wood-fired oven' },
        { value: '40', label: 'Local farms' },
        { value: '6 yr', label: 'Seasonal menus' },
        { value: '4.8★', label: 'Avg. rating' },
      ],
      faqs: [
        { q: 'Do you have vegetarian options?', a: 'Yes — half our menu is vegetarian, and we always have a vegan option.' },
        { q: 'Can you accommodate allergies?', a: 'Absolutely. Let us know when you book and we\'ll plan accordingly.' },
        { q: 'Is there parking?', a: 'Complimentary valet Friday and Saturday. Street parking is free after 6 PM.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'monday'],
        answer:
          'We\'re open Tuesday–Thursday 5–10 PM, Friday–Saturday 5–11 PM, and Sunday 5–9 PM. We\'re closed on Mondays.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'expensive', 'menu price'],
        answer:
          'Our small plates range from $15–$18, mains $22–$32, and desserts $8–$12. A typical dinner for two runs about $90 before drinks.',
      },
      {
        keywords: ['where', 'located', 'location', 'address'],
        answer: 'We\'re at 402 Vine Street in Napa, CA, across from the Vine Street Plaza.',
      },
      {
        keywords: ['book', 'reservation', 'reserve', 'table'],
        answer:
          'You can reserve a table online through the "Reserve a Table" button, or call us at (707) 555-0203.',
      },
      {
        keywords: ['vegan', 'vegetarian', 'gluten', 'allerg'],
        answer:
          'Yes — we have clearly marked vegetarian and vegan options, and a gluten-free menu on request. Let us know any allergies when you book.',
      },
      {
        keywords: ['parking'],
        answer: 'There\'s complimentary valet on Friday and Saturday evenings, and street parking is free after 6 PM.',
      },
    ],
  },
  {
    id: 'proflow-plumbing',
    businessName: 'ProFlow Plumbing',
    industry: 'Plumbing Company',
    category: 'Home Services',
    tagline: 'Fast. Reliable. Licensed.',
    description:
      'A trusted plumbing company website with service areas, emergency contact, and clear, professional service offerings.',
    accentColor: '#1d4ed8',
    heroImage:
      'https://images.pexels.com/photos/29226620/pexels-photo-29226620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Plumber installing steel pipes indoors',
        caption: 'Repiping work',
      },
      {
        src: 'https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Hands adjusting a boiler system',
        caption: 'Boiler maintenance',
      },
      {
        src: 'https://images.pexels.com/photos/39885422/pexels-photo-39885422.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Worker using tools to align pipes',
        caption: 'Precision fitting',
      },
    ],
    preview: {
      hero: 'Licensed plumbers you can count on',
      subhero:
        'From emergency leaks to whole-home repiping — ProFlow has served Denver homeowners for over 15 years. Upfront pricing, real warranties, real people.',
      navItems: ['Home', 'Services', 'Service Area', 'Reviews', 'Contact'],
      services: [
        { title: 'Emergency Repair', desc: '24/7 burst pipes and leaks.', price: 'From $129' },
        { title: 'Drain Cleaning', desc: 'Hydro-jetting and snaking.', price: 'From $89' },
        { title: 'Water Heater', desc: 'Install and repair, all brands.', price: 'From $399' },
        { title: 'Repiping', desc: 'Whole-home pipe replacement.', price: 'Free quote' },
        { title: 'Fixture Install', desc: 'Faucets, toilets, sinks.', price: 'From $149' },
        { title: 'Sewer Line', desc: 'Camera inspection and repair.', price: 'From $199' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '7:00 AM – 7:00 PM' },
        { day: 'Saturday', time: '8:00 AM – 4:00 PM' },
        { day: 'Sunday', time: 'Emergency only' },
      ],
      address: '55 Industrial Way, Denver, CO',
      phone: '(303) 555-0177',
      email: 'service@proflowplumbing.example',
      about:
        'ProFlow Plumbing has served Denver homeowners for over 15 years. We\'re licensed, insured, and available when you need us most. No surprise fees — we confirm pricing before we start, every time.',
      aboutImage:
        'https://images.pexels.com/photos/16509869/pexels-photo-16509869.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Request Service',
      team: [
        {
          name: 'Tom Bradley',
          role: 'Master Plumber & Owner',
          image:
            'https://images.pexels.com/photos/17063686/pexels-photo-17063686.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'They showed up at midnight for a burst pipe and had it fixed by 2 AM. Lifesavers.',
          author: 'Karen W.',
          detail: 'Emergency call',
        },
        {
          quote: 'Upfront price, no upsell, clean work. This is how every contractor should operate.',
          author: 'Mike D.',
          detail: 'Water heater install',
        },
      ],
      stats: [
        { value: '15+', label: 'Years in Denver' },
        { value: '24/7', label: 'Emergency service' },
        { value: '10k+', label: 'Jobs done' },
        { value: '4.9★', label: 'Avg. rating' },
      ],
      faqs: [
        { q: 'Do you offer warranties?', a: 'Yes — all repairs come with a 1-year workmanship warranty.' },
        { q: 'Is there a service call fee?', a: 'The diagnostic visit is $49, which is credited toward any repair work.' },
        { q: 'What areas do you cover?', a: 'Denver, Aurora, Lakewood, Centennial, and surrounding areas.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday', 'sunday', 'emergency'],
        answer:
          'Our office is open Monday–Friday 7 AM–7 PM and Saturday 8 AM–4 PM. We offer 24/7 emergency service every day, including Sundays.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'charge', 'estimate'],
        answer:
          'Emergency repairs start at $129, drain cleaning from $89, and water heater installs from $399. Repiping is a free quote. We\'ll always confirm pricing before we start.',
      },
      {
        keywords: ['where', 'located', 'location', 'area', 'service area'],
        answer:
          'We\'re based at 55 Industrial Way in Denver and serve the greater Denver metro area, including Aurora, Lakewood, and Centennial.',
      },
      {
        keywords: ['book', 'appointment', 'schedule', 'service', 'request'],
        answer:
          'You can request service right from our website with the "Request Service" button, or call (303) 555-0177 for same-day help.',
      },
      {
        keywords: ['license', 'insured', 'warranty'],
        answer:
          'Yes — we\'re fully licensed and insured, and all repairs come with a 1-year workmanship warranty.',
      },
    ],
  },
  {
    id: 'smilepoint',
    businessName: 'SmilePoint',
    industry: 'Dental Clinic',
    category: 'Healthcare',
    tagline: 'Gentle, modern dental care.',
    description:
      'A friendly dental clinic website with appointment booking, service explanations, and a calm, trustworthy design.',
    accentColor: '#0e7490',
    heroImage:
      'https://images.pexels.com/photos/8413334/pexels-photo-8413334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Modern dental clinic room with equipment',
        caption: 'State-of-the-art operatories',
      },
      {
        src: 'https://images.pexels.com/photos/6809639/pexels-photo-6809639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'High-tech dental office setup',
        caption: 'Advanced technology',
      },
      {
        src: 'https://images.pexels.com/photos/4269268/pexels-photo-4269268.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Modern dentist office with dental chair',
        caption: 'Comfort first',
      },
    ],
    preview: {
      hero: 'A brighter smile, made simple',
      subhero:
        'Comfortable, preventive dental care for the whole family. Modern technology, gentle hands, and zero judgment. New patients always welcome.',
      navItems: ['Home', 'Services', 'Team', 'New Patients', 'Book'],
      services: [
        { title: 'Cleaning & Exam', desc: 'Routine checkup and hygiene.', price: '$99' },
        { title: 'Teeth Whitening', desc: 'In-office brightening.', price: '$299' },
        { title: 'Invisalign Consult', desc: 'Clear aligner assessment.', price: 'Free' },
        { title: 'Dental Implants', desc: 'Permanent tooth replacement.', price: 'From $1,800' },
        { title: 'Root Canal', desc: 'Save your natural tooth.', price: 'From $899' },
        { title: 'Crowns & Bridges', desc: 'Restore damaged or missing teeth.', price: 'From $1,100' },
      ],
      hours: [
        { day: 'Mon–Thu', time: '8:00 AM – 5:00 PM' },
        { day: 'Friday', time: '8:00 AM – 2:00 PM' },
        { day: 'Sat–Sun', time: 'Closed' },
      ],
      address: '900 Wellness Drive, Raleigh, NC',
      phone: '(919) 555-0150',
      email: 'appointments@smilepoint.example',
      about:
        'SmilePoint is a modern dental practice focused on comfortable, preventive care for the whole family. We invest in technology that makes visits faster and easier, and we take time to explain every step. No judgment, ever.',
      aboutImage:
        'https://images.pexels.com/photos/6812453/pexels-photo-6812453.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Book a Visit',
      team: [
        {
          name: 'Dr. Amara Patel',
          role: 'Lead Dentist & Owner',
          image:
            'https://images.pexels.com/photos/5355864/pexels-photo-5355864.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Dr. Kevin Lee',
          role: 'Associate Dentist',
          image:
            'https://images.pexels.com/photos/37458081/pexels-photo-37458081.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'I used to dread the dentist. Dr. Patel made me feel completely at ease. Zero pain, zero judgment.',
          author: 'Sarah H.',
          detail: 'New patient',
        },
        {
          quote: 'They got my whole family in the same week. The kids actually look forward to it now.',
          author: 'The Rivera Family',
          detail: 'Family of four',
        },
      ],
      stats: [
        { value: '2', label: 'Dentists' },
        { value: '6', label: 'Operatories' },
        { value: '15+', label: 'Years serving' },
        { value: '4.9★', label: 'Avg. rating' },
      ],
      faqs: [
        { q: 'Do you accept walk-ins?', a: 'We schedule by appointment to minimize wait times, but we do keep same-day slots for emergencies.' },
        { q: 'What insurance do you accept?', a: 'We accept most major PPO plans. Call us with your insurance details and we\'ll verify coverage.' },
        { q: 'Do you see children?', a: 'Yes — we treat patients of all ages and have a gentle approach with little ones.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday', 'sunday', 'friday'],
        answer:
          'We\'re open Monday–Thursday 8 AM–5 PM and Friday 8 AM–2 PM. We\'re closed on weekends.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'insurance', 'payment'],
        answer:
          'A cleaning and exam is $99, whitening is $299, and Invisalign consults are free. We accept most major insurance and offer flexible payment plans.',
      },
      {
        keywords: ['where', 'located', 'location', 'address'],
        answer: 'We\'re at 900 Wellness Drive in Raleigh, NC, in the Wellness Medical Plaza.',
      },
      {
        keywords: ['book', 'appointment', 'schedule', 'visit'],
        answer:
          'You can book a visit online through the "Book a Visit" button, or call us at (919) 555-0150.',
      },
      {
        keywords: ['new patient', 'first visit', 'insurance', 'accept'],
        answer:
          'Yes, we\'re accepting new patients! We accept most major insurance plans. Your first visit includes a full exam and X-rays.',
      },
      {
        keywords: ['kids', 'children', 'pediatric', 'family'],
        answer: 'Yes, we see patients of all ages — kids are welcome. We have a gentle, friendly approach for little ones.',
      },
    ],
  },
  {
    id: 'northstar-consulting',
    businessName: 'Northstar Consulting',
    industry: 'Professional Services',
    category: 'Professional Services',
    tagline: 'Clarity for what\'s next.',
    description:
      'A sophisticated consulting firm website highlighting expertise, case studies, and a clean lead-generation funnel.',
    accentColor: '#1f2937',
    heroImage:
      'https://images.pexels.com/photos/36765718/pexels-photo-36765718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/36765719/pexels-photo-36765719.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Team discussing business strategy in a modern office',
        caption: 'Strategy sessions',
      },
      {
        src: 'https://images.pexels.com/photos/6285107/pexels-photo-6285107.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Businessmen collaborating over documents in an office',
        caption: 'Hands-on partnership',
      },
      {
        src: 'https://images.pexels.com/photos/36733331/pexels-photo-36733331.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Two professionals discussing business in a modern office',
        caption: 'Clear direction',
      },
    ],
    preview: {
      hero: 'Strategy for ambitious teams',
      subhero:
        'We help mid-market companies find direction — turning complexity into clear, actionable strategy. No fluff, no jargon, just a path forward.',
      navItems: ['Home', 'Services', 'Case Studies', 'About', 'Contact'],
      services: [
        { title: 'Growth Strategy', desc: 'Market positioning and GTM planning.', price: 'Custom' },
        { title: 'Operations Audit', desc: 'Process and systems review.', price: 'Custom' },
        { title: 'Fractional Strategy', desc: 'Ongoing advisory partnership.', price: 'Monthly' },
        { title: 'Team Workshops', desc: 'Hands-on strategy sessions.', price: 'From $2,500' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '9:00 AM – 6:00 PM' },
        { day: 'Saturday', time: 'By appointment' },
        { day: 'Sunday', time: 'Closed' },
      ],
      address: '120 Market Street, Chicago, IL',
      phone: '(312) 555-0190',
      email: 'hello@northstar.example',
      about:
        'Northstar Consulting helps mid-market teams find direction. We\'ve worked with over 80 companies across SaaS, professional services, and manufacturing. We turn complexity into clear, actionable strategy — and we stay to help you execute.',
      aboutImage:
        'https://images.pexels.com/photos/36765732/pexels-photo-36765732.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Book a Consultation',
      team: [
        {
          name: 'Rachel Monroe',
          role: 'Managing Partner',
          image:
            'https://images.pexels.com/photos/36765714/pexels-photo-36765714.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'Northstar helped us refocus and tripled our pipeline in six months. Worth every penny.',
          author: 'CEO, SaaS company',
          detail: 'Series B, $15M ARR',
        },
        {
          quote: 'They cut through our internal chaos and gave us a plan everyone could rally behind.',
          author: 'COO, Professional services firm',
          detail: '120 employees',
        },
      ],
      stats: [
        { value: '80+', label: 'Companies served' },
        { value: '15+', label: 'Years experience' },
        { value: '$2B+', label: 'Revenue influenced' },
        { value: '4.9★', label: 'Client rating' },
      ],
      faqs: [
        { q: 'What size companies do you work with?', a: 'Primarily mid-market B2B firms between $5M and $50M in revenue.' },
        { q: 'Do you work remotely?', a: 'Yes — we work with clients nationwide, in person or fully remote.' },
        { q: 'How do engagements start?', a: 'With a free 30-minute consultation to see if we\'re a fit.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday'],
        answer:
          'Our office hours are Monday–Friday 9 AM–6 PM. Saturday consultations are available by appointment only.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'fee', 'rate'],
        answer:
          'Engagements are scoped to your needs. Team workshops start at $2,500, and ongoing advisory is a monthly retainer. Let\'s talk specifics on a free intro call.',
      },
      {
        keywords: ['where', 'located', 'location', 'address'],
        answer: 'We\'re at 120 Market Street in Chicago, IL, and we work with clients nationwide.',
      },
      {
        keywords: ['book', 'appointment', 'call', 'consultation', 'schedule'],
        answer:
          'You can book a free consultation through the "Book a Consultation" button on our website, or call (312) 555-0190.',
      },
      {
        keywords: ['industries', 'who', 'clients', 'work with'],
        answer:
          'We work primarily with mid-market B2B and professional services firms between $5M and $50M in revenue.',
      },
    ],
  },
  {
    id: 'city-limo',
    businessName: 'City Limo Service',
    industry: 'Limousine Service',
    category: 'Transportation',
    tagline: 'Arrive in style.',
    description:
      'A sleek limousine service website with fleet showcase, online booking, and a premium black-car aesthetic.',
    accentColor: '#111827',
    heroImage:
      'https://images.pexels.com/photos/12185055/pexels-photo-12185055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Black luxury car with sleek design',
        caption: 'Executive sedans',
      },
      {
        src: 'https://images.pexels.com/photos/17396143/pexels-photo-17396143.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'White limousine parked on city street',
        caption: 'Stretch limos',
      },
      {
        src: 'https://images.pexels.com/photos/5880098/pexels-photo-5880098.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'White limo with tinted glasses on city street at night',
        caption: 'Night on the town',
      },
    ],
    preview: {
      hero: 'Premium chauffeured transportation',
      subhero:
        'Airport transfers, corporate travel, weddings, and nights out. Professional chauffeurs, immaculate vehicles, and always on time.',
      navItems: ['Home', 'Fleet', 'Services', 'Pricing', 'Book'],
      services: [
        { title: 'Airport Transfer', desc: 'To and from the airport, on your schedule.', price: 'From $79' },
        { title: 'Corporate Travel', desc: 'Hourly chauffeur service for business.', price: 'From $95/hr' },
        { title: 'Wedding Package', desc: 'Your special day, in style.', price: 'From $499' },
        { title: 'Wine Tour', desc: 'Chauffeured vineyard tours.', price: 'From $89/hr' },
        { title: 'Prom & Events', desc: 'Safe, stylish arrival.', price: 'From $349' },
        { title: 'Point-to-Point', desc: 'Direct luxury transfer.', price: 'From $69' },
      ],
      hours: [
        { day: 'Mon–Sun', time: '24 hours / 7 days' },
        { day: 'Holidays', time: 'Available' },
      ],
      address: '100 Terminal Road, Las Vegas, NV',
      phone: '(702) 555-0155',
      email: 'reservations@citylimo.example',
      about:
        'City Limo Service has provided premium chauffeured transportation for over 12 years. Our fleet is meticulously maintained, our chauffeurs are background-checked professionals, and our booking is effortless. Whether it\'s a 5 AM airport run or your wedding day, we show up on time — every time.',
      aboutImage:
        'https://images.pexels.com/photos/13467183/pexels-photo-13467183.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Book Your Ride',
      team: [
        {
          name: 'David Okonkwo',
          role: 'Operations Director',
          image:
            'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'On time at 4 AM for my flight, spotless car, professional driver. My go-to for airport runs.',
          author: 'Jeff R.',
          detail: 'Business traveler',
        },
        {
          quote: 'Booked a stretch limo for our wedding — it was pristine and the driver was incredibly kind.',
          author: 'Maria & Tom',
          detail: 'Wedding booking',
        },
      ],
      stats: [
        { value: '12+', label: 'Years operating' },
        { value: '24/7', label: 'Always available' },
        { value: '50+', label: 'Vehicles in fleet' },
        { value: '4.9★', label: 'Avg. rating' },
      ],
      faqs: [
        { q: 'How early should I book?', a: 'We recommend 24 hours ahead for guaranteed availability, but we often accommodate same-day requests.' },
        { q: 'Is gratuity included?', a: 'Gratuity is not included. We suggest 18–20% for excellent service.' },
        { q: 'What is your cancellation policy?', a: 'Free cancellation up to 12 hours before your ride. Within 12 hours, a 50% fee applies.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'available', '24'],
        answer: 'We operate 24 hours a day, 7 days a week, including all holidays.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'rate', 'fee'],
        answer:
          'Airport transfers start at $79, corporate hourly service from $95/hr, and wedding packages from $499. Point-to-point starts at $69.',
      },
      {
        keywords: ['where', 'located', 'location', 'area', 'serve'],
        answer:
          'We\'re based in Las Vegas and serve the greater metro area, including Henderson, Summerlin, and North Las Vegas.',
      },
      {
        keywords: ['book', 'reservation', 'reserve', 'ride', 'schedule'],
        answer:
          'You can book your ride online with the "Book Your Ride" button, or call our dispatch at (702) 555-0155.',
      },
      {
        keywords: ['airport', 'transfer', 'pick up', 'mccarran', 'harry reid'],
        answer:
          'Yes, we provide airport transfers to and from Harry Reid International Airport. Meet-and-greet service is available for $20 extra.',
      },
    ],
  },
  {
    id: 'ironforge-fitness',
    businessName: 'IronForge Fitness',
    industry: 'Strength & Conditioning Gym',
    category: 'Fitness',
    tagline: 'Forge your strongest self.',
    description:
      'A bold, high-energy gym website with a dark theme, oversized typography, class scheduling, and membership tiers.',
    accentColor: '#dc2626',
    heroImage:
      'https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/32695898/pexels-photo-32695898.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Two women in athletic wear in a gym with equipment',
        caption: 'Group training',
      },
      {
        src: 'https://images.pexels.com/photos/3838705/pexels-photo-3838705.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Athlete resting after intense weightlifting workout',
        caption: 'Push your limits',
      },
      {
        src: 'https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Focused man working out in a gym',
        caption: 'No excuses',
      },
    ],
    preview: {
      hero: 'Stronger every single day',
      subhero:
        'Coaching, community, and the equipment to back it up. Whether you\'re a first-timer or a competitive lifter, we\'ll get you to your next level.',
      navItems: ['Home', 'Classes', 'Membership', 'Coaching', 'Join'],
      services: [
        { title: 'Strength Foundations', desc: 'Learn the big lifts safely.', price: '$89/mo' },
        { title: 'Group Conditioning', desc: 'High-intensity circuits.', price: '$119/mo' },
        { title: '1-on-1 Coaching', desc: 'Personalized programming.', price: '$249/mo' },
        { title: 'Powerlifting Club', desc: 'Competition prep team.', price: '$159/mo' },
        { title: 'Nutrition Plan', desc: 'Custom macros and guidance.', price: '$79/mo' },
        { title: 'Drop-In Pass', desc: 'Try us for a day.', price: '$20' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '5:00 AM – 11:00 PM' },
        { day: 'Sat–Sun', time: '7:00 AM – 8:00 PM' },
      ],
      address: '770 Forge Street, Pittsburgh, PA',
      phone: '(412) 555-0173',
      email: 'join@ironforgefit.example',
      about:
        'IronForge Fitness is a 12,000 sq ft strength and conditioning gym. We built this place for people who want to train hard and train smart — no mirrors, no fluff. Our coaches hold NSCA and USA Weightlifting certifications.',
      aboutImage:
        'https://images.pexels.com/photos/3838705/pexels-photo-3838705.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Start Free Trial',
      team: [
        {
          name: 'Coach Jake Sullivan',
          role: 'Head Strength Coach',
          image:
            'https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Coach Amanda Yu',
          role: 'Conditioning & Mobility',
          image:
            'https://images.pexels.com/photos/32695898/pexels-photo-32695898.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'I went from never having touched a barbell to deadlifting 400 lbs in 8 months. The coaches actually care.',
          author: 'Tyler J.',
          detail: 'Member since 2023',
        },
        {
          quote: 'The conditioning classes are the best workout I\'ve ever had. I\'m in the best shape of my life at 45.',
          author: 'Rachel D.',
          detail: 'Group member',
        },
      ],
      stats: [
        { value: '12k', label: 'Square feet' },
        { value: '8', label: 'Certified coaches' },
        { value: '500+', label: 'Active members' },
        { value: '4.9★', label: 'Avg. rating' },
      ],
      faqs: [
        { q: 'Do you offer a free trial?', a: 'Yes — your first week is completely free, no card required.' },
        { q: 'Is this gym beginner-friendly?', a: 'Absolutely. Our Strength Foundations program is built for first-timers.' },
        { q: 'Can I freeze my membership?', a: 'Yes, you can freeze for up to 3 months per year at no charge.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday', 'sunday'],
        answer: 'We\'re open Monday–Friday 5 AM–11 PM and Saturday–Sunday 7 AM–8 PM.',
      },
      {
        keywords: ['cost', 'price', 'membership', 'how much'],
        answer:
          'Strength Foundations is $89/mo, Group Conditioning is $119/mo, 1-on-1 coaching is $249/mo, and a drop-in pass is $20.',
      },
      {
        keywords: ['where', 'located', 'location', 'address'],
        answer: 'We\'re at 770 Forge Street in Pittsburgh, PA, near the Strip District.',
      },
      {
        keywords: ['book', 'join', 'sign up', 'trial', 'membership'],
        answer:
          'You can start your free trial through the "Start Free Trial" button, or call us at (412) 555-0173.',
      },
      {
        keywords: ['beginner', 'new', 'first time', 'start'],
        answer:
          'Yes, we\'re very beginner-friendly. Our Strength Foundations program teaches the core lifts safely, step by step.',
      },
    ],
  },
  {
    id: 'sterling-law',
    businessName: 'Sterling & Associates',
    industry: 'Law Firm',
    category: 'Legal',
    tagline: 'Trusted counsel. Proven results.',
    description:
      'An editorial-style law firm website with a sophisticated serif aesthetic, case results, practice areas, and attorney profiles.',
    accentColor: '#1e3a5f',
    heroImage:
      'https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/8112115/pexels-photo-8112115.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Businessman working on a laptop in a law office with Lady Justice statue',
        caption: 'Diligent representation',
      },
      {
        src: 'https://images.pexels.com/photos/6077797/pexels-photo-6077797.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Golden justice scales on a desk beside a laptop',
        caption: 'Balanced counsel',
      },
      {
        src: 'https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Classic law study room with books and gavel',
        caption: 'Deep expertise',
      },
    ],
    preview: {
      hero: 'Experienced legal counsel when it matters most',
      subhero:
        'For over 25 years, Sterling & Associates has represented individuals and businesses in personal injury, corporate law, and estate planning. We win the cases others won\'t take.',
      navItems: ['Home', 'Practice Areas', 'Attorneys', 'Results', 'Contact'],
      services: [
        { title: 'Personal Injury', desc: 'Maximize your compensation.', price: 'Contingency' },
        { title: 'Corporate Law', desc: 'Contracts, formation, disputes.', price: 'Hourly' },
        { title: 'Estate Planning', desc: 'Wills, trusts, and probate.', price: 'Flat fee' },
        { title: 'Family Law', desc: 'Divorce, custody, support.', price: 'Hourly' },
        { title: 'Real Estate Law', desc: 'Closings and disputes.', price: 'Flat fee' },
        { title: 'Civil Litigation', desc: 'Trial-ready representation.', price: 'Hourly' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '8:30 AM – 6:00 PM' },
        { day: 'Saturday', time: 'By appointment' },
        { day: 'Sunday', time: 'Closed' },
      ],
      address: '500 Commerce Plaza, Philadelphia, PA',
      phone: '(215) 555-0188',
      email: 'intake@sterlinglaw.example',
      about:
        'Sterling & Associates has served the Philadelphia community for over 25 years. Our attorneys have recovered more than $200M for clients. We believe in personal attention, aggressive representation, and honest communication from day one.',
      aboutImage:
        'https://images.pexels.com/photos/8112115/pexels-photo-8112115.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Schedule a Consultation',
      team: [
        {
          name: 'Robert Sterling, Esq.',
          role: 'Founding Partner',
          image:
            'https://images.pexels.com/photos/8112115/pexels-photo-8112115.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Diane Cho, Esq.',
          role: 'Partner, Corporate Law',
          image:
            'https://images.pexels.com/photos/6077797/pexels-photo-6077797.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'Robert Sterling took my case when three other firms said no. He got me a settlement I never thought possible.',
          author: 'Anonymous',
          detail: 'Personal injury client',
        },
        {
          quote: 'They handled our business formation flawlessly. Responsive, thorough, and genuinely invested in our success.',
          author: 'Tech startup founder',
          detail: 'Corporate client',
        },
      ],
      stats: [
        { value: '25+', label: 'Years practicing' },
        { value: '$200M+', label: 'Recovered for clients' },
        { value: '1,000+', label: 'Cases won' },
        { value: '4.9★', label: 'Client rating' },
      ],
      faqs: [
        { q: 'Do you offer free consultations?', a: 'Yes — the first consultation is always free, in person or by phone.' },
        { q: 'How does contingency work?', a: 'For personal injury cases, we only get paid if you win. There are no upfront costs.' },
        { q: 'What should I bring to my first meeting?', a: 'Any relevant documents — contracts, medical records, police reports. We\'ll guide you.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday', 'sunday'],
        answer:
          'Our office is open Monday–Friday 8:30 AM–6 PM. Saturday consultations are available by appointment. We\'re closed Sundays.',
      },
      {
        keywords: ['cost', 'price', 'fee', 'rate', 'consultation'],
        answer:
          'Personal injury cases are contingency-based — we only get paid if you win. Corporate and litigation matters are hourly, and estate planning is a flat fee. The first consultation is free.',
      },
      {
        keywords: ['where', 'located', 'location', 'address'],
        answer: 'We\'re at 500 Commerce Plaza in Philadelphia, PA, on the 12th floor.',
      },
      {
        keywords: ['book', 'appointment', 'consultation', 'schedule', 'meeting'],
        answer:
          'You can schedule a free consultation through the "Schedule a Consultation" button, or call us at (215) 555-0188.',
      },
      {
        keywords: ['injury', 'accident', 'sue', 'compensation', 'claim'],
        answer:
          'Yes, we handle personal injury on a contingency basis — no upfront costs, and we only get paid if you recover compensation.',
      },
    ],
  },
  {
    id: 'pawsitive-vet',
    businessName: 'Pawsitive Veterinary',
    industry: 'Veterinary Clinic',
    category: 'Pet Care',
    tagline: 'Care that wags tails.',
    description:
      'A warm, friendly veterinary clinic website with a soft color palette, wellness plans, online booking, and a playful but professional tone.',
    accentColor: '#16a34a',
    heroImage:
      'https://images.pexels.com/photos/7468978/pexels-photo-7468978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/6235114/pexels-photo-6235114.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Veterinarian checking a German Shepherd in a clinic',
        caption: 'Thorough exams',
      },
      {
        src: 'https://images.pexels.com/photos/7469222/pexels-photo-7469222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Veterinarian and volunteer performing a health check on a dog',
        caption: 'Gentle hands',
      },
      {
        src: 'https://images.pexels.com/photos/7468978/pexels-photo-7468978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Veterinarian examining a dog during a checkup',
        caption: 'Happy patients',
      },
    ],
    preview: {
      hero: 'Your pet deserves the very best',
      subhero:
        'Compassionate, modern veterinary care for dogs, cats, and small pets. Fear-free visits, clear pricing, and a team that treats your pet like family.',
      navItems: ['Home', 'Services', 'Wellness Plans', 'Team', 'Book'],
      services: [
        { title: 'Wellness Exam', desc: 'Full checkup and vaccinations.', price: '$65' },
        { title: 'Dental Cleaning', desc: 'Scale, polish, and assessment.', price: '$295' },
        { title: 'Spay & Neuter', desc: 'Safe surgical sterilization.', price: 'From $250' },
        { title: 'Emergency Care', desc: 'Urgent treatment, 7 days a week.', price: 'From $120' },
        { title: 'Microchipping', desc: 'Permanent ID for your pet.', price: '$45' },
        { title: 'Senior Pet Care', desc: 'Specialized care for older pets.', price: 'From $85' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '8:00 AM – 7:00 PM' },
        { day: 'Sat–Sun', time: '9:00 AM – 3:00 PM' },
      ],
      address: '45 Meadow Lane, Portland, OR',
      phone: '(503) 555-0192',
      email: 'care@pawsitivevet.example',
      about:
        'Pawsitive Veterinary is a fear-free certified clinic serving Portland\'s pets since 2018. We believe vet visits shouldn\'t be scary — for pets or owners. Our calm environment, gentle handling, and transparent pricing make every visit better.',
      aboutImage:
        'https://images.pexels.com/photos/6235114/pexels-photo-6235114.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Book an Appointment',
      team: [
        {
          name: 'Dr. Emily Carter',
          role: 'Lead Veterinarian & Owner',
          image:
            'https://images.pexels.com/photos/7468978/pexels-photo-7468978.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Dr. Marcus Webb',
          role: 'Associate Veterinarian',
          image:
            'https://images.pexels.com/photos/7469222/pexels-photo-7469222.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'My anxious dog actually walks in wagging now. The fear-free approach changed everything for us.',
          author: 'Jessica P.',
          detail: 'Dog owner since 2021',
        },
        {
          quote: 'They saved my cat\'s life on a Sunday morning. I\'ll never go anywhere else.',
          author: 'Tom H.',
          detail: 'Emergency visit',
        },
      ],
      stats: [
        { value: '6', label: 'Years open' },
        { value: '4', label: 'Veterinarians' },
        { value: '8k+', label: 'Pets treated' },
        { value: '4.9★', label: 'Avg. rating' },
      ],
      faqs: [
        { q: 'Are you fear-free certified?', a: 'Yes! Our entire team is fear-free certified to reduce pet stress during visits.' },
        { q: 'Do you accept pet insurance?', a: 'We accept most pet insurance plans and can help you file claims directly.' },
        { q: 'Do you see exotic pets?', a: 'We treat dogs, cats, rabbits, guinea pigs, and other small companion animals.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday', 'sunday'],
        answer: 'We\'re open Monday–Friday 8 AM–7 PM and Saturday–Sunday 9 AM–3 PM, including emergency hours.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'fee'],
        answer:
          'A wellness exam is $65, dental cleaning is $295, spay/neuter from $250, and microchipping is $45. Emergency visits start at $120.',
      },
      {
        keywords: ['where', 'located', 'location', 'address'],
        answer: 'We\'re at 45 Meadow Lane in Portland, OR, near the Mt. Tabor neighborhood.',
      },
      {
        keywords: ['book', 'appointment', 'schedule', 'visit'],
        answer:
          'You can book an appointment online through the "Book an Appointment" button, or call us at (503) 555-0192.',
      },
      {
        keywords: ['emergency', 'urgent', 'after hours'],
        answer: 'We offer emergency care 7 days a week during business hours. For after-hours emergencies, call us for referral guidance.',
      },
    ],
  },
  {
    id: 'meridian-realty',
    businessName: 'Meridian Realty',
    industry: 'Luxury Real Estate',
    category: 'Real Estate',
    tagline: 'Find your address.',
    description:
      'A sleek, minimalist real estate website with large property photography, a bento-grid layout, and an editorial feel.',
    accentColor: '#78350f',
    heroImage:
      'https://images.pexels.com/photos/8082322/pexels-photo-8082322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/37692742/pexels-photo-37692742.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Mediterranean-style villa with terracotta roof',
        caption: 'Featured listing',
      },
      {
        src: 'https://images.pexels.com/photos/5563473/pexels-photo-5563473.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Contemporary cottage with large windows',
        caption: 'Modern living',
      },
      {
        src: 'https://images.pexels.com/photos/8082322/pexels-photo-8082322.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Mansion surrounded by lush greenery',
        caption: 'Exceptional properties',
      },
    ],
    preview: {
      hero: 'Exceptional homes. Extraordinary service.',
      subhero:
        'We represent the finest properties in Scottsdale and Paradise Valley. From modern desert estates to historic casitas, we find the home that matches your life.',
      navItems: ['Home', 'Listings', 'Agents', 'About', 'Contact'],
      services: [
        { title: 'Buying', desc: 'Find your dream home.', price: 'Free to buyers' },
        { title: 'Selling', desc: 'List with a market expert.', price: '3% commission' },
        { title: 'Property Management', desc: 'Full-service rental management.', price: '8% of rent' },
        { title: 'Market Valuation', desc: 'Know what your home is worth.', price: 'Free' },
        { title: 'Relocation', desc: 'Concierge moving services.', price: 'Custom' },
        { title: 'Investment', desc: 'Portfolio strategy and acquisitions.', price: 'Custom' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '9:00 AM – 6:00 PM' },
        { day: 'Sat–Sun', time: '10:00 AM – 4:00 PM' },
      ],
      address: '220 Camelback Road, Scottsdale, AZ',
      phone: '(480) 555-0166',
      email: 'info@meridianrealty.example',
      about:
        'Meridian Realty is a boutique luxury real estate brokerage specializing in Scottsdale and Paradise Valley. With over $500M in lifetime sales, our agents combine local knowledge with world-class marketing to deliver results that exceed expectations.',
      aboutImage:
        'https://images.pexels.com/photos/5563473/pexels-photo-5563473.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'View Current Listings',
      team: [
        {
          name: 'Vanessa Hart',
          role: 'Broker & Founder',
          image:
            'https://images.pexels.com/photos/8082322/pexels-photo-8082322.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'James Delgado',
          role: 'Senior Agent',
          image:
            'https://images.pexels.com/photos/37692742/pexels-photo-37692742.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'Vanessa sold our home in 11 days for $50K over asking. Her marketing is on another level.',
          author: 'The Peterson Family',
          detail: 'Sellers',
        },
        {
          quote: 'They found us a home that wasn\'t even on the market yet. That\'s connections you can\'t buy.',
          author: 'Michael R.',
          detail: 'Buyer',
        },
      ],
      stats: [
        { value: '$500M+', label: 'Lifetime sales' },
        { value: '11 days', label: 'Avg. time to sell' },
        { value: '4.9★', label: 'Client rating' },
        { value: '15+', label: 'Years in Scottsdale' },
      ],
      faqs: [
        { q: 'How much do you charge sellers?', a: 'Our standard listing commission is 3%, which includes full marketing and professional photography.' },
        { q: 'Do you work with first-time buyers?', a: 'Absolutely — we love helping first-time buyers navigate the process step by step.' },
        { q: 'Can you help with relocation?', a: 'Yes, we offer concierge relocation services including neighborhood tours and moving coordination.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday', 'sunday'],
        answer: 'We\'re open Monday–Friday 9 AM–6 PM and Saturday–Sunday 10 AM–4 PM.',
      },
      {
        keywords: ['cost', 'commission', 'fee', 'price'],
        answer:
          'Selling commission is 3%, including marketing and photography. Buying is free to buyers. Property management is 8% of monthly rent.',
      },
      {
        keywords: ['where', 'located', 'location', 'area'],
        answer: 'We\'re at 220 Camelback Road in Scottsdale, AZ, serving Scottsdale and Paradise Valley.',
      },
      {
        keywords: ['book', 'appointment', 'schedule', 'viewing', 'tour'],
        answer:
          'You can request a viewing or consultation through the "View Current Listings" button, or call us at (480) 555-0166.',
      },
      {
        keywords: ['sell', 'selling', 'list', 'valuation', 'worth'],
        answer:
          'We offer free market valuations. Our standard selling commission is 3%, which includes all marketing and professional photography.',
      },
    ],
  },
  {
    id: 'ember-coffee',
    businessName: 'Ember Coffee Co.',
    industry: 'Specialty Coffee Shop',
    category: 'Cafes',
    tagline: 'Slow-roasted. Locally loved.',
    description:
      'A warm, rustic-chic coffee shop website with a cozy palette, menu highlights, and an editorial storytelling approach.',
    accentColor: '#92400e',
    heroImage:
      'https://images.pexels.com/photos/6612572/pexels-photo-6612572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/6612592/pexels-photo-6612592.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Espresso machine with metal frothing jugs in a coffee shop',
        caption: 'Craft in every cup',
      },
      {
        src: 'https://images.pexels.com/photos/29833130/pexels-photo-29833130.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Warm cafe interior with espresso machine and bread display',
        caption: 'Our space',
      },
      {
        src: 'https://images.pexels.com/photos/6612572/pexels-photo-6612572.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Cozy coffee shop interior with modern espresso machine',
        caption: 'Morning ritual',
      },
    ],
    preview: {
      hero: 'Coffee worth slowing down for',
      subhero:
        'Single-origin beans roasted in-house every Tuesday. Pull up a chair, stay a while, and taste what care tastes like.',
      navItems: ['Home', 'Menu', 'Our Story', 'Wholesale', 'Visit'],
      services: [],
      menu: [
        { name: 'Pour Over', desc: 'Single-origin, hand-brewed.', price: '$5.50' },
        { name: 'Flat White', desc: 'Double ristretto, velvet microfoam.', price: '$4.75' },
        { name: 'Cortado', desc: 'Equal parts espresso and steamed milk.', price: '$4.25' },
        { name: 'Cold Brew', desc: '18-hour steep, smooth and bold.', price: '$5.00' },
        { name: 'Sourdough Toast', desc: 'Cultured butter, sea salt.', price: '$6.50' },
        { name: 'Almond Croissant', desc: 'House-made, twice-baked.', price: '$5.75' },
        { name: 'Avocado Toast', desc: 'Smashed avocado, chili, lime.', price: '$9.50' },
        { name: 'Drip Coffee', desc: 'Today\'s roast, unlimited refills.', price: '$3.50' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '6:30 AM – 5:00 PM' },
        { day: 'Sat–Sun', time: '7:30 AM – 4:00 PM' },
      ],
      address: '118 Mill Street, Asheville, NC',
      phone: '(828) 555-0144',
      email: 'hello@embercoffee.example',
      about:
        'Ember Coffee Co. started as a farmers market stand in 2019. Today we roast every bean in-house and serve coffee we\'re proud of in a space that feels like home. Every Tuesday is roast day — stop by and smell it happen.',
      aboutImage:
        'https://images.pexels.com/photos/29833130/pexels-photo-29833130.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Visit Us',
      team: [
        {
          name: 'Mara Ellison',
          role: 'Owner & Head Roaster',
          image:
            'https://images.pexels.com/photos/6612592/pexels-photo-6612592.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'The pour over changed how I think about coffee. Mara roasts beans that taste like nowhere else in Asheville.',
          author: 'Liam K.',
          detail: 'Daily regular',
        },
        {
          quote: 'The almond croissant alone is worth the trip. Best coffee shop in town, hands down.',
          author: 'Sofia R.',
          detail: 'Weekend visitor',
        },
      ],
      stats: [
        { value: '5 yr', label: 'Roasting in-house' },
        { value: '6', label: 'Single-origin beans' },
        { value: '4.9★', label: 'Avg. rating' },
        { value: '300+', label: 'Cups daily' },
      ],
      faqs: [
        { q: 'Do you roast in-house?', a: 'Yes! We roast every Tuesday. You can watch the process in the shop.' },
        { q: 'Do you sell beans?', a: 'We sell 12oz bags of every bean we serve, whole bean or ground to order.' },
        { q: 'Is there parking?', a: 'Free street parking on Mill Street, plus a small lot behind the building.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday', 'sunday'],
        answer: 'We\'re open Monday–Friday 6:30 AM–5 PM and Saturday–Sunday 7:30 AM–4 PM.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'menu'],
        answer:
          'Drip coffee is $3.50, pour over is $5.50, flat white is $4.75, and cold brew is $5.00. Pastries range from $5.75–$9.50.',
      },
      {
        keywords: ['where', 'located', 'location', 'address', 'parking'],
        answer: 'We\'re at 118 Mill Street in Asheville, NC. Free street parking on Mill Street, plus a small lot behind the building.',
      },
      {
        keywords: ['bean', 'buy', 'sell', 'wholesale', 'roast'],
        answer: 'We sell 12oz bags of every bean we serve, and offer wholesale for cafes and offices. Ask in-shop or email hello@embercoffee.example.',
      },
      {
        keywords: ['vegan', 'dairy', 'milk', 'alternative', 'oat'],
        answer: 'Yes — we offer oat, almond, and soy milk at no extra charge, and have vegan pastry options daily.',
      },
    ],
  },
  {
    id: 'lens-and-light',
    businessName: 'Lens & Light Studio',
    industry: 'Photography Studio',
    category: 'Professional Services',
    tagline: 'Light, captured beautifully.',
    description:
      'A minimalist, gallery-style photography studio website with a monochrome aesthetic and elegant portfolio grids.',
    accentColor: '#374151',
    heroImage:
      'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop',
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/18880006/pexels-photo-18880006.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Professional camera setup with lenses and lighting in a studio',
        caption: 'The tools',
      },
      {
        src: 'https://images.pexels.com/photos/34694355/pexels-photo-34694355.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'Vintage wooden large format camera on a tripod',
        caption: 'The craft',
      },
      {
        src: 'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        alt: 'DSLR camera and lens on a wooden table',
        caption: 'The detail',
      },
    ],
    preview: {
      hero: 'Photography that tells your story',
      subhero:
        'Weddings, portraits, and brand photography with a documentary edge. Natural light, honest moments, and images you\'ll feel for years.',
      navItems: ['Home', 'Portfolio', 'Services', 'Pricing', 'Book'],
      services: [
        { title: 'Wedding Photography', desc: 'Full-day coverage, two photographers.', price: 'From $2,800' },
        { title: 'Portrait Session', desc: '1-hour session, 30 edited images.', price: 'From $350' },
        { title: 'Brand Photography', desc: 'Commercial and product shoots.', price: 'From $1,200' },
        { title: 'Engagement', desc: '1.5-hour session, 50 images.', price: 'From $500' },
        { title: 'Family Session', desc: '1-hour session, 25 images.', price: 'From $300' },
        { title: 'Headshots', desc: 'In-studio or on-location.', price: 'From $175' },
      ],
      hours: [
        { day: 'Mon–Fri', time: '10:00 AM – 6:00 PM' },
        { day: 'Sat–Sun', time: 'By appointment' },
      ],
      address: '340 Arts District, Nashville, TN',
      phone: '(615) 555-0199',
      email: 'studio@lensandlight.example',
      about:
        'Lens & Light Studio is a boutique photography studio in Nashville\'s Arts District. We believe the best photos happen when people forget the camera is there. Our approach is quiet, patient, and personal — no forced smiles, just real moments.',
      aboutImage:
        'https://images.pexels.com/photos/18880006/pexels-photo-18880006.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
      cta: 'Book a Session',
      team: [
        {
          name: 'Olivia Vance',
          role: 'Lead Photographer & Owner',
          image:
            'https://images.pexels.com/photos/11234300/pexels-photo-11234300.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
        {
          name: 'Chris Mendoza',
          role: 'Second Shooter & Editor',
          image:
            'https://images.pexels.com/photos/34694355/pexels-photo-34694355.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
        },
      ],
      testimonials: [
        {
          quote: 'Olivia captured our wedding in a way that felt like a movie. Every photo tells a story.',
          author: 'Anna & Will',
          detail: 'Wedding clients',
        },
        {
          quote: 'The brand photos transformed our website. Professional, natural, and worth every penny.',
          author: 'Boutique owner',
          detail: 'Brand client',
        },
      ],
      stats: [
        { value: '8 yr', label: 'Behind the lens' },
        { value: '200+', label: 'Weddings shot' },
        { value: '4.9★', label: 'Client rating' },
        { value: '5', label: 'Awards won' },
      ],
      faqs: [
        { q: 'How soon should I book my wedding?', a: 'We recommend 8–12 months ahead for peak season (May–October).' },
        { q: 'Do you travel for weddings?', a: 'Yes — we travel anywhere. Travel is included within 100 miles of Nashville; beyond that is a flat fee.' },
        { q: 'How many photos will I get?', a: 'Full wedding coverage includes 400–600 edited images in an online gallery within 4 weeks.' },
      ],
    },
    knowledge: [
      {
        keywords: ['open', 'hours', 'saturday', 'sunday'],
        answer: 'Our studio is open Monday–Friday 10 AM–6 PM. Saturday and Sunday sessions are by appointment.',
      },
      {
        keywords: ['cost', 'price', 'how much', 'rate', 'fee'],
        answer:
          'Wedding photography starts at $2,800, portraits from $350, brand photography from $1,200, and headshots from $175.',
      },
      {
        keywords: ['where', 'located', 'location', 'address', 'studio'],
        answer: 'Our studio is at 340 Arts District in Nashville, TN.',
      },
      {
        keywords: ['book', 'session', 'schedule', 'appointment', 'wedding', 'available'],
        answer:
          'You can book a session through the "Book a Session" button, or call us at (615) 555-0199.',
      },
      {
        keywords: ['travel', 'destination', 'out of town', 'fly'],
        answer: 'Yes, we travel for weddings anywhere. Travel within 100 miles of Nashville is included; beyond that is a flat fee.',
      },
    ],
  },
];

export const getDemo = (id: DemoId): DemoSite =>
  DEMOS.find((d) => d.id === id) ?? DEMOS[0];