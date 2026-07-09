import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Shield,
  Award,
  Clock,
  ChevronDown,
  Menu,
  X,
  Sun,
  Droplets,
  Brush,
  Building2,
  Zap,
  Home,
  ArrowRight,
  Send,
} from 'lucide-react';

const m1 = '/images/m1.png';
const m2 = '/images/m2.png';
const m3 = '/images/m3.png';
const m4 = '/images/m4.png';
const m5 = '/images/m5.png';
const m6 = '/images/m6.png';
const m7 = '/images/m7.png';
const m8 = '/images/m8.png';
const m9 = '/images/m9.png';

// ---------- helpers ----------
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

// ---------- data ----------
const SERVICES = [
  {
    icon: Home,
    title: 'Window Cleaning',
    description: 'Crystal-clear results for single and double storey homes. Pure water technology leaves no streaks, no residue,just spotless glass.',
    tag: 'Residential & Commercial',
  },
  {
    icon: Sun,
    title: 'Solar Panel Cleaning',
    description: 'Dirty panels can lose up to 30% efficiency. Our professional cleaning maximises your solar investment for both residential and commercial properties.',
    tag: 'Single Storey',
  },
  {
    icon: Droplets,
    title: 'Pressure Washing',
    description: 'Blast away grime, mould, and stains from driveways, paths, decks, and exterior walls. Restore surfaces to their original condition.',
    tag: 'Driveways & Exteriors',
  },
  {
    icon: Brush,
    title: 'Exterior Soft Washing',
    description: 'Low-pressure soft washing safely removes algae, lichen, and organic growth from render, cladding, and painted surfaces without causing damage.',
    tag: 'Safe for All Surfaces',
  },
  {
    icon: Building2,
    title: "Builder's Cleans",
    description: "Post-construction cleans done right. We remove adhesive, dust, plaster, and construction debris to get your property move-in or handover ready.",
    tag: 'New Builds & Renovations',
  },
  {
    icon: Zap,
    title: 'Emergency & Same-Day',
    description: 'Need it done fast? We offer emergency and same-day bookings for urgent situations,because we understand time-sensitive jobs.',
    tag: 'Available Now',
  },
];

const WHY_CHOOSE = [
  { icon: Shield, title: 'Fully Insured & Police Checked', desc: 'Your property and peace of mind are protected. We are fully insured and police checked for every job.' },
  { icon: Award, title: '100% Satisfaction Guaranteed', desc: 'If you are not completely happy with the result, we will come back and make it right. No questions asked.' },
  { icon: CheckCircle, title: 'Professional Equipment', desc: 'We invest in the best tools,pure water fed poles, professional soft wash systems, and high-grade pressure washers.' },
  { icon: Star, title: 'Attention to Detail', desc: 'Every job gets the same meticulous standard. We notice the spots others miss and we do not leave until the job is perfect.' },
  { icon: Clock, title: 'Reliable & On Time', desc: 'We show up when we say we will. Our clients keep coming back because they know they can count on us.' },
  { icon: Home, title: '5+ Years Experience', desc: 'Half a decade of hands-on experience across all property types. We have seen,and cleaned,it all.' },
];

const REVIEWS = [
  {
    name: 'Sarah T.',
    suburb: 'Norwood',
    rating: 5,
    text: "Jack did an incredible job on our windows and solar panels. You could see the difference immediately,panels are performing so much better. Will not use anyone else.",
  },
  {
    name: 'Mike D.',
    suburb: 'Burnside',
    rating: 5,
    text: "Absolutely brilliant service. Showed up on time, was professional, thorough and left everything spotless. Our builder's clean was done to a level we have never seen before.",
  },
  {
    name: 'Lena K.',
    suburb: 'Campbelltown',
    rating: 5,
    text: "We have used McLeay Property Maintenance twice now and the quality is consistently exceptional. Our windows have never looked better and Jack is always a pleasure to deal with.",
  },
  {
    name: 'Tom R.',
    suburb: 'Magill',
    rating: 5,
    text: "Pressure washed our whole driveway and back patio,completely transformed. Jack is reliable, reasonably priced and does premium work. Highly recommend.",
  },
];

const GALLERY = [
  { src: m1, alt: 'Solar panel cleaning on tiled roof, Adelaide' },
  { src: m2, alt: 'Professional window cleaning with pure water pole system' },
  { src: m3, alt: 'Solar panel cleaning on colorbond roof' },
  { src: m8, alt: 'Window cleaning on double storey townhouse Adelaide' },
  { src: m5, alt: "Builder's clean on new construction Adelaide" },
  { src: m4, alt: "Post construction clean - new build interior" },
  { src: m9, alt: "Builder's clean bathroom result" },
  { src: m7, alt: "Post construction clean - bathroom tiling" },
  { src: m6, alt: 'Clean windows with clear views across Adelaide suburbs' },
];

const AREAS = [
  'Athelstone', 'Campbelltown', 'Newton', 'Modbury', 'Burnside',
  'Magill', 'Norwood', 'Adelaide CBD', 'Marden', 'Rostrevor',
  'St Peters', 'Kensington', 'Prospect', 'North Adelaide', 'Unley',
  'Glenelg', 'Henley Beach', 'Tea Tree Gully', 'Paradise', 'Hectorville',
];

// ---------- components ----------
function NavLink({ href, children, mobile, onClick }: { href: string; children: React.ReactNode; mobile?: boolean; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={
        mobile
          ? 'block px-4 py-3 text-slate-700 font-medium hover:text-teal-700 transition-colors border-b border-slate-100'
          : 'text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-600 after:transition-all hover:after:w-full'
      }
    >
      {children}
    </a>
  );
}

function StarRow({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ---------- main ----------
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  type FormStatus = 'idle' | 'sending' | 'success' | 'error';
  const emptyForm = { name: '', phone: '', email: '', service: '', message: '' };

  const [formState, setFormState] = useState<FormStatus>('idle');
  const [form, setForm] = useState(emptyForm);

  const [heroFormState, setHeroFormState] = useState<FormStatus>('idle');
  const [heroForm, setHeroForm] = useState(emptyForm);

  const submitToWeb3 = async (data: typeof emptyForm, subject: string) => {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'YOUR_WEB3FORMS_KEY',
        subject,
        from_name: data.name,
        ...data,
      }),
    });
    if (!res.ok) throw new Error('failed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    try {
      await submitToWeb3(form, `New enquiry from ${form.name},McLeay Property Maintenance`);
      setFormState('success');
      setForm(emptyForm);
    } catch {
      setFormState('error');
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroFormState('sending');
    try {
      await submitToWeb3(heroForm, `New quote request from ${heroForm.name},McLeay Property Maintenance`);
      setHeroFormState('success');
      setHeroForm(emptyForm);
    } catch {
      setHeroFormState('error');
    }
  };

  return (
    <div className="font-sans antialiased text-slate-800">

      {/* ── NAV ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center gap-3 shrink-0">
              <img src="/logo2.png" alt="McLeay Property Maintenance" className="h-12 md:h-14 w-auto object-contain" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#why-us">Why Us</NavLink>
              <NavLink href="#gallery">Gallery</NavLink>
              <NavLink href="#reviews">Reviews</NavLink>
              <NavLink href="#areas">Areas</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </nav>

            <a
              href="tel:0427843630"
              className="hidden md:flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              <Phone size={15} />
              0427 843 630
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="py-2">
              {['#services', '#why-us', '#gallery', '#reviews', '#areas', '#contact'].map((href) => (
                <NavLink key={href} href={href} mobile onClick={() => setMenuOpen(false)}>
                  {href.slice(1).replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </NavLink>
              ))}
              <div className="px-4 py-3">
                <a
                  href="tel:0427843630"
                  className="flex items-center justify-center gap-2 bg-teal-700 text-white px-5 py-3 rounded-full text-sm font-semibold w-full"
                >
                  <Phone size={15} /> 0427 843 630
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${m8})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Left,headline & trust */}
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-600/20 border border-teal-500/40 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-teal-300 text-sm font-medium tracking-wide">Serving All Metro Adelaide</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-tight mb-6">
                Premium Property
                <span className="block text-teal-400">Maintenance</span>
                You Can Trust
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                Window cleaning, solar panel cleaning, pressure washing, and builder's cleans,delivered with exceptional attention to detail. Fully insured, police checked, 100% satisfaction guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="tel:0427843630"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base transition-all backdrop-blur-sm"
                >
                  <Phone size={18} /> 0427 843 630
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-full font-semibold text-base transition-all shadow-lg shadow-teal-500/30 hover:-translate-y-0.5"
                >
                  Get a Quote <ArrowRight size={18} />
                </a>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Shield, label: 'Fully Insured' },
                  { icon: CheckCircle, label: '100% Guaranteed' },
                  { icon: Award, label: 'Police Checked' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-slate-300">
                    <Icon size={16} className="text-teal-400 shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right,inline quote form */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {heroFormState === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-teal-300" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">Quote Request Sent!</h3>
                  <p className="text-slate-300 text-sm">Jack will be in touch shortly.</p>
                  <button
                    onClick={() => setHeroFormState('idle')}
                    className="mt-5 text-teal-300 text-sm font-medium hover:underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <div className="mb-2">
                    <h2 className="font-display text-xl font-bold text-white">Get a Free Quote</h2>
                    <p className="text-slate-300 text-sm mt-1">No obligation,we'll get back to you fast.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Name *</label>
                      <input
                        required
                        type="text"
                        value={heroForm.name}
                        onChange={e => setHeroForm({ ...heroForm, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-3.5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone *</label>
                      <input
                        required
                        type="tel"
                        value={heroForm.phone}
                        onChange={e => setHeroForm({ ...heroForm, phone: e.target.value })}
                        placeholder="04XX XXX XXX"
                        className="w-full px-3.5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={heroForm.email}
                      onChange={e => setHeroForm({ ...heroForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Service Required *</label>
                    <select
                      required
                      value={heroForm.service}
                      onChange={e => setHeroForm({ ...heroForm, service: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
                    >
                      <option value="">Select a service...</option>
                      <option>Window Cleaning,Single Storey</option>
                      <option>Window Cleaning,Double Storey</option>
                      <option>Solar Panel Cleaning</option>
                      <option>Pressure Washing</option>
                      <option>Exterior Soft Washing</option>
                      <option>Builder's Clean / Post Construction</option>
                      <option>Multiple Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={heroForm.message}
                      onChange={e => setHeroForm({ ...heroForm, message: e.target.value })}
                      placeholder="Property suburb, type, any details..."
                      className="w-full px-3.5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition resize-none"
                    />
                  </div>

                  {heroFormState === 'error' && (
                    <p className="text-red-300 text-xs bg-red-900/30 px-3 py-2 rounded-lg">
                      Something went wrong. Please call 0427 843 630 directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={heroFormState === 'sending'}
                    className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/30"
                  >
                    {heroFormState === 'sending' ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <>Send Quote Request <ArrowRight size={16} /></>
                    )}
                  </button>

                  <p className="text-slate-400 text-xs text-center">Free · No obligation · Fast response</p>
                </form>
              )}
            </div>

          </div>
        </div>

        <a
          href="#services"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </a>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-teal-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '500+', label: 'Jobs Completed' },
              { value: '100%', label: 'Satisfaction Rate' },
              { value: 'Same Day', label: 'Available' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white font-display">{value}</span>
                <span className="text-teal-300 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-16">
            <span className="text-teal-700 font-semibold text-sm tracking-widest uppercase">What We Do</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-2 mb-4">
              Our Services
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              From crystal-clear windows to high-performing solar panels, we deliver professional results every time,across all property types.
            </p>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, title, description, tag }, i) => (
              <FadeSection key={title} delay={i * 80}>
                <div className="group bg-white rounded-2xl p-8 h-full border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-teal-50 group-hover:bg-teal-700 flex items-center justify-center mb-6 transition-colors">
                    <Icon size={26} className="text-teal-700 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{tag}</span>
                  <h3 className="font-display text-xl font-bold text-slate-800 mt-2 mb-3">{title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection className="text-center mt-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Request a Free Quote <ArrowRight size={18} />
            </a>
          </FadeSection>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="why-us" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeSection>
              <span className="text-teal-700 font-semibold text-sm tracking-widest uppercase">Why McLeay</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-2 mb-6">
                The Standard Others Aspire To
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                We are not just another cleaning company. We are a premium service built on attention to detail, professional-grade equipment, and a genuine commitment to results that last.
              </p>
              <div className="space-y-4">
                {WHY_CHOOSE.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={20} className="text-teal-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>

            <FadeSection delay={150} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src={m1} alt="Solar panel cleaning Adelaide" className="rounded-2xl w-full h-56 object-cover shadow-lg" />
                <img src={m2} alt="Window cleaning Adelaide" className="rounded-2xl w-full h-56 object-cover shadow-lg mt-8" />
                <img src={m3} alt="Pressure washing Adelaide" className="rounded-2xl w-full h-56 object-cover shadow-lg -mt-4" />
                <img src={m5} alt="Builder's clean Adelaide" className="rounded-2xl w-full h-56 object-cover shadow-lg mt-4" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-teal-700 text-white rounded-2xl px-6 py-4 shadow-xl">
                <div className="text-3xl font-bold font-display">5★</div>
                <div className="text-teal-200 text-sm">Rated by Clients</div>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-16">
            <span className="text-teal-700 font-semibold text-sm tracking-widest uppercase">Our Work</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-2 mb-4">
              Results Speak for Themselves
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              A selection of recent jobs across Adelaide,every one completed to our exacting standards.
            </p>
          </FadeSection>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {GALLERY.map(({ src, alt }, i) => (
              <FadeSection key={i} delay={i * 60}>
                <div className="group relative overflow-hidden rounded-xl bg-slate-200 aspect-square">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/30 transition-colors duration-300" />
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-16">
            <span className="text-teal-700 font-semibold text-sm tracking-widest uppercase">Client Reviews</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Don't take our word for it,here's what Adelaide homeowners and businesses say about McLeay Property Maintenance.
            </p>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map(({ name, suburb, rating, text }, i) => (
              <FadeSection key={name} delay={i * 80}>
                <div className="bg-slate-50 rounded-2xl p-6 h-full border border-slate-100 flex flex-col">
                  <StarRow n={rating} />
                  <p className="text-slate-600 text-sm leading-relaxed mt-4 flex-1">"{text}"</p>
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-sm">
                      {name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{name}</div>
                      <div className="text-slate-400 text-xs">{suburb}, SA</div>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-6 py-3">
              <StarRow />
              <span className="text-slate-700 font-medium text-sm">Consistently 5-star rated across Adelaide</span>
            </div>
          </FadeSection>
        </div>
      </section>


      {/* ── GOVERNMENT & COUNCIL ── */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-10">
            <span className="text-teal-400 font-semibold text-sm tracking-widest uppercase">Approved Contractor</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
              Trusted by Local Government & Council
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              McLeay Property Maintenance is an approved contractor for government and council properties across South Australia.
            </p>
          </FadeSection>

          <FadeSection>
            <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {[
                { name: 'Adelaide City Council', abbr: 'ACC', detail: 'City of Adelaide' },
                { name: 'Campbelltown City Council', abbr: 'CCC', detail: 'City of Campbelltown' },
                { name: 'SA Government', abbr: 'SAG', detail: 'South Australian Government' },
              ].map(({ name, abbr, detail }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-teal-700/30 border border-teal-500/40 flex items-center justify-center">
                    <span className="text-teal-300 font-bold text-xs tracking-wider">{abbr}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm leading-snug">{name}</div>
                    <div className="text-slate-400 text-xs mt-1">{detail}</div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-teal-700/20 border border-teal-600/30 rounded-full px-3 py-1">
                    <CheckCircle size={12} className="text-teal-400" />
                    <span className="text-teal-300 text-xs font-medium">Approved Contractor</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── AREAS ── */}
      <section id="areas" className="py-20 lg:py-28 bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-14">
            <span className="text-teal-300 font-semibold text-sm tracking-widest uppercase">Service Area</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Proudly Serving All Metro Adelaide
            </h2>
            <p className="text-teal-200 max-w-2xl mx-auto text-lg">
              Based in Athelstone, we cover the entire Adelaide metropolitan area. If you're unsure whether we service your suburb, just call,the answer is almost certainly yes.
            </p>
          </FadeSection>

          <FadeSection>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {AREAS.map((area) => (
                <span
                  key={area}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-5 py-2 text-sm font-medium text-white transition-colors cursor-default"
                >
                  {area}
                </span>
              ))}
              <span className="bg-teal-600/40 border border-teal-500/40 rounded-full px-5 py-2 text-sm font-medium text-teal-200">
                + All Metro Adelaide
              </span>
            </div>
          </FadeSection>

          <FadeSection className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:0427843630"
                className="inline-flex items-center gap-2 bg-white text-teal-800 px-8 py-4 rounded-full font-semibold hover:bg-teal-50 transition-colors shadow-lg"
              >
                <Phone size={18} /> 0427 843 630
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                Get a Free Quote <ArrowRight size={18} />
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeSection>
              <span className="text-teal-700 font-semibold text-sm tracking-widest uppercase">Get In Touch</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-2 mb-4">
                Request Your Free Quote
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                Ready for cleaner windows, more efficient solar panels, or a sparkling builder's clean? Get in touch for your free, no-obligation quote. We typically respond within a few hours.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Phone, label: 'Phone', value: '0427 843 630', href: 'tel:0427843630' },
                  { icon: Mail, label: 'Email', value: 'Info@mcleaypropertymaintenance.com.au', href: 'mailto:Info@mcleaypropertymaintenance.com.au' },
                  { icon: MapPin, label: 'Location', value: 'Athelstone SA 5076,Servicing all metro Adelaide', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-teal-700" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-medium">{label}</div>
                      {href ? (
                        <a href={href} className="text-slate-800 font-semibold hover:text-teal-700 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-slate-800 font-semibold">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 bg-teal-50 border border-teal-100 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={18} className="text-teal-700" />
                  <span className="font-semibold text-slate-800">Emergency & Same-Day Available</span>
                </div>
                <p className="text-slate-600 text-sm">Need urgent attention? Call us directly,we do our best to accommodate same-day bookings.</p>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 flex items-center gap-4">
                <img src="/logo2.png" alt="McLeay Property Maintenance" className="h-14 w-auto object-contain" />
                <p className="text-slate-500 text-sm leading-snug">Adelaide's trusted property maintenance specialist.</p>
              </div>
            </FadeSection>

            <FadeSection delay={150}>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                {formState === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-teal-600" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-800 mb-2">Enquiry Sent!</h3>
                    <p className="text-slate-500">Thanks for reaching out. Jack will be in touch shortly.</p>
                    <button
                      onClick={() => setFormState('idle')}
                      className="mt-6 text-teal-700 font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-display text-xl font-bold text-slate-800 mb-6">Free Quote Request</h3>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="04XX XXX XXX"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Required *</label>
                      <select
                        required
                        value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-slate-800 bg-white"
                      >
                        <option value="">Select a service...</option>
                        <option>Window Cleaning,Single Storey</option>
                        <option>Window Cleaning,Double Storey</option>
                        <option>Solar Panel Cleaning</option>
                        <option>Pressure Washing</option>
                        <option>Exterior Soft Washing</option>
                        <option>Builder's Clean / Post Construction</option>
                        <option>Multiple Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your property, suburb, and anything else we should know..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-slate-800 placeholder-slate-400 resize-none"
                      />
                    </div>

                    {formState === 'error' && (
                      <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
                        Something went wrong. Please call us on 0427 843 630 or email directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formState === 'sending'}
                      className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white py-4 rounded-xl font-semibold transition-colors"
                    >
                      {formState === 'sending' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>Send Enquiry <Send size={17} /></>
                      )}
                    </button>

                    <p className="text-slate-400 text-xs text-center">
                      Free quotes · No obligation · Typically reply within a few hours
                    </p>
                  </form>
                )}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-white pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <img
                  src="/logo2.png"
                  alt="McLeay Property Maintenance"
                  className="h-[90px] md:h-[105px] w-auto object-contain rounded-xl"
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                Premium property maintenance across all metro Adelaide suburbs. Window cleaning, solar panel cleaning, pressure washing, and builder's cleans done right.
              </p>
              <div className="flex gap-3">
                <a href="tel:0427843630" className="flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Phone size={14} /> 0427 843 630
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {['Window Cleaning', 'Solar Panel Cleaning', 'Pressure Washing', 'Soft Washing', "Builder's Cleans", 'Same-Day Service'].map(s => (
                  <li key={s}><a href="#services" className="hover:text-teal-400 transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <Phone size={14} className="shrink-0 mt-0.5 text-teal-500" />
                  <a href="tel:0427843630" className="hover:text-teal-400 transition-colors">0427 843 630</a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={14} className="shrink-0 mt-0.5 text-teal-500" />
                  <a href="mailto:Info@mcleaypropertymaintenance.com.au" className="hover:text-teal-400 transition-colors break-all">
                    Info@mcleayproperty<wbr />maintenance.com.au
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="shrink-0 mt-0.5 text-teal-500" />
                  <span>Athelstone SA 5076<br />All Metro Adelaide</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} McLeay Property Maintenance. All rights reserved. ABN available on request.</p>
            <p>
              Website by{' '}
              <a
                href="https://www.itscold.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
              >
                Go Polar
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
