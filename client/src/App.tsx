import Navbar from './components/Navbar';
import { Phone, Sparkles, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import Services from './components/Services';
import About from '@/components/About';

function App() {
  const backgroundTextRef = useRef<HTMLHeadingElement | null>(null);
  const teamImageRef = useRef<HTMLDivElement | null>(null);
  const [heroOffset, setHeroOffset] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const backgroundTextStartY = -125;
  
  const teamImages = [
    '/images_our_team/059-510x680.jpg',
    '/images_our_team/015-510x680.jpg',
    '/images_our_team/065-510x680.jpg',
    '/images_our_team/101-510x680.jpg',
    '/images_our_team/148-510x680.jpg',
    '/images_our_team/168-510x680.jpg',
    '/images_our_team/170-510x680.jpg',
    '/images_our_team/proprenet3-1080x1770.jpg'
  ];
  
  const clientReviews = [
    {
      id: 'nawel-paul',
      name: 'Nawel & Paul',
      rating: '5/5',
      timeframe: 'il y a un an',
      text: 'Je vous recommande cette entreprise sans hésiter. Le ménage est très bien fait. Le personnel est extrêmement respectueux, d\'une gentillesse remarquable et ponctuel. Les rendez-vous sont honorés.',
      visited: 'Mai 2024'
    },
    {
      id: 'yoan-damhet',
      name: 'Yoan Damhet',
      rating: '5/5',
      timeframe: 'il y a un an',
      text: 'Une équipe très méticuleuse dans son travail, que nous recommandons amplement',
      visited: 'Mai 2024'
    },
    {
      id: 'jessica-laviron',
      name: 'Jessica Laviron',
      rating: '5/5',
      timeframe: 'il y a un an',
      text: 'Un service très qualitatif et une bonne humeur des plus agréable !',
      visited: 'Mai 2024'
    },
    {
      id: 'marie-dubois',
      name: 'Marie Dubois',
      rating: '5/5',
      timeframe: 'il y a 3 mois',
      text: 'Excellent service pour mes locations Airbnb. Les turnovers sont rapides et le résultat toujours parfait. Mes invités sont ravis de la propreté !',
      visited: 'Août 2024'
    },
    {
      id: 'alexandre-petit',
      name: 'Alexandre Petit',
      rating: '5/5',
      timeframe: 'il y a 2 mois',
      text: 'Entreprise sérieuse et professionnelle. Intervention rapide après travaux dans nos locaux, résultat impeccable. Je recommande sans hésitation.',
      visited: 'Septembre 2024'
    },
    {
      id: 'sophie-moreau',
      name: 'Sophie Moreau',
      rating: '5/5',
      timeframe: 'il y a 4 semaines',
      text: 'Équipe au top pour l\'entretien de mon cabinet médical. Discrets, efficaces et respectueux des normes d\'hygiène. Très satisfaite de leur prestation.',
      visited: 'Octobre 2024'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const relative = Math.max(scrollY - 50, 0);
      setHeroOffset(relative * 0.5);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = [backgroundTextRef.current, teamImageRef.current].filter(Boolean) as Element[];
    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />
      
      {/* Hero Section - Team Photo Centered */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 md:pt-40">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/header_hero_background.png)' }}></div>
        <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-noise"></div>
        <div className="absolute inset-0 opacity-30 bg-grain"></div>
        <div className="absolute inset-0 opacity-15 bg-pattern"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center max-w-7xl mx-auto gap-12">
            <div className="text-center space-y-8 animate-fade-in-up mt-8 md:mt-12">
              <h1 className="font-bold leading-tight font-bebas text-white">
                <span className="text-4xl md:text-5xl lg:text-6xl block mb-2">Un Service de Nettoyage Professionnel</span>
                <span className="text-3xl md:text-4xl lg:text-5xl block">Pour Votre Intérieur</span>
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="tel:0764515942" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-red-500/50 text-lg">
                  <Phone className="w-5 h-5" />
                  07 64 51 59 42
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00a41d] hover:bg-[#00c424] text-white font-semibold rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50 text-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Devis rapide
                </a>
              </div>
            </div>

            <div className="relative w-full mt-16">
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ overflow: 'visible' }}
              >
                <h2
                  ref={backgroundTextRef}
                  className="hero-heading text-[7rem] md:text-[11rem] lg:text-[15rem] xl:text-[18rem] font-display font-black text-center leading-none select-none tracking-tight"
                  style={{
                    transform: `translate3d(0, ${backgroundTextStartY + heroOffset}px, 0)`,
                    transition: 'transform 0.05s linear',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.3))'
                  }}
                >
                  Propre<br/>et Net
                </h2>
              </div>
              
              <div
                ref={teamImageRef}
                className="hero-team relative z-10 flex items-center justify-center py-0"
              >
                <img 
                  src="/images/team_photo.png" 
                  alt="Équipe de nettoyage PropreNet" 
                  className="relative w-full max-w-6xl h-auto object-contain drop-shadow-2xl rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />

      <About />

      {/* Équipe Section */}
      <section id="team" className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        {/* Floating shapes background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[10%] w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-green-300/15 to-teal-300/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-cyan-50 px-6 py-3 rounded-full mb-8 border border-emerald-200/50">
              <div className="w-2 h-2 bg-[#00a41d] rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-[#00a41d] tracking-wider uppercase">Notre Équipe</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Des experts<br/>
              <span className="bg-gradient-to-r from-[#00a41d] via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                dédiés à vos espaces
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              Une équipe polyvalente formée aux standards de l'excellence
            </p>
          </div>

          {/* Creative alternating grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 max-w-[1400px] mx-auto">
            {/* Large featured image - top left */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2">
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl h-full min-h-[350px] md:min-h-[500px]">
                <img
                  src={teamImages[0]}
                  alt="Équipe PropreNet"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{ objectPosition: '50% 35%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00a41d]/80 via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-6 left-6 w-16 h-1 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Two stacked images - top right */}
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[240px]">
                <img
                  src={teamImages[1]}
                  alt="Équipe PropreNet"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[240px]">
                <img
                  src={teamImages[2]}
                  alt="Équipe PropreNet"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
            </div>

            {/* Bottom row - three equal images */}
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[240px]">
                <img
                  src={teamImages[3]}
                  alt="Équipe PropreNet"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00a41d] to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[240px]">
                <img
                  src={teamImages[4]}
                  alt="Équipe PropreNet"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00a41d] to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[240px]">
                <img
                  src={teamImages[5]}
                  alt="Équipe PropreNet"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00a41d] to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>

            {/* Additional two images */}
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[240px]">
                <img
                  src={teamImages[6]}
                  alt="Équipe PropreNet"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[240px]">
                <img
                  src={teamImages[7]}
                  alt="Équipe PropreNet"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="relative py-32 bg-gray-50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00a41d]/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-20 reveal-about">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg mb-6">
              <Sparkles className="w-5 h-5 text-[#00a41d]" />
              <span className="text-lg font-bold text-[#00a41d] tracking-wider uppercase">Pourquoi nous choisir</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-gray-900 mb-6 leading-[1.1]">
              L'excellence à votre<br/>
              <span className="bg-gradient-to-r from-[#00a41d] via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                service
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              Ce qui fait de Propre Net votre partenaire de confiance
            </p>
          </div>

          {/* Creative Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 - Large Card */}
            <div className="lg:col-span-2 group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00a41d]/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-10 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#00a41d] to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Star className="w-8 h-8 text-white" fill="white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                      Expertise reconnue
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      Des années d'expérience dans le nettoyage professionnel à travers de multiples secteurs : hôtels, restaurants, cabinets médicaux, entreprises et locations Airbnb.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-[#00a41d]/10 text-[#00a41d] rounded-full text-sm font-semibold">Réponse en -2h</span>
                      <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">Équipes assurées</span>
                      <span className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold">Devis gratuit</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00a41d] via-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>

            {/* Feature 2 - Tall Card */}
            <div className="group relative bg-gradient-to-br from-[#00a41d] to-emerald-600 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 lg:row-span-2">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative p-10 md:p-12 h-full flex flex-col">
                <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Réactivité<br/>exceptionnelle
                </h3>
                <p className="text-lg text-white/90 leading-relaxed mb-8">
                  Service rapide et disponible : nous nous engageons à vous répondre et intervenir dans les meilleurs délais.
                </p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90 font-medium">Réponse en moins de 2h00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90 font-medium">Devis sous 24h00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90 font-medium">Interventions 7j/7 selon besoins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Wide Card */}
            <div className="lg:col-span-2 group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-[#00a41d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-10 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                      Qualité garantie
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Équipes formées et assurées, matériel et produits professionnels pour des résultats impeccables à chaque intervention.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#00a41d]/10 rounded-lg flex items-center justify-center">
                        <span className="text-[#00a41d] font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Équipes formées & assurées</h4>
                        <p className="text-sm text-gray-600">Professionnels qualifiés et couverts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#00a41d]/10 rounded-lg flex items-center justify-center">
                        <span className="text-[#00a41d] font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Matériel & produits professionnels</h4>
                        <p className="text-sm text-gray-600">Adaptés à chaque surface et besoin</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#00a41d]/10 rounded-lg flex items-center justify-center">
                        <span className="text-[#00a41d] font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Devis gratuit, sans engagement</h4>
                        <p className="text-sm text-gray-600">Transparence totale sur nos tarifs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#00a41d] via-emerald-500 to-cyan-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top"></div>
            </div>

            {/* Feature 4 - Small Card */}
            <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00a41d]/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-10">
                <div className="flex-shrink-0 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                  Sans engagement
                </h3>
                <p className="text-base text-white/80 leading-relaxed">
                  Devis gratuit et détaillé, sans surprises ni frais cachés. Transparence garantie.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00a41d] to-cyan-400"></div>
            </div>

            {/* Feature 5 - Medium Card */}
            <div className="lg:col-span-2 group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/10 to-[#00a41d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-10 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                      Couverture Seine-et-Marne
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Service local avec une connaissance approfondie du département 77 et une capacité d'intervention rapide sur l'ensemble du territoire.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avis Section */}
      <section id="reviews" className="relative py-32 bg-gradient-to-b from-white via-emerald-50/40 to-white overflow-hidden">
        <div className="absolute inset-x-0 -top-24 flex justify-center opacity-40">
          <div className="w-3/4 h-40 bg-gradient-to-r from-emerald-100 to-cyan-100 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-about">
            <span className="text-sm font-semibold text-[#00a41d] bg-[#00a41d]/10 px-4 py-2 rounded-full uppercase tracking-[0.3em]">
              Avis
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-4 mb-6">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Des retours authentiques qui témoignent de notre exigence quotidienne et de l'attention portée à chaque mission.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
            {clientReviews.map((review) => (
              <Card key={review.id} className="border-0 shadow-xl bg-white/90 backdrop-blur reveal-about">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{review.name}</p>
                      <p className="text-sm text-slate-500">{review.timeframe} · {review.rating}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={`${review.id}-star-${index}`} className="w-4 h-4" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  {review.text ? (
                    <p className="text-lg text-slate-600 leading-relaxed">
                      “{review.text}”
                    </p>
                  ) : (
                    <p className="text-lg text-slate-400 italic">Avis partagé sans commentaire.</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{review.timeframe}</span>
                    <span>{review.visited}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="relative py-32 bg-gradient-to-br from-white via-emerald-50/30 to-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-[15%] w-80 h-80 bg-gradient-to-br from-cyan-300/20 to-emerald-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-gradient-to-tl from-green-300/15 to-teal-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full mb-8 shadow-lg border border-emerald-100">
              <Sparkles className="w-5 h-5 text-[#00a41d]" />
              <span className="text-sm font-bold text-gray-700 tracking-wider uppercase">Galerie</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-gray-900 mb-6 leading-tight">
              Nos <span className="bg-gradient-to-r from-[#00a41d] to-emerald-600 bg-clip-text text-transparent">réalisations</span>
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Un aperçu de notre travail au quotidien
            </p>
          </div>

          {/* Creative masonry grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 max-w-[1400px] mx-auto">
            {/* Large featured image - left side spanning 2 rows */}
            <div className="col-span-1 md:col-span-2 lg:col-span-5 lg:row-span-2">
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl h-full min-h-[400px] md:min-h-[550px]">
                <img
                  src="/images_photos/001-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ objectPosition: '50% 40%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            
            {/* Two images - top right side */}
            <div className="col-span-1 lg:col-span-3">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[265px]">
                <img
                  src="/images_photos/003-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[265px]">
                <img
                  src="/images_photos/005-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </div>

            {/* Second row - right side */}
            <div className="col-span-1 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[265px]">
                <img
                  src="/images_photos/006-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[190px] md:min-h-[265px]">
                <img
                  src="/images_photos/012-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </div>

            {/* Wide panoramic image */}
            <div className="col-span-1 md:col-span-2 lg:col-span-7">
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl h-full min-h-[250px] md:min-h-[320px]">
                <img
                  src="/images_photos/hotel-700x467.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-5">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[250px] md:min-h-[320px]">
                <img
                  src="/images_photos/144-1080x1440.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Three equal images */}
            <div className="col-span-1 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[200px] md:min-h-[280px]">
                <img
                  src="/images_photos/023-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[200px] md:min-h-[280px]">
                <img
                  src="/images_photos/028-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[200px] md:min-h-[280px]">
                <img
                  src="/images_photos/034-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Final two images */}
            <div className="col-span-1 md:col-span-1 lg:col-span-6">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[250px] md:min-h-[300px]">
                <img
                  src="/images_photos/052-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="col-span-1 md:col-span-1 lg:col-span-6">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[250px] md:min-h-[300px]">
                <img
                  src="/images_photos/120-510x680.jpg.jpeg"
                  alt="PropreNet - Réalisation"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
                Demander un devis
              </h2>
              <p className="text-lg text-gray-600 font-light">
                Réponse rapide et gratuite sous 24h
              </p>
            </div>
            <Card className="shadow-xl border-gray-200">
              <CardContent className="p-8">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <Input 
                      type="text" 
                      name="name"
                      placeholder="Votre nom" 
                      className="h-12 text-base"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Votre email" 
                      className="h-12 text-base"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      name="phone"
                      placeholder="Votre téléphone" 
                      className="h-12 text-base"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <Textarea 
                      name="message"
                      placeholder="Décrivez vos besoins en nettoyage..." 
                      rows={5}
                      className="text-base resize-none"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                      ✓ Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                      ✗ Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
                    </div>
                  )}
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base bg-[#00a41d] hover:bg-[#00c424] transition-all duration-300 shadow-md hover:shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  </Button>
                  <p className="text-center text-sm text-gray-500 pt-2">
                    Ou appelez-nous directement au <a href="tel:0764515942" className="text-[#00a41d] font-semibold hover:underline">07 64 51 59 42</a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-[#00a41d]" />
                  <span className="text-xl font-display font-bold">PropreNet</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Nettoyage professionnel en Seine-et-Marne
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Contact</h3>
                <p className="text-gray-400 text-sm mb-2">
                  <a href="tel:0764515942" className="hover:text-[#00a41d] transition-colors">
                    07 64 51 59 42
                  </a>
                </p>
                <p className="text-gray-400 text-sm">
                  <a href="https://www.proprenet77.com" className="hover:text-[#00a41d] transition-colors">
                    www.proprenet77.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Services</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>Bureaux & Commerces</li>
                  <li>Hôtels & Restaurants</li>
                  <li>Particuliers</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                <p className="text-gray-400">© 2025 PropreNet. Tous droits réservés.</p>
                <p className="text-gray-400">
                  Création du site web : <a href="https://ikovaline.com" target="_blank" rel="noopener noreferrer" className="text-[#00a41d] hover:text-[#00c424] transition-colors font-medium">Ikovaline.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
