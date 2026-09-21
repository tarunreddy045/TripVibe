const weatherMock = {
  Goa: { currentTemp: 29, rainProbability: 12, conditions: 'Sunny' },
  Hyderabad: { currentTemp: 28, rainProbability: 18, conditions: 'Warm' },
  Manali: { currentTemp: 18, rainProbability: 30, conditions: 'Cool' },
  Kerala: { currentTemp: 26, rainProbability: 55, conditions: 'Humid' },
  Jaipur: { currentTemp: 31, rainProbability: 8, conditions: 'Clear' },
};

async function getWeather(destination) {
  const normalized = String(destination || 'Goa');
  const data = weatherMock[normalized] || { currentTemp: 27, rainProbability: 20, conditions: 'Moderate' };
  return {
    destination: normalized,
    ...data,
    forecast: [
      { day: 'Today', temp: data.currentTemp, rainProbability: data.rainProbability },
      { day: 'Tomorrow', temp: data.currentTemp + 1, rainProbability: data.rainProbability + 5 },
    ],
    source: 'demo-mock-data',
  };
}

module.exports = { getWeather };
