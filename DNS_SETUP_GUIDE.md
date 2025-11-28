# 🌐 Configuration DNS Resend pour PropreNet

## ⚠️ IMPORTANT: Deux Options

Tu as **DEUX options** pour faire fonctionner les emails:

### Option A: Rapide (5 minutes) - Vérifier l'Email
✅ **Recommandé pour tester rapidement**
- Vérifie juste `rozek.alexandre@gmail.com` dans Resend
- Les formulaires fonctionneront immédiatement
- Emails envoyés depuis `onboarding@resend.dev`

### Option B: Professionnel (30 minutes) - Configurer le Domaine
✅ **Recommandé pour la production**
- Configure ton domaine (ex: `proprenet77.com`)
- Emails envoyés depuis `contact@proprenet77.com`
- Plus professionnel pour les clients

**Tu peux faire l'Option A maintenant et l'Option B plus tard !**

---

## 📧 OPTION A: Vérifier l'Email (RAPIDE)

### Étape 1: Ajouter l'email dans Resend

1. Va sur **https://resend.com/emails**
2. Clique sur **"Add Email"** ou **"Verify Email"**
3. Entre: `rozek.alexandre@gmail.com`
4. Clique sur **"Send Verification Email"**

### Étape 2: Vérifier dans Gmail

1. Ouvre ta boîte **Gmail** (rozek.alexandre@gmail.com)
2. Cherche un email de **Resend**
   - Sujet: "Verify your email address"
3. **Clique sur le lien** de vérification
4. Tu seras redirigé vers Resend
5. L'email devrait maintenant être **✅ Verified**

### Étape 3: Tester

1. Retourne sur ton site
2. Teste le **formulaire de contact**
3. Teste le **formulaire brochure**
4. **✅ Les deux devraient fonctionner !**

---

## 🌐 OPTION B: Configurer le Domaine (PROFESSIONNEL)

### Prérequis

- Un nom de domaine (ex: `proprenet77.com`)
- Accès au panneau DNS de ton hébergeur (OVH, Cloudflare, etc.)

### Étape 1: Ajouter le Domaine dans Resend

1. Va sur **https://resend.com/domains**
2. Clique sur **"Add Domain"**
3. Entre ton domaine: `proprenet77.com`
4. Clique sur **"Add"**

### Étape 2: Configurer les DNS Records

Resend va te donner 3 enregistrements DNS à ajouter. Tu les as déjà:

#### 🔐 1. DKIM (Authentification)

**Type:** TXT  
**Nom:** `resend._domainkey`  
**Contenu:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAwqMiUkvojaJUBbetOU2HLU05VuqNnNOCf1EDkveu63TX7oH/p01s+2WOZBDveUMkA3IsP1g7oqD6yMvCCDOWm9DLy/ElDHDtOHrsS22K8C1dzW5d0CzM+JPq8yrSsR5r1NGZ2po5XVUGW9u9DCOBgXUSdFH6qDxI5uQ6bdcfdQIDAQAB`  
**TTL:** Auto (ou 3600)

#### 📬 2. MX Record (Reception)

**Type:** MX  
**Nom:** `send` (ou `send.proprenet77.com`)  
**Contenu:** `feedback-smtp.eu-west-1.amazonses.com.`  
**TTL:** Auto (ou 3600)  
**Priorité:** 10

#### ✅ 3. SPF (Anti-spam)

**Type:** TXT  
**Nom:** `send` (ou `send.proprenet77.com`)  
**Contenu:** `v=spf1 include:amazonses.com ~all`  
**TTL:** Auto (ou 3600)

### Étape 3: Ajouter les DNS chez ton Hébergeur

#### Si OVH:
1. Va dans **Web Cloud** → **Noms de domaine**
2. Sélectionne `proprenet77.com`
3. Clique sur **Zone DNS**
4. Clique sur **Ajouter une entrée**
5. Ajoute les 3 enregistrements ci-dessus

#### Si Cloudflare:
1. Va dans **DNS** → **Records**
2. Clique sur **Add Record**
3. Ajoute les 3 enregistrements ci-dessus
4. ⚠️ **Désactive le proxy orange** (DNS only)

#### Si autre hébergeur:
Consulte la documentation de ton hébergeur pour ajouter des enregistrements DNS

### Étape 4: Vérifier la Configuration

1. Retourne sur **https://resend.com/domains**
2. Clique sur **"Verify DNS Records"**
3. Attends 5-10 minutes (propagation DNS)
4. Recharge la page
5. Les 3 records devraient être **✅ Verified**

⚠️ **Note:** La propagation DNS peut prendre jusqu'à 24h, mais généralement 5-30 minutes

### Étape 5: Modifier le Code

Une fois le domaine vérifié, modifie les fonctions API:

**Dans `client/api/contact.mjs`:**
```javascript
// Ligne 56-57
const { data, error } = await resend.emails.send({
  from: 'PropreNet <contact@proprenet77.com>', // ← CHANGE ICI
  to: recipientEmail,
  // ...
});
```

**Dans `client/api/brochure.mjs`:**
```javascript
// Ligne 93-94
const { data, error } = await resend.emails.send({
  from: 'PropreNet <contact@proprenet77.com>', // ← CHANGE ICI
  to: email,
  // ...
});
```

### Étape 6: Redéployer

```powershell
git add -A
git commit -m "Update email sender to custom domain"
git push origin main
```

Vercel redéploiera automatiquement.

---

## 🔍 Vérification DNS (Optionnel)

Pour vérifier que tes DNS sont bien configurés:

### Windows PowerShell:
```powershell
# Vérifier DKIM
nslookup -type=TXT resend._domainkey.proprenet77.com

# Vérifier MX
nslookup -type=MX send.proprenet77.com

# Vérifier SPF
nslookup -type=TXT send.proprenet77.com
```

### En ligne:
- https://mxtoolbox.com/dkim.aspx
- https://mxtoolbox.com/SuperTool.aspx

---

## 📊 Comparaison des Options

| Critère | Option A: Email Vérifié | Option B: Domaine |
|---------|-------------------------|-------------------|
| **Temps** | 5 minutes | 30-60 minutes |
| **Difficulté** | ⭐ Facile | ⭐⭐⭐ Moyen |
| **Email expéditeur** | `onboarding@resend.dev` | `contact@proprenet77.com` |
| **Professionnalisme** | ⭐⭐ Basique | ⭐⭐⭐⭐⭐ Pro |
| **Limite** | Plan gratuit OK | Plan gratuit OK |
| **Recommandé pour** | Tests, développement | Production |

---

## 🎯 Recommandation

### Pour AUJOURD'HUI:
1. ✅ Fais **Option A** (vérifier l'email) → 5 minutes
2. ✅ Teste que les formulaires fonctionnent
3. ✅ Ton site est opérationnel !

### Pour PLUS TARD (quand tu as le temps):
1. Fais **Option B** (configurer le domaine)
2. Les emails viendront de `contact@proprenet77.com`
3. Plus professionnel pour les clients

---

## ⚠️ Problèmes Courants

### DNS pas encore propagés
**Symptôme:** Resend dit "DNS records not found"  
**Solution:** Attends 30 minutes et réessaye

### TTL trop court
**Symptôme:** Vérification échoue  
**Solution:** Change TTL à 3600 ou Auto

### Nom de domaine incorrect
**Symptôme:** Les records ne se vérifient pas  
**Solution:** Vérifie que tu utilises le bon domaine (avec ou sans www)

### Proxy Cloudflare activé
**Symptôme:** MX record ne fonctionne pas  
**Solution:** Désactive le proxy orange (DNS only)

---

## ✅ Checklist

### Option A - Email Vérifié:
- [ ] Email `rozek.alexandre@gmail.com` ajouté dans Resend
- [ ] Email de vérification reçu dans Gmail
- [ ] Lien de vérification cliqué
- [ ] Email marqué comme ✅ Verified dans Resend
- [ ] Formulaires testés et fonctionnels

### Option B - Domaine Configuré:
- [ ] Domaine ajouté dans Resend
- [ ] DKIM TXT record ajouté chez l'hébergeur
- [ ] MX record ajouté chez l'hébergeur
- [ ] SPF TXT record ajouté chez l'hébergeur
- [ ] DNS propagés (5-30 min)
- [ ] Records vérifiés dans Resend (tous ✅)
- [ ] Code modifié (from: contact@proprenet77.com)
- [ ] Code committé et poussé
- [ ] Site redéployé sur Vercel
- [ ] Formulaires testés et fonctionnels

---

## 🆘 Support

Si tu as des problèmes:
1. Consulte `DEEP_ANALYSIS_EMAIL_FUNCTIONS.md`
2. Utilise la page `diagnostic-api.html`
3. Vérifie les logs Vercel
4. Vérifie les logs Resend (https://resend.com/logs)

---

**TL;DR:** Fais l'Option A maintenant (5 min), Option B plus tard quand tu as le temps !
