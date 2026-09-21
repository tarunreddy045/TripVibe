const demoDestinations = [
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    state: 'Goa',
    description: 'Sun-kissed beaches, vibrant nightlife, and laid-back coastal charm.',
    bestTime: 'Nov-Mar',
    estimatedBudget: 20000,
    vibe: ['Beach', 'Food', 'Photography'],
    activities: ['Beach', 'Water sports', 'Nightlife', 'Photography'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    country: 'India',
    state: 'Telangana',
    description: 'A blend of historic landmarks, biryani, and modern city culture.',
    bestTime: 'Oct-Feb',
    estimatedBudget: 12000,
    vibe: ['Food', 'History', 'Photography'],
    activities: ['Museums', 'Historical places', 'Local food', 'Cafes'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    state: 'Himachal Pradesh',
    description: 'Snowy peaks, treks, cozy cafes, and mountain serenity.',
    bestTime: 'Mar-Jun',
    estimatedBudget: 18000,
    vibe: ['Adventure', 'Nature', 'Relaxation'],
    activities: ['Trekking', 'Photography', 'Cafes', 'Nature'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'India',
    state: 'Rajasthan',
    description: 'Royal palaces, forts, and vibrant colors around every corner.',
    bestTime: 'Oct-Mar',
    estimatedBudget: 15000,
    vibe: ['History', 'Photography', 'Shopping'],
    activities: ['Historical places', 'Shopping', 'Architecture', 'Culture'],
    image: 'https://images.unsplash.com/photo-1603262110263-fb0112e7c2b5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    state: 'Kerala',
    description: 'Backwaters, lush hills, scenic escapes, and soulful food.',
    bestTime: 'Sep-Feb',
    estimatedBudget: 22000,
    vibe: ['Nature', 'Relaxation', 'Food'],
    activities: ['Nature', 'Water sports', 'Cafes', 'Wildlife'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    country: 'India',
    state: 'Uttarakhand',
    description: 'Riverfront spirituality, adventure sports, and mountain energy.',
    bestTime: 'Sep-Nov',
    estimatedBudget: 14000,
    vibe: ['Adventure', 'Nature', 'Relaxation'],
    activities: ['Trekking', 'Adventure', 'Temples', 'Photography'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'
  }
];

const demoPlaces = {
  goa: [
    { name: 'Baga Beach', type: 'Beach', cost: 0, rating: 4.7 },
    { name: 'Fort Aguada', type: 'Landmark', cost: 200, rating: 4.6 },
    { name: 'Anjuna Beach', type: 'Beach', cost: 0, rating: 4.5 },
    { name: 'Palolem Beach', type: 'Beach', cost: 0, rating: 4.8 }
  ],
  hyderabad: [
    { name: 'Charminar', type: 'Historical', cost: 50, rating: 4.7 },
    { name: 'Golconda Fort', type: 'Historical', cost: 150, rating: 4.8 },
    { name: 'Hitech City', type: 'City', cost: 0, rating: 4.3 },
    { name: 'Laad Bazaar', type: 'Shopping', cost: 0, rating: 4.5 }
  ],
  manali: [
    { name: 'Solang Valley', type: 'Adventure', cost: 500, rating: 4.7 },
    { name: 'Rohtang Pass', type: 'Nature', cost: 800, rating: 4.6 },
    { name: 'Old Manali', type: 'Cafes', cost: 0, rating: 4.5 },
    { name: 'Hadimba Temple', type: 'Temple', cost: 50, rating: 4.7 }
  ],
  jaipur: [
    { name: 'Hawa Mahal', type: 'Architecture', cost: 200, rating: 4.8 },
    { name: 'Amber Fort', type: 'Historical', cost: 500, rating: 4.9 },
    { name: 'Jal Mahal', type: 'Architecture', cost: 0, rating: 4.6 },
    { name: 'Johri Bazaar', type: 'Shopping', cost: 0, rating: 4.5 }
  ],
  kerala: [
    { name: 'Alleppey Backwaters', type: 'Nature', cost: 1200, rating: 4.8 },
    { name: 'Munnar', type: 'Nature', cost: 1000, rating: 4.7 },
    { name: 'Fort Kochi', type: 'Historical', cost: 0, rating: 4.6 },
    { name: 'Kovalam Beach', type: 'Beach', cost: 0, rating: 4.5 }
  ],
  rishikesh: [
    { name: 'Laxman Jhula', type: 'Temple', cost: 0, rating: 4.6 },
    { name: 'Triveni Ghat', type: 'Cultural', cost: 0, rating: 4.5 },
    { name: 'Neer Garh Waterfall', type: 'Nature', cost: 100, rating: 4.4 },
    { name: 'Rajaji National Park', type: 'Wildlife', cost: 500, rating: 4.5 }
  ]
};

module.exports = { demoDestinations, demoPlaces };
