# 🔧 Dépannage Fonction Brochure

## Problème: "Erreur lors de l'envoi. Veuillez réessayer."

### 📋 Checklist de diagnostic

#### 1. Tester localement
```
http://localhost:5173/test-brochure.html
```

Utilisez cette page pour tester l'API et voir les erreurs exactes dans la console.

---

#### 2. Vérifier les variables d'environnement sur Vercel

🔑 **Variables requises:**

| Variable | Valeur | Status |
|----------|--------|--------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxx` | ❌ MANQUANTE |
| `CONTACT_EMAIL` | `rozek.alexandre@gmail.com` | ⚠️ OPTIONNELLE |

**Comment ajouter:**
1. Allez sur https://vercel.com/[votre-projet]/settings/environment-variables
2. Ajoutez `RESEND_API_KEY` avec votre clé Resend
3. Ajoutez `CONTACT_EMAIL` avec votre email
4. Redéployez le projet (ou attendez le prochain commit)

---

#### 3. Vérifier l'email dans Resend

📧 **L'email doit être vérifié:**

1. Allez sur https://resend.com/emails
2. Vérifiez que `rozek.alexandre@gmail.com` apparaît dans "Verified emails"
3. Si non, cliquez sur "Add email" et vérifiez-le

**OU** configurez un domaine vérifié (voir VERCEL_DEPLOYMENT.md)

---

#### 4. Vérifier la clé API Resend

1. Allez sur https://resend.com/api-keys
2. Vérifiez que votre clé API:
   - ✅ Est active (pas expirée)
   - ✅ A les permissions d'envoi d'emails
   - ✅ N'est pas révoquée

---

## 🧪 Tests de diagnostic

### Test 1: Vérifier que le fichier PDF existe

**Local:**
```powershell
Test-Path "client\public\brochure.pdf"
```

Résultat attendu: `True`

---

### Test 2: Tester l'API manuellement

**Avec curl:**
```powershell
curl -X POST http://localhost:5173/api/brochure `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"rozek.alexandre@gmail.com\"}'
```

**Avec PowerShell:**
```powershell
$body = @{ email = "rozek.alexandre@gmail.com" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5173/api/brochure" -Method POST -Body $body -ContentType "application/json"
```

---

### Test 3: Consulter les logs Vercel

1. Allez sur https://vercel.com/[votre-projet]/logs
2. Filtrez par "Serverless Function"
3. Cherchez les erreurs de `/api/brochure`

**Erreurs courantes:**

| Erreur | Cause | Solution |
|--------|-------|----------|
| `RESEND_API_KEY is not set` | Variable d'environnement manquante | Ajoutez RESEND_API_KEY dans Vercel |
| `Invalid email format` | Email invalide | Vérifiez le format de l'email |
| `Configuration error` | Clé API invalide | Vérifiez votre clé Resend |
| `Error sending brochure` | Email non vérifié | Vérifiez l'email dans Resend |

---

## 🎯 Solution rapide (en attendant la config Vercel)

Si vous voulez tester rapidement sans configurer Resend, vous pouvez temporairement modifier la fonction brochure pour simuler l'envoi:

**Fichier: `client/api/brochure.mjs`**

Ajoutez après la validation de l'email:

```javascript
// TEMPORAIRE: Simuler l'envoi pour tests
if (process.env.NODE_ENV !== 'production' || !process.env.RESEND_API_KEY) {
  console.log('⚠️ MODE TEST: Simulation d\'envoi d\'email à', email);
  return res.status(200).json({ 
    success: true, 
    message: 'Email envoyé (mode test)',
    test_mode: true
  });
}
```

⚠️ **N'oubliez pas de retirer ce code après avoir configuré Resend !**

---

## ✅ Checklist de résolution

- [ ] Variables d'environnement ajoutées dans Vercel
- [ ] Email vérifié dans Resend (ou domaine configuré)
- [ ] Clé API Resend active et valide
- [ ] Fichier brochure.pdf existe dans `client/public/`
- [ ] Test local réussi sur http://localhost:5173/test-brochure.html
- [ ] Test production réussi
- [ ] Logs Vercel ne montrent plus d'erreurs

---

## 📞 Support

Si le problème persiste après toutes ces étapes:

1. Consultez les logs dans la console navigateur (F12)
2. Consultez les logs Vercel
3. Vérifiez que tous les fichiers sont bien déployés sur Vercel
4. Essayez de redéployer le projet

**Note:** Le formulaire de contact fonctionne car il utilise le même système Resend. Si la brochure ne fonctionne pas mais le contact oui, le problème est spécifique à l'endpoint brochure.
