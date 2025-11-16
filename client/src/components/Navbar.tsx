import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Activités', id: 'activities' },
    { label: 'Qui sommes-nous ?', id: 'about' },
    { label: 'Notre équipe', id: 'team' },
    { label: 'Nos réalisations', id: 'photos' },
    { label: 'Contact', id: 'contact' },
  ];

  const navShellClasses = isScrolled
    ? 'bg-white/95 text-gray-900 shadow-2xl'
    : 'bg-white/10 text-white shadow-lg shadow-black/10 border border-white/20';

  const linkClasses = isScrolled
    ? 'text-gray-700 hover:text-[#14794b]'
    : 'text-white/80 hover:text-white';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div
          className={`mt-4 flex items-center justify-between gap-6 rounded-3xl backdrop-blur-xl transition-all duration-500 px-5 md:px-8 py-4 ${navShellClasses}`}
        >
          <button
            className="flex items-center gap-3 group"
            onClick={() => scrollToSection('home')}
            aria-label="Retour à l'accueil"
          >
            <div className="relative w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-transform duration-300" style={{ padding: '2px' }}>
              <img src="/logo.png" alt="Logo PropreNet" className="w-14 h-14 object-contain" />
            </div>
            <span
              className={`text-2xl font-semibold tracking-tight transition-colors duration-500 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              PropreNet
            </span>
          </button>

          <div className="hidden lg:flex items-center justify-center flex-1">
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ${
                isScrolled ? 'bg-gray-100/80' : 'bg-white/10 border border-white/10'
              }`}
            >
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${linkClasses} relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-110 focus-visible:scale-110`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:0764515942"
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-[#14794b]/10 text-[#14794b] hover:bg-[#14794b]/20'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Phone className="w-4 h-4" />
              07 64 51 59 42
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 rounded-full bg-[#14794b] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#14794b]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Devis rapide
            </button>
          </div>

          <button
            className={`lg:hidden rounded-2xl p-3 transition-colors ${
              isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className={`mt-3 rounded-3xl border px-6 py-6 shadow-2xl transition-all duration-500 lg:hidden ${
              isScrolled
                ? 'bg-white/95 border-gray-200 text-gray-900'
                : 'bg-white/10 border-white/20 text-white backdrop-blur-xl'
            }`}
          >
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-300 ${
                    isScrolled ? 'hover:bg-gray-100 text-gray-900' : 'hover:bg-white/10 text-white/90'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              <a
                href="tel:0764515942"
                className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold backdrop-blur-md transition-colors duration-300 ${
                  isScrolled ? 'border-[#14794b]/20 text-[#14794b] bg-white/50' : 'border-[#14794b]/30 text-[#14794b] bg-white/90'
                }`}
              >
                <Phone className="w-4 h-4" />
                07 64 51 59 42
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-2xl bg-[#14794b] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#14794b]/30"
              >
                Demander un devis
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
