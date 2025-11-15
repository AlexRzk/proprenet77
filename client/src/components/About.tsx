import { useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';


const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const targets = document.querySelectorAll('.reveal-about');
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, []);

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-green-200/25 to-teal-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto mb-16 reveal-about">
          <div className="inline-flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-full mb-8 border border-emerald-100">
            <Sparkles className="w-5 h-5 text-[#00a41d]" />
            <span className="text-sm font-bold text-[#00a41d] tracking-wider uppercase">Qui sommes-nous ?</span>
          </div>
          
          <div className="flex flex-col items-center gap-6 mb-8">
            <img src="/logo.png" alt="PropreNet Logo" className="w-32 h-32 object-contain" />
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-gray-900 leading-[1.1]">
              <span className="bg-gradient-to-r from-[#00a41d] via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                PROPRE NET
              </span>
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              Basée en Seine-et-Marne (77), Propre Net est spécialisée dans le nettoyage professionnel pour hôtels, restaurants, cabinets médicaux, entreprises, particuliers et locations Airbnb.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              Nos prestations sur mesure :
            </p>

            <ul className="space-y-3 text-base text-gray-600 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#00a41d] font-bold">•</span>
                <span><strong className="text-gray-800">Hôtels</strong> : entretien quotidien des chambres et espaces communs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#00a41d] font-bold">•</span>
                <span><strong className="text-gray-800">Restaurants</strong> : zones de service et cuisines aux normes d'hygiène</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#00a41d] font-bold">•</span>
                <span><strong className="text-gray-800">Cabinets médicaux</strong> : nettoyage rigoureux et discret</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#00a41d] font-bold">•</span>
                <span><strong className="text-gray-800">Entreprises</strong> : bureaux, open spaces et locaux professionnels</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#00a41d] font-bold">•</span>
                <span><strong className="text-gray-800">Particuliers</strong> : interventions ponctuelles ou régulières</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#00a41d] font-bold">•</span>
                <span><strong className="text-gray-800">Airbnb</strong> : turnovers rapides et impeccables</span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed pt-4">
              Équipe qualifiée, matériel professionnel et produits adaptés pour des résultats irréprochables. Chez Propre Net, nous offrons des espaces propres et accueillants avec une gestion fluide et réactive.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button className="bg-gradient-to-r from-[#00a41d] to-emerald-600 hover:from-emerald-600 hover:to-[#00a41d] text-white px-8 py-6 rounded-full text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
              Demander un devis <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <span className="text-sm text-gray-500">Réponse sous 24h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
