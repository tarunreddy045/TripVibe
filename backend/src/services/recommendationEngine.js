const { demoDestinations, demoPlaces } = require('../data/demoData');

function normalizeBudget(value) {
  if (typeof value === 'string') {
    return Number(value.replace(/[^\d]/g, '')) || 0;
  }
  return Number(value) || 0;
}

function buildDateRange(startDate, endDate, fallbackDays = 3) {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
    return diff;
  }
  return Number(fallbackDays) || 3;
}

function buildTripPlan(input) {
  const destination = input.destination || 'Goa';
  const budget = normalizeBudget(input.budget || 20000);
  const travelers = Number(input.travelers || 2);
  const days = buildDateRange(input.startDate, input.endDate, input.days || 3);
  const vibes = Array.isArray(input.vibes) ? input.vibes : [input.vibe || 'Beach'];
  const interests = Array.isArray(input.interests) ? input.interests : [];
  const accommodation = input.accommodation || 'Budget hotel';
  const transport = input.transport || 'Mixed';
  const destinationMeta = demoDestinations.find((item) => item.name.toLowerCase() === String(destination).toLowerCase()) || demoDestinations[0];
  const places = demoPlaces[destinationMeta.id] || demoPlaces.goa;

  const dailyBudget = Math.max(1000, Math.round(budget / days));
  const accommodationCost = Math.round(budget * 0.28);
  const foodCost = Math.round(budget * 0.22);
  const transportCost = Math.round(budget * 0.18);
  const activityCost = Math.round(budget * 0.2);
  const miscCost = budget - accommodationCost - foodCost - transportCost - activityCost;

  const itinerary = Array.from({ length: days }, (_, index) => {
    const dayNumber = index + 1;
    const selectedPlaces = places.slice(index % places.length, (index % places.length) + 2).concat(places[(index + 1) % places.length]);

    const activities = selectedPlaces.map((place, placeIndex) => ({
      time: ['09:00 AM', '11:00 AM', '02:00 PM', '05:30 PM', '08:00 PM'][placeIndex % 5],
      name: place.name,
      description: `${place.name} is a ${place.type.toLowerCase()} recommendation that fits your ${vibes.join(', ').toLowerCase()} travel vibe.`,
      estimatedCost: place.cost || Math.round(400 + placeIndex * 150),
      duration: `${placeIndex === 0 ? 2 : 1.5 + placeIndex} hrs`,
      distance: `${(placeIndex + 1) * 4} km`,
      travelMethod: transport,
      reason: `Chosen because it aligns with your ${vibes.join(', ')} preferences and nearby cluster planning.`
    }));

    return {
      day: dayNumber,
      title: `${destinationMeta.name} Day ${dayNumber}`,
      activities,
      totalCost: activities.reduce((sum, activity) => sum + activity.estimatedCost, 0),
      estimatedDistance: `${(index + 2) * 10} km`,
      travelTime: `${(index + 2) * 1.5} hrs`
    };
  });

  return {
    destination: destinationMeta.name,
    startDate: input.startDate,
    endDate: input.endDate,
    travelers,
    destinationMeta,
    summary: `A ${vibes.join(', ')}-focused trip to ${destinationMeta.name} crafted for ${travelers} traveler(s) with a ${budget} budget across ${days} days.`,
    budget: {
      total: budget,
      accommodation: accommodationCost,
      food: foodCost,
      transport: transportCost,
      activities: activityCost,
      miscellaneous: Math.max(1000, miscCost)
    },
    days: itinerary,
    tips: [
      'Start early for the best photo spots and cooler weather.',
      'Book local dining and transport ahead for a smoother budget.',
      'Carry cash for markets and small eateries.'
    ],
    packingList: ['Travel charger', 'Comfortable walking shoes', 'Sunscreen', 'Light rain jacket', 'Camera or phone']
  };
}

module.exports = { buildTripPlan, normalizeBudget, buildDateRange };
