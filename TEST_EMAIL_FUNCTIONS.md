# Test des Fonctions Email - PropreNet

## ✅ Vérification Contact Form (`/api/contact`)

### Points vérifiés :
- ✅ CORS headers configurés
- ✅ Validation des champs (name, email, phone, message)
- ✅ Vérification RESEND_API_KEY
- ✅ **CORRECTION** : Fallback email ajouté (`rozek.alexandre@gmail.com`)
- ✅ Logging détaillé des erreurs
- ✅ Template HTML professionnel
- ✅ ReplyTo configuré (permet de répondre directement au client)

### Problème corrigé :
**AVANT** : `to: process.env.CONTACT_EMAIL` → Crash si variable non définie  
**APRÈS** : `to: process.env.CONTACT_EMAIL || 'rozek.alexandre@gmail.com'` → Fallback sécurisé

---

## ✅ Vérification Brochure Form (`/api/brochure`)

### Points vérifiés :
- ✅ CORS headers configurés
- ✅ Validation email (format + présence)
- ✅ Vérification RESEND_API_KEY
- ✅ Recherche du PDF dans plusieurs emplacements
- ✅ Email envoyé même si PDF non trouvé (avec message adapté)
- ✅ Logging détaillé
- ✅ Template HTML professionnel

### Chemins de recherche PDF :
1. `../public/brochure.pdf` (développement)
2. `/var/task/public/brochure.pdf` (Vercel)
3. `process.cwd()/public/brochure.pdf` (fallback)

---

## 🔧 Configuration Requise Vercel

### Variables d'environnement à ajouter :

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=rozek.alexandre@gmail.com
```

**Note** : Si `CONTACT_EMAIL` n'est pas définie, le système utilisera automatiquement `rozek.alexandre@gmail.com`

---

## 🧪 Comment Tester

### Test Formulaire Contact :
1. Aller sur le site
2. Remplir le formulaire contact
3. Vérifier la boîte mail `rozek.alexandre@gmail.com`
4. Email devrait contenir :
   - Nom du client
   - Email (cliquable)
   - Téléphone (cliquable)
   - Message

### Test Formulaire Brochure :
1. Aller sur le site
2. Section "Recevez notre brochure"
3. Entrer un email
4. Vérifier l'email reçu
5. Brochure PDF devrait être en pièce jointe

---

## ⚠️ Points d'Attention

### Email "From" :
- Actuellement : `onboarding@resend.dev` (domaine Resend)
- Pour utiliser `contact@proprenet77.com` → Vérifier le domaine dans Resend

### Email "To" :
- Contact Form → `CONTACT_EMAIL` (ou fallback `rozek.alexandre@gmail.com`)
- Brochure Form → Email saisi par l'utilisateur

### Limites Resend Free :
- 100 emails/jour
- Seulement vers emails vérifiés (sauf si domaine vérifié)
- Pour recevoir les contacts → Vérifier `rozek.alexandre@gmail.com` dans Resend
- Pour envoyer les brochures → Domaine doit être vérifié OU email destinataire vérifié

---

## 🎯 Résumé des Corrections

| Fichier | Problème | Solution |
|---------|----------|----------|
| `contact.mjs` | Pas de fallback email | Ajout de `\|\| 'rozek.alexandre@gmail.com'` |
| `contact.mjs` | Pas de log de l'email destinataire | Ajout de `console.log('📧 Sending to:', recipientEmail)` |
| `brochure.mjs` | ✅ Déjà OK | Gestion propre des erreurs PDF |

---

**Date vérification** : 28 novembre 2025  
**Statut** : ✅ Fonctions corrigées et sécurisées
