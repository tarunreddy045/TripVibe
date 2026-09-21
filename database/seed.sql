USE tripvibe;

INSERT INTO destinations (slug, name, country, state, description, tags, average_daily_budget)
VALUES
  ('goa', 'Goa', 'India', 'Goa', 'Coastal escapes, relaxed beaches, and lively evenings.', JSON_ARRAY('beach', 'nightlife', 'relaxation'), 4500),
  ('hyderabad', 'Hyderabad', 'India', 'Telangana', 'Historic architecture, food trails, and modern city energy.', JSON_ARRAY('culture', 'food', 'city'), 3200),
  ('manali', 'Manali', 'India', 'Himachal Pradesh', 'Mountain air, scenic valleys, and adventure activities.', JSON_ARRAY('mountains', 'adventure', 'nature'), 5000),
  ('jaipur', 'Jaipur', 'India', 'Rajasthan', 'Royal forts, colorful markets, and heritage experiences.', JSON_ARRAY('heritage', 'culture', 'shopping'), 3500),
  ('kerala', 'Kerala', 'India', 'Kerala', 'Backwaters, lush landscapes, and restorative slow travel.', JSON_ARRAY('nature', 'wellness', 'food'), 4800),
  ('rishikesh', 'Rishikesh', 'India', 'Uttarakhand', 'River views, yoga, and outdoor adventure in the foothills.', JSON_ARRAY('wellness', 'adventure', 'nature'), 3000)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  tags = VALUES(tags),
  average_daily_budget = VALUES(average_daily_budget);
