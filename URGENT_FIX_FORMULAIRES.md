# ⚠️ URGENT: Les Formulaires Ne Fonctionnent Pas

## 🔴 Problème Actuel

**AUCUN des formulaires ne fonctionne:**
- ❌ Formulaire "Demander un devis" → Erreur
- ❌ Formulaire "Recevez notre brochure" → Erreur

**Erreur affichée:** "Une erreur est survenue. Veuillez réessayer."

---

## 🎯 LA SOLUTION (5 minutes)

### Étape 1️⃣: Obtenez votre clé API Resend

1. **Allez sur:** https://resend.com/api-keys
2. **Connectez-vous** avec votre compte
3. **Copiez** votre clé API (commence par `re_`)
   - Si vous n'en avez pas, cliquez sur "Create API Key"

---

### Étape 2️⃣: Ajoutez la clé dans Vercel

1. **Allez sur:** https://vercel.com
2. **Cliquez** sur votre projet `proprenet77`
3. **Allez dans:** Settings → Environment Variables
4. **Cliquez:** Add New
5. **Remplissez:**
   ```
   Name: RESEND_API_KEY
   Value: re_xxxxxxxxxxxxxxxxxx (votre clé copiée)
   ```
6. **Cochez:** Production ✅ Preview ✅ Development ✅
7. **Cliquez:** Save

---

### Étape 3️⃣: Vérifiez votre email dans Resend

1. **Allez sur:** https://resend.com/emails
2. **Vérifiez** que `rozek.alexandre@gmail.com` apparaît dans la liste
3. **Si NON:**
   - Cliquez sur "Add Email"
   - Entrez `rozek.alexandre@gmail.com`
   - Confirmez l'email dans votre boîte mail

---

### Étape 4️⃣: Redéployez le site

**Option A - Automatique (Recommandé):**

Vercel va redéployer automatiquement dans 1-2 minutes après avoir ajouté la variable.

**Option B - Manuel:**
1. Allez dans l'onglet "Deployments" sur Vercel
2. Cliquez sur le dernier déploiement
3. Cliquez sur ⋮ (trois points)
4. Sélectionnez "Redeploy"

---

### Étape 5️⃣: Testez !

**Attendez 2-3 minutes**, puis:

1. **Allez sur votre site:** https://proprenet77.vercel.app (ou votre domaine)
2. **Testez le formulaire contact:**
   - Remplissez tous les champs
   - Cliquez "Envoyer ma demande"
   - ✅ Devrait afficher "Votre demande a été envoyée avec succès !"
3. **Testez le formulaire brochure:**
   - Entrez votre email
   - Cliquez "Télécharger la brochure"
   - ✅ Devrait afficher "Brochure envoyée à votre email !"
4. **Vérifiez votre email** `rozek.alexandre@gmail.com`
   - Vous devriez avoir reçu les deux emails

---

## 🧪 Tests en Local (Optionnel)

Si vous voulez tester AVANT de déployer:

```powershell
# Assurez-vous que le serveur de dev tourne
cd client
npm run dev
```

Puis ouvrez dans votre navigateur:
- **Test contact:** http://localhost:5173/test-contact.html
- **Test brochure:** http://localhost:5173/test-brochure.html

Ces pages vous montrent exactement quelle erreur se produit.

---

## ✅ Checklist Rapide

- [ ] Clé API Resend copiée (`re_xxxxx...`)
- [ ] Clé ajoutée dans Vercel (Settings → Environment Variables)
- [ ] Email `rozek.alexandre@gmail.com` vérifié dans Resend
- [ ] Site redéployé (ou attendu 2-3 min)
- [ ] Formulaire contact testé ✅
- [ ] Formulaire brochure testé ✅
- [ ] Emails reçus dans la boîte mail ✅

---

## 🆘 Si Ça Ne Marche Toujours Pas

### 1. Vérifiez les logs Vercel

1. Allez sur: https://vercel.com/[votre-projet]/logs
2. Filtrez par "Serverless Function"
3. Cherchez les erreurs de `/api/contact` ou `/api/brochure`

**Erreurs courantes:**

| Message d'erreur | Cause | Solution |
|------------------|-------|----------|
| `RESEND_API_KEY is not set` | Variable manquante | Ajoutez la clé dans Vercel |
| `API key invalid` | Clé incorrecte | Vérifiez votre clé sur resend.com |
| `Email not verified` | Email non vérifié | Vérifiez l'email dans Resend |
| `Configuration error` | Problème de config | Vérifiez toutes les étapes |

---

### 2. Vérifiez que la clé API est active

1. Allez sur: https://resend.com/api-keys
2. Vérifiez que votre clé:
   - ✅ N'est PAS expirée
   - ✅ N'est PAS révoquée  
   - ✅ A les permissions "Send emails"

---

### 3. Testez avec les pages de diagnostic

Ouvrez votre navigateur et allez sur:
- http://localhost:5173/test-contact.html
- http://localhost:5173/test-brochure.html

Ouvrez la console (F12) et regardez les erreurs exactes.

---

## 📞 Contact d'Urgence

Si vous avez besoin d'aide immédiate:
- Consultez `FIX_BROCHURE.md` pour plus de détails
- Consultez `TROUBLESHOOT_BROCHURE.md` pour le dépannage complet

---

## 💡 Pourquoi Ce Problème?

Les deux formulaires utilisent **Resend** pour envoyer des emails. Resend nécessite:

1. ✅ Une clé API valide (`RESEND_API_KEY`)
2. ✅ Un email vérifié (ou un domaine configuré)

Actuellement, **la clé API n'est PAS configurée sur Vercel**, donc les formulaires ne peuvent pas envoyer d'emails.

Une fois la clé ajoutée, tout fonctionnera instantanément ! 🚀
