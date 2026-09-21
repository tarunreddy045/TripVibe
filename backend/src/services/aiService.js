const { buildTripPlan } = require('./recommendationEngine');

class AIService {
  async generateTrip(input) {
    const normalizedInput = {
      destination: input.destination,
      budget: input.budget,
      days: input.days || input.numberOfDays,
      travelers: input.travelers,
      vibe: input.vibe,
      vibes: input.vibes,
      interests: input.interests,
      accommodation: input.accommodation,
      transport: input.transport,
      startDate: input.startDate,
      endDate: input.endDate,
    };

    return buildTripPlan(normalizedInput);
  }

  async chat(context, message) {
    const normalizedContext = context || {};
    const lower = String(message || '').toLowerCase();

    if (lower.includes('sunset')) return 'For sunset, head to a scenic coastal viewpoint or rooftop with a golden-hour view.';
    if (lower.includes('cheap local food')) return 'Try local markets, street food lanes, and neighborhood dhabas for the best value.';
    if (lower.includes('pack')) return 'Pack breathable clothes, a power bank, comfortable shoes, sunscreen, and a light rain layer.';
    if (lower.includes('budget')) return 'Switch to public transport, choose homestays, and prioritize free attractions to save money.';
    if (lower.includes('friends')) return 'Choose nightlife, group activities, and shared transport to make the trip more social and affordable.';

    return `Based on your current trip to ${normalizedContext.destination || 'your destination'}, I suggest prioritizing nearby attractions, local food, and budget-friendly experiences that match your vibe.`;
  }
}

module.exports = new AIService();
