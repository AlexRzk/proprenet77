import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Check } from 'lucide-react';

const activities = [
  {
    name: 'Hôtel',
    image: '/images_services/hotel-700x467.jpg',
    details: [
      'Nettoyage et entretien des chambres',
      'Hygiène des salles de bains',
      'Entretien des parties communes'
    ]
  },
  {
    name: 'Restaurant',
    image: '/images_services/restaurant-700x467.jpg',
    details: [
      'Nettoyage complet des salles',
      'Entretien des cuisines',
      'Propreté des espaces communs'
    ]
  },
  {
    name: 'Cabinet Médical',
    image: '/images_services/medical-700x467.jpg',
    details: [
      'Nettoyage et désinfection des salles d\'attente',
      'Hygiène renforcée des salles de consultation',
      'Entretien des sanitaires'
    ]
  },
  {
    name: 'Entreprise / Bureau',
    image: '/images_services/bureau-700x467.jpg',
    details: [
      'Entretien des bureaux et open-spaces',
      'Nettoyage des salles de réunion',
      'Hygiène des sanitaires et zones de pause'
    ]
  },
  {
    name: 'Particulier',
    image: '/images_services/particulier-700x467.jpg',
    details: [
      'Ménage complet du domicile',
      'Entretien des cuisines et salles de bains',
      'Soins particuliers (vitres, linge)'
    ]
  },
  {
    name: 'Airbnb',
    image: '/images_services/airbnb-700x467.jpg',
    details: [
      'Nettoyage rapide et complet',
      'Chambres et salles de bains prêtes',
      'Espaces toujours accueillants'
    ]
  },
];

const Services = () => {
  return (
    <section id="activities" className="py-32 bg-white relative overflow-hidden z-20">
      <div className="absolute inset-0 bg-white z-0"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto relative z-20">
          <div className="inline-block mb-4">
            <span className="text-2xl font-semibold text-[#00a41d] bg-[#00a41d]/10 px-4 py-2 rounded-full">
              Nos Services
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 relative">
            <span className="relative z-10 bg-white px-2">Solutions de Nettoyage</span>
            <span className="block bg-gradient-to-r from-[#00a41d] to-[#00c424] bg-clip-text text-transparent relative z-10" style={{ WebkitTextStroke: '0.5px rgba(0, 164, 29, 0.1)' }}>
              Sur Mesure
            </span>
          </h2>
          <p className="text-xl text-gray-600 font-light relative z-10 bg-white px-2">
            Des prestations adaptées à chaque environnement professionnel
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {activities.map((activity, index) => (
            <Card 
              key={activity.name}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white overflow-hidden animate-fade-in-up"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={activity.image} alt={activity.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              
              <CardHeader className="space-y-4 relative pb-6">
                <div>
                  <CardTitle className="text-2xl font-bold mb-2 group-hover:text-[#00a41d] transition-colors duration-300">
                    {activity.name}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="relative">
                <ul className="space-y-3">
                  {activity.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 group/item">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-[#00a41d] to-[#00c424] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;