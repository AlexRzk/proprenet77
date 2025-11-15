# 🧹 PropreNet 77 - Site Web Moderne

Site web modernisé pour PropreNet 77, entreprise de nettoyage professionnel en Seine-et-Marne.

## ✅ Ce qui a été créé

### 🎨 **Interface (Client - React + Vite)**
- ✨ **Navigation moderne** avec logo PropreNet à gauche
- 📋 **Menu complet** : Activités, Qui sommes-nous ?, Équipe, Photos, Contact
- 📱 **Responsive** - Menu hamburger pour mobile
- 🎨 **Design moderne** avec Tailwind CSS et shadcn/ui
- 🔄 **Scroll fluide** entre les sections
- 💫 **Effet glassmorphism** au scroll

### ⚙️ **Serveur (Node.js + Express)**
- 🚀 API Express configurée
- 🔌 CORS activé pour la communication client-serveur
- 📧 Base pour formulaire de contact
- ✅ Health check endpoint

## 🚀 Démarrage rapide

### Client (Frontend)
```powershell
cd client
npm run dev
```
➜ Ouvre sur **http://localhost:5173**

### Serveur (Backend)
```powershell
cd server
npm run dev
```
➜ Tourne sur **http://localhost:3001**

## 📂 Structure du projet

```
proprenet77/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx    # Menu de navigation
│   │   │   └── ui/           # Composants shadcn/ui
│   │   ├── App.tsx           # Application principale
│   │   ├── main.tsx          # Point d'entrée
│   │   └── index.css         # Styles Tailwind
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── server/                    # Backend Node.js
    ├── index.js              # Serveur Express
    ├── package.json
    └── .env                  # Configuration
```

## 🎯 Sections de la page

1. **Home** - Page d'accueil avec titre PropreNet 77
2. **Activités** - Vos services de nettoyage
3. **Qui sommes-nous ?** - Présentation de l'entreprise
4. **Équipe** - Votre équipe professionnelle
5. **Photos** - Galerie de photos
6. **Contact** - Formulaire de contact

## 🎨 Navigation

### Desktop
- Logo + nom "PropreNet" à gauche
- Menu horizontal avec tous les liens
- Bouton "Devis gratuit" mis en avant

### Mobile
- Menu hamburger (3 barres)
- Menu déroulant avec tous les liens
- Responsive et tactile

## 📝 Prochaines étapes

### Pour personnaliser le logo :
1. Placez votre logo dans `client/public/logo.png`
2. Dans `client/src/components/Navbar.tsx`, ligne 46-48, remplacez par :
```tsx
<img src="/logo.png" alt="PropreNet Logo" className="w-12 h-12 object-contain" />
```

### Pour ajouter du contenu :
- Modifiez `client/src/App.tsx`
- Chaque section a un ID unique pour le scroll
- Utilisez les composants shadcn/ui pour l'UI

### Pour activer les emails :
- Configurez Nodemailer dans `server/index.js`
- Ajoutez vos identifiants email dans `server/.env`

## 🎨 Couleurs

- **Primary** : Bleu (#0EA5E9) - couleur principale
- **Accent** : Cyan - pour les dégradés
- **Neutral** : Gris - pour le texte et fonds

## 🛠️ Technologies utilisées

- **Frontend** : React 18, TypeScript, Vite
- **Styling** : Tailwind CSS, shadcn/ui
- **Icons** : Lucide React
- **Backend** : Node.js, Express
- **Animations** : Framer Motion (prévu)

## 📞 Support

Pour toute question sur le développement, consultez la documentation de chaque technologie.

---

**Status**: ✅ Configuration de base terminée
**Prêt pour**: Développement des sections individuelles
