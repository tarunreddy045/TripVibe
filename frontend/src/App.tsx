import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, MapPinned, UserRound, Sparkles, Wallet, MoonStar, Menu, X, Bookmark, Share2, Download, RefreshCw, Route as RouteIcon, CloudSun, Utensils, Hotel, ShieldCheck, WandSparkles, ChevronUp, ChevronDown } from 'lucide-react';
import './App.css';
import { AppProvider, useAppContext } from './context/AppContext';
import api from './services/api';

const destinationOptions = ['Hyderabad', 'Goa', 'Bengaluru', 'Manali', 'Paris', 'Dubai'];
const vibeOptions = ['Beach', 'Adventure', 'Food', 'Photography', 'Party', 'Nature', 'History', 'Relaxation', 'Shopping', 'Romantic'];
const interestOptions = ['Beaches', 'Mountains', 'Museums', 'Historical places', 'Local food', 'Street food', 'Cafes', 'Nightlife', 'Shopping', 'Photography', 'Trekking', 'Water sports', 'Wildlife', 'Temples', 'Architecture', 'Art', 'Adventure', 'Relaxation'];

function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="tag">AI-Powered Smart Tourism</span>
          <h1>Plan Your Perfect Trip with AI ✈️</h1>
          <p>Tell TripVibe your destination, budget and travel vibe. Our AI creates a personalized trip plan in seconds.</p>
          <div className="hero-actions">
            <Link to="/planner" className="primary-btn">Plan My Trip <ArrowRight size={18} /></Link>
            <Link to="/explore" className="secondary-btn">Explore Destinations</Link>
          </div>
          <div className="hero-metrics">
            <div><strong>10k+</strong><span>Trips planned</span></div>
            <div><strong>4.9/5</strong><span>Traveler rating</span></div>
            <div><strong>AI Live</strong><span>Smart itineraries</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="map-card">
            <div className="mini-badge"><MapPinned size={16}/> AI match</div>
            <div className="map-glow">
              <div className="pin pin-1" />
              <div className="pin pin-2" />
              <div className="pin pin-3" />
            </div>
            <div className="route-panel">
              <span>Goa • 3 days</span>
              <strong>₹20,000 budget</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div className="feature-card"><Sparkles size={20} /> Personalized AI recommendations</div>
        <div className="feature-card"><Wallet size={20} /> Budget-aware planning</div>
        <div className="feature-card"><MoonStar size={20} /> Weather-aware suggestions</div>
      </section>

      <section className="destination-preview">
        <div className="section-heading">
          <h2>Trending destinations</h2>
          <Link to="/explore">View all</Link>
        </div>
        <div className="card-grid">
          {['Goa', 'Manali', 'Hyderabad', 'Kerala', 'Jaipur', 'Rishikesh'].map((place, index) => (
            <div key={index} className="destination-card">
              <div className="card-image" style={{ backgroundImage: `url(${['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1603262110263-fb0112e7c2b5?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80'][index]})` }} />
              <div className="card-body">
                <h3>{place}</h3>
                <p>Vibe: {place === 'Goa' ? 'Beach + Food' : place === 'Manali' ? 'Adventure + Nature' : 'Culture + Food'}</p>
                <div className="card-meta"><span>Budget</span><strong>₹{10 + index * 8}k</strong></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PlannerPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    destination: 'Goa',
    startDate: '2026-11-10',
    endDate: '2026-11-13',
    budget: '20000',
    travelers: 2,
    accommodation: 'Budget hotel',
    transport: 'Mixed',
    vibes: ['Beach', 'Food'],
    interests: ['Beaches', 'Local food'],
  });
  const { setTrip } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateField = (key: string, value: string | string[] | number) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleValue = (key: 'vibes' | 'interests', value: string) => {
    setForm((prev) => {
      const current = prev[key] as string[];
      return {
        ...prev,
        [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        days: Math.max(1, Math.ceil((new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1),
      };
      const response = await api.post<{ trip: Record<string, unknown> }>('/trips/generate', payload);
      setTrip(response.trip);
      navigate('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to generate your trip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell narrow">
      <div className="planner-card">
        <div className="planner-header">
          <div>
            <span className="tag">Trip Planner</span>
            <h2>Tell us about your ideal trip</h2>
          </div>
          <div className="step-indicator">Step {step}/4</div>
        </div>

        {error && <div className="alert error">{error}</div>}

        {step === 1 && (
          <div className="form-grid">
            <label>
              Where do you want to go?
              <input list="destinations" value={form.destination} onChange={(e) => updateField('destination', e.target.value)} placeholder="Hyderabad, Goa, Dubai..." />
            </label>
            <datalist id="destinations">
              {destinationOptions.map((item) => <option key={item} value={item} />)}
            </datalist>
            <label>
              Start date
              <input type="date" value={form.startDate} onChange={(e) => updateField('startDate', e.target.value)} />
            </label>
            <label>
              End date
              <input type="date" value={form.endDate} onChange={(e) => updateField('endDate', e.target.value)} />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="form-grid">
            <label>
              Total trip budget
              <input type="number" value={form.budget} onChange={(e) => updateField('budget', e.target.value)} placeholder="20000" />
            </label>
            <label>
              Number of travelers
              <input type="number" min={1} value={form.travelers} onChange={(e) => updateField('travelers', Number(e.target.value))} />
            </label>
            <label>
              Accommodation pref.
              <select value={form.accommodation} onChange={(e) => updateField('accommodation', e.target.value)}>
                <option>Budget hotel</option>
                <option>Hotel</option>
                <option>Luxury hotel</option>
                <option>Hostel</option>
                <option>Resort</option>
                <option>Homestay</option>
                <option>Airbnb-style accommodation</option>
              </select>
            </label>
            <label>
              Transport preference
              <select value={form.transport} onChange={(e) => updateField('transport', e.target.value)}>
                <option>Public transport</option>
                <option>Bus</option>
                <option>Train</option>
                <option>Cab</option>
                <option>Rental car</option>
                <option>Bike</option>
                <option>Walking</option>
                <option>Mixed</option>
              </select>
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="choice-group">
            <h3>Travel vibe</h3>
            <div className="chip-grid">
              {vibeOptions.map((vibe) => (
                <button key={vibe} type="button" className={form.vibes.includes(vibe) ? 'chip active' : 'chip'} onClick={() => toggleValue('vibes', vibe)}>{vibe}</button>
              ))}
            </div>
            <h3>Interests</h3>
            <div className="chip-grid">
              {interestOptions.map((interest) => (
                <button key={interest} type="button" className={form.interests.includes(interest) ? 'chip active' : 'chip'} onClick={() => toggleValue('interests', interest)}>{interest}</button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="summary-panel">
            <div className="summary-row"><span>Destination</span><strong>{form.destination}</strong></div>
            <div className="summary-row"><span>Budget</span><strong>₹{form.budget}</strong></div>
            <div className="summary-row"><span>Travelers</span><strong>{form.travelers}</strong></div>
            <div className="summary-row"><span>Vibes</span><strong>{form.vibes.join(', ')}</strong></div>
            <div className="summary-row"><span>Interests</span><strong>{form.interests.join(', ')}</strong></div>
          </div>
        )}

        <div className="planner-actions">
          {step > 1 && <button type="button" className="secondary-btn" onClick={prevStep}>Back</button>}
          {step < 4 ? (
            <button type="button" className="primary-btn" onClick={nextStep}>Next</button>
          ) : (
            <button type="button" className="primary-btn" onClick={handleSubmit} disabled={loading}>{loading ? 'Planning...' : 'Generate Trip'}</button>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  const { trip } = useAppContext();

  if (!trip) {
    return <div className="page-shell narrow"><div className="planner-card"><h2>No trip generated yet.</h2><Link to="/planner" className="primary-btn">Plan a trip</Link></div></div>;
  }

  const days = (trip.days as any[]) || [];
  const budget = (trip.budget as Record<string, number>) || {};
  const total = Number(budget.total || 0);
  const vibes = ((trip.destinationMeta as any)?.vibe || ['Beach', 'Food']).slice(0, 2);
  const formatDate = (date: unknown) => date ? new Date(String(date)).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit' }) : '--';
  const budgetItems = [
    ['Accommodation', budget.accommodation || 0, '#ff5a36'],
    ['Food', budget.food || 0, '#ffb800'],
    ['Transport', budget.transport || 0, '#00cdb4'],
    ['Activities', budget.activities || 0, '#9b87f5'],
    ['Miscellaneous', budget.miscellaneous || 0, '#94a3b8'],
  ] as const;

  return (
    <div className="results-page reference-results">
      <div className="results-topline"><Link to="/planner">← &nbsp;Plan another trip</Link></div>
      <section className="trip-hero">
        <div className="trip-hero-copy">
          <div className="trip-eyebrow"><Sparkles size={18} /> Your AI-powered trip</div>
          <h1>{String(trip.destination || 'Your destination')}, your way.</h1>
          <p>{String(trip.summary || 'A thoughtful route shaped around your budget, interests, and travel vibe.')}</p>
          <div className="trip-tags">{vibes.map((vibe: string) => <span key={vibe}>{vibe}</span>)}</div>
        </div>
        <div className="trip-hero-stats">
          <div><span>Dates</span><strong>{formatDate(trip.startDate)} → {formatDate(trip.endDate)}</strong></div>
          <div><span>Days</span><strong>{days.length} days</strong></div>
          <div><span>Travellers</span><strong>{trip.travelers || 2}</strong></div>
          <div><span>Trip cost</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
        </div>
      </section>

      <div className="result-actions">
        <button className="secondary-btn"><Bookmark size={17} /> Save trip</button>
        <button className="secondary-btn"><Share2 size={17} /> Share</button>
        <button className="secondary-btn"><Download size={17} /> Download</button>
        <Link to="/planner" className="secondary-btn"><RefreshCw size={17} /> Regenerate</Link>
      </div>

      <div className="results-layout">
        <main className="route-column">
          <div className="route-heading"><div><span>The route</span><h2>Day by day, without the zig-zag.</h2></div><strong><RouteIcon size={18} /> 8.5 km on a typical day</strong></div>
          {days.map((day: any) => (
            <section key={day.day} className="route-day">
              <div className="route-day-header">
                <div className="day-number">{String(day.day).padStart(2, '0')}</div>
                <div><h3>{String(trip.destination)} · {day.day === 1 ? 'first look' : 'deep dive'}</h3><p>{day.activities?.[0]?.description || 'A considered day of nearby stops and local flavour.'}</p><small><MapPinned size={14} /> {day.estimatedDistance} &nbsp; · &nbsp; <RouteIcon size={14} /> {day.travelTime}</small></div>
                {day.day === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {day.day === 1 && <div className="activity-stack">{(day.activities || []).map((item: any, index: number) => (
                <article key={`${day.day}-${index}`} className="route-activity">
                  <strong className="activity-time">{item.time}</strong>
                  <div><h4>{item.name}</h4><p>{item.description}</p><small>{item.duration} &nbsp;·&nbsp; {item.distance} &nbsp;·&nbsp; {item.travelMethod}</small><em><WandSparkles size={15} /> {index === 0 ? 'Matches your local food preference and sets a local tone.' : 'A strong route anchor that keeps the day compact.'}</em></div>
                  <b>₹{item.estimatedCost?.toLocaleString('en-IN')}</b>
                </article>
              ))}</div>}
            </section>
          ))}
        </main>

        <aside className="insight-column">
          <section className="insight-card budget-pulse"><div className="insight-label">Budget pulse</div><h2>₹{total.toLocaleString('en-IN')}</h2>{budgetItems.map(([label, value, color]) => <div className="budget-bar" key={label}><div><span>{label}</span><strong>₹{value.toLocaleString('en-IN')}</strong></div><i><b style={{ width: `${Math.min(100, (value / total) * 100 * 2.2)}%`, background: color }} /></i></div>)}<button className="dark-action"><Wallet size={17} /> Optimize my budget</button></section>
          <section className="insight-card weather-card"><div className="insight-label teal"><CloudSun size={18} /> Weather-aware route</div><strong>28°C</strong><b>Coastal sunshine</b><span>Rain 20% · Best 7:00 AM – 11:00 AM</span></section>
          <section className="insight-card"><h3><Utensils size={19} /> Eat like a local</h3>{['Local breakfast reset', 'Neighbourhood food crawl', 'Sunset seafood by the coast'].map((item) => <p key={item}>✓ &nbsp;{item}</p>)}</section>
          <section className="insight-card"><h3><Hotel size={19} /> Stay suggestion</h3><p>✓ &nbsp;A design-forward boutique stay keeps cafés, heritage lanes, and the coast within easy reach.</p></section>
          <section className="insight-card"><h3><ShieldCheck size={19} /> Travel smart</h3><p>✓ &nbsp;Use registered cabs after dark and keep a digital copy of your ID.</p></section>
        </aside>
      </div>
    </div>
  );
}

function ExplorePage() {
  const destinations = [
    { name: 'Goa', text: 'Beach + food + nightlife', budget: '₹18k', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80' },
    { name: 'Manali', text: 'Adventure + mountain views', budget: '₹15k', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80' },
    { name: 'Hyderabad', text: 'History + biryani + cafes', budget: '₹12k', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80' },
    { name: 'Jaipur', text: 'Palaces + shopping', budget: '₹14k', image: 'https://images.unsplash.com/photo-1603262110263-fb0112e7c2b5?auto=format&fit=crop&w=900&q=80' },
    { name: 'Kerala', text: 'Backwaters + relaxation', budget: '₹20k', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80' },
  ];

  return (
    <div className="page-shell">
      <div className="section-heading"><h2>Explore destinations</h2></div>
      <div className="card-grid explore-grid">
        {destinations.map((destination) => (
          <Link key={destination.name} to={`/explore/${destination.name.toLowerCase()}`} className="destination-card large">
            <div className="card-image" style={{ backgroundImage: `url(${destination.image})` }} />
            <div className="card-body">
              <h3>{destination.name}</h3>
              <p>{destination.text}</p>
              <div className="card-meta"><span>Estimated budget</span><strong>{destination.budget}</strong></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DestinationDetailPage() {
  const { destinationId } = useParams();
  const destination = destinationId ? destinationId.charAt(0).toUpperCase() + destinationId.slice(1) : 'Destination';

  return (
    <div className="page-shell narrow">
      <div className="planner-card">
        <Link to="/explore" className="section-heading">← Back to destinations</Link>
        <span className="tag">Destination guide</span>
        <h2>{destination} is waiting.</h2>
        <p>Build a personalized route around your budget, travel dates, interests, and the kind of moments you want to collect.</p>
        <Link to="/planner" className="primary-btn">Plan this trip <ArrowRight size={18} /></Link>
      </div>
    </div>
  );
}

function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const { setAuthToken, setUser } = useAppContext();
  const [form, setForm] = useState({ name: '', email: 'demo@example.com', password: 'password123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = mode === 'login' ? { email: form.email, password: form.password } : { name: form.name, email: form.email, password: form.password };
      const response = await api.post<{ token: string; user: any }>(mode === 'login' ? '/auth/login' : '/auth/register', payload);
      setAuthToken(response.token);
      setUser(response.user);
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell narrow">
      <div className="planner-card auth-card">
        <span className="tag">{mode === 'login' ? 'Welcome back' : 'Create account'}</span>
        <h2>{mode === 'login' ? 'Login to TripVibe' : 'Join TripVibe'}</h2>
        {error && <div className="alert error">{error}</div>}
        <form onSubmit={handleSubmit} className="form-grid">
          {mode === 'register' && (
            <label>
              Name
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </label>
          )}
          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@example.com" />
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
          </label>
          <button type="submit" className="primary-btn full" disabled={loading}>{loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}</button>
        </form>
      </div>
    </div>
  );
}

function AssistantPage() {
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Hi! I can help with the best places, food, budget, and route ideas for your trip.' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await api.post<{ answer: string }>('/trips/ai/chat', { message: input, context: { destination: 'Goa' } });
      setMessages((prev) => [...prev, { role: 'bot', text: response.answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'I could not answer that right now. Try again in a moment.' }]);
    }
  };

  return (
    <div className="page-shell narrow">
      <div className="planner-card assistant-card">
        <span className="tag">TripVibe AI 🤖</span>
        <h2>Ask your travel assistant</h2>
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'chat-message user' : 'chat-message bot'}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input-row">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="What's the best place for sunset?" />
          <button className="primary-btn" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

function MyTripsPage() {
  const trips = [
    { destination: 'Goa', dates: '12 Nov - 15 Nov', budget: '₹20,000', travelers: 2 },
    { destination: 'Hyderabad', dates: '01 Dec - 02 Dec', budget: '₹10,000', travelers: 3 }
  ];

  return (
    <div className="page-shell">
      <div className="section-heading"><h2>My Trips</h2></div>
      <div className="card-grid">
        {trips.map((trip, index) => (
          <div key={index} className="destination-card">
            <div className="card-body">
              <h3>{trip.destination}</h3>
              <p>{trip.dates}</p>
              <div className="card-meta"><span>Budget</span><strong>{trip.budget}</strong></div>
              <div className="card-meta"><span>Travelers</span><strong>{trip.travelers}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authToken, user, setAuthToken, setUser } = useAppContext();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Plan a Trip', to: '/planner' },
    { label: 'Explore', to: '/explore' },
    { label: 'My Trips', to: '/my-trips' },
    { label: 'AI Assistant', to: '/assistant' },
    { label: 'About', to: '/about' },
  ];

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <>
      <header className="topbar">
        <div className="nav-wrap">
          <Link to="/" className="brand">
            <span className="brand-mark">T</span>
            <span>TripVibe</span>
          </Link>
          <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
            ))}
            {authToken && user ? (
              <div className="user-menu">
                <span className="user-pill"><UserRound size={16} /> {user.name || 'Traveler'}</span>
                <button className="secondary-btn small" onClick={logout}>Logout</button>
              </div>
            ) : (
              <div className="auth-actions">
                <Link to="/login" className="secondary-btn small">Login</Link>
                <Link to="/register" className="primary-btn small">Sign Up</Link>
              </div>
            )}
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:destinationId" element={<DestinationDetailPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/trips" element={<MyTripsPage />} />
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/about" element={<div className="page-shell narrow"><div className="planner-card"><span className="tag">About</span><h2>TripVibe is an AI-powered travel companion for personalized planning.</h2><p>It matches your vibe, budget, and interests to help create a travel experience that feels curated instead of generic.</p></div></div>} />
          <Route path="*" element={<div className="page-shell narrow"><div className="planner-card"><h2>404 — Page not found</h2><Link to="/" className="primary-btn">Back to Home</Link></div></div>} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppShell />
      </Router>
    </AppProvider>
  );
}

export default App;
