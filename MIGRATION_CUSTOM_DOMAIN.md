# 🚀 Script de Migration vers Domaine Personnalisé

## Quand utiliser ce script?

**Après avoir:**
1. ✅ Configuré les DNS chez ton hébergeur
2. ✅ Vérifié le domaine dans Resend (tous les records ✅)
3. ✅ Attendu la propagation DNS (5-30 min)

**Avant de:**
- Modifier le code manuellement
- Chercher tous les endroits où changer l'email

---

## 📝 Changements à Faire

### Fichier 1: `client/api/contact.mjs`

**AVANT:**
```javascript
const { data, error } = await resend.emails.send({
  from: 'PropreNet <onboarding@resend.dev>',
  to: recipientEmail,
```

**APRÈS:**
```javascript
const { data, error } = await resend.emails.send({
  from: 'PropreNet <contact@proprenet77.com>',  // ← CHANGÉ
  to: recipientEmail,
```

---

### Fichier 2: `client/api/brochure.mjs`

**AVANT:**
```javascript
const { data, error } = await resend.emails.send({
  from: 'PropreNet <onboarding@resend.dev>',
  to: email,
```

**APRÈS:**
```javascript
const { data, error } = await resend.emails.send({
  from: 'PropreNet <contact@proprenet77.com>',  // ← CHANGÉ
  to: email,
```

---

## 🔧 Commands PowerShell

### Option 1: Avec un éditeur de texte

1. Ouvre `client/api/contact.mjs`
2. Cherche `onboarding@resend.dev` (Ctrl+F)
3. Remplace par `contact@proprenet77.com`
4. Sauvegarde

Répète pour `client/api/brochure.mjs`

### Option 2: Avec PowerShell (Automatique)

```powershell
# Aller dans le dossier du projet
cd C:\Users\olo\Programmes\proprenet77

# Remplacer dans contact.mjs
(Get-Content client\api\contact.mjs) -replace 'onboarding@resend.dev', 'contact@proprenet77.com' | Set-Content client\api\contact.mjs

# Remplacer dans brochure.mjs
(Get-Content client\api\brochure.mjs) -replace 'onboarding@resend.dev', 'contact@proprenet77.com' | Set-Content client\api\brochure.mjs

# Vérifier les changements
git diff

# Commiter et pousser
git add -A
git commit -m "Update email sender to custom domain"
git push origin main
```

---

## ✅ Vérification Post-Migration

### 1. Vérifier les fichiers modifiés

```powershell
# Chercher toutes les occurrences
Select-String -Path "client\api\*.mjs" -Pattern "@resend.dev"
```

**Résultat attendu:** Aucune occurrence trouvée

### 2. Vérifier que le domaine est correct

```powershell
# Chercher le nouveau domaine
Select-String -Path "client\api\*.mjs" -Pattern "proprenet77.com"
```

**Résultat attendu:** 2 occurrences (une dans chaque fichier)

### 3. Tester en local

```powershell
cd client
npm run dev
```

Ouvre `http://localhost:5173/test-contact.html` et teste

### 4. Vérifier les logs Vercel après déploiement

1. Va sur https://vercel.com/[ton-projet]/logs
2. Teste un formulaire
3. Cherche dans les logs:
   - ✅ "Email sent successfully"
   - ✅ from: contact@proprenet77.com

---

## 🎯 Checklist Complète

### Avant de Commencer:
- [ ] DNS configurés chez l'hébergeur (DKIM, MX, SPF)
- [ ] DNS propagés (attendre 30 min minimum)
- [ ] Domaine vérifié dans Resend (https://resend.com/domains)
- [ ] Tous les records montrent ✅ dans Resend

### Migration:
- [ ] contact.mjs modifié
- [ ] brochure.mjs modifié
- [ ] Changements vérifiés (git diff)
- [ ] Aucune occurrence de "onboarding@resend.dev"
- [ ] Code committé
- [ ] Code poussé sur GitHub
- [ ] Déploiement Vercel terminé

### Tests:
- [ ] Formulaire contact testé en production
- [ ] Formulaire brochure testé en production
- [ ] Email reçu de contact@proprenet77.com
- [ ] Logs Vercel vérifiés (pas d'erreur)
- [ ] Logs Resend vérifiés (https://resend.com/logs)

---

## 🔍 Vérification du Domaine Email

### Test rapide (PowerShell):

```powershell
# Vérifier que le domaine peut recevoir des emails
nslookup -type=MX send.proprenet77.com

# Résultat attendu:
# send.proprenet77.com    MX preference = 10, mail exchanger = feedback-smtp.eu-west-1.amazonses.com
```

### Test DKIM:

```powershell
nslookup -type=TXT resend._domainkey.proprenet77.com

# Résultat attendu: Longue clé commençant par p=MIGfMA0G...
```

### Test SPF:

```powershell
nslookup -type=TXT send.proprenet77.com

# Résultat attendu: v=spf1 include:amazonses.com ~all
```

---

## ⚠️ Si Ça Ne Marche Pas Après Migration

### Problème: Emails ne partent pas

**Causes possibles:**
1. DNS pas encore propagés → Attendre encore 30 min
2. Domaine pas vérifié dans Resend → Vérifier sur resend.com/domains
3. Typo dans l'email → Vérifier `contact@proprenet77.com` (pas de faute)

**Solution:**
```powershell
# Revenir temporairement à onboarding@resend.dev
(Get-Content client\api\contact.mjs) -replace 'contact@proprenet77.com', 'onboarding@resend.dev' | Set-Content client\api\contact.mjs
(Get-Content client\api\brochure.mjs) -replace 'contact@proprenet77.com', 'onboarding@resend.dev' | Set-Content client\api\brochure.mjs

git add -A
git commit -m "Revert to onboarding email temporarily"
git push origin main
```

Puis diagnostique le problème et réessaye plus tard.

---

## 🎓 Explication Technique

### Pourquoi changer l'email "from"?

**onboarding@resend.dev:**
- ✅ Fonctionne immédiatement
- ❌ Pas professionnel
- ❌ Limite aux emails vérifiés (plan gratuit)
- ❌ Les clients voient "onboarding@resend.dev"

**contact@proprenet77.com:**
- ✅ Professionnel
- ✅ Renforce la marque PropreNet
- ✅ Meilleur taux de délivrabilité
- ✅ Les clients voient "PropreNet <contact@proprenet77.com>"

### Comment ça marche?

1. **DKIM:** Authentifie que l'email vient bien de ton domaine
2. **SPF:** Autorise Amazon SES à envoyer pour ton compte
3. **MX:** Permet la réception des bounces/replies

Sans ces 3 records DNS, les emails seront rejetés ou iront dans les spams.

---

## 💡 Conseils

### Pour tester sans risque:

1. Change juste `contact.mjs` d'abord
2. Teste le formulaire de contact
3. Si ça marche, change `brochure.mjs`
4. Teste le formulaire brochure

### Pour revenir en arrière rapidement:

Garde une copie des fichiers originaux ou utilise Git:
```powershell
git checkout HEAD -- client/api/contact.mjs
git checkout HEAD -- client/api/brochure.mjs
```

---

**Temps total estimé:** 5-10 minutes une fois les DNS configurés

**Difficulté:** ⭐⭐ Facile (avec les scripts PowerShell)
