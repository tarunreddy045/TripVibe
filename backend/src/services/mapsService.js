const mapMock = {
  geocode: async (query) => ({
    query,
    latitude: 17.385,
    longitude: 78.4867,
    location: 'India',
    source: 'demo-mock-data',
  }),
  nearbyPlaces: async (destination) => ({
    destination,
    places: ['Local market', 'Scenic lookout', 'Cultural spot'],
    source: 'demo-mock-data',
  }),
};

module.exports = mapMock;
