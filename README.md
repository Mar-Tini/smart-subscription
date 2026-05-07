# SmartSubscription — Qualimétrie

> Projet pédagogique PDCA : mesure et amélioration de la qualité d'un module de facturation SaaS.

---

## C'est quoi ?

Une API Node.js qui calcule une facture SaaS selon un plan, un engagement, un nombre d'utilisateurs et des options (association, retard de paiement).

L'objectif est de partir d'un code spaghetti volontairement mauvais, le mesurer avec ESLint et SonarCloud, puis le refactoriser jusqu'à obtenir un pipeline CI/CD entièrement vert.

---

## Stack technique

- Node.js 20 + Express
- Jest (tests unitaires + coverage)
- ESLint (complexité cyclomatique)
- SonarCloud (qualité statique)
- GitHub Actions (pipeline CI/CD)
- Docker

---

## Structure

```
smart-subscription/
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD
├── index.js                    # Code spaghetti original (Personne A)
├── billing.js                  # Code refactorisé propre (Personne C)
├── billing.test.js             # Tests Jest (Personne C)
├── .eslintrc.json              # Config ESLint complexité ≤ 5
├── sonar-project.properties    # Config SonarCloud
├── docker-compose.yml
└── package.json
```

---

## Étapes du projet

**Étape 1 — Code spaghetti** (`index.js`)  
La logique de facturation entière dans une seule fonction imbriquée.  
ESLint détecte une complexité de 36 (max autorisé : 5).

**Étape 2 — Pipeline CI/CD** (`.github/workflows/ci.yml`)  
GitHub Actions lance ESLint, Jest et SonarCloud à chaque push.  
Le pipeline échoue en rouge : c'est attendu à cette étape.

**Étape 3 — Refactoring** (`billing.js`)  
La fonction monolithique est découpée en 5 fonctions pures et testables :  
`getPlanPrice`, `applyAnnualEngagement`, `applyExtraUsers`, `applyAssociationDiscount`, `applyLatePaymentPenalty`.

**Étape 4 — Tests Jest** (`billing.test.js`)  
20 tests unitaires couvrant 100% des branches.  
Coverage envoyé à SonarCloud via `lcov.info`.

**Étape 5 — Pipeline vert**  
SonarCloud affiche note A, coverage > 70%, complexité < 5.  
GitHub Actions passe au vert.

---

## Résultats

| Métrique | Avant | Après |
|---|---|---|
| Complexité cyclomatique | 36 | < 5 |
| Couverture de tests | 0% | 100% |
| Pipeline CI/CD | FAIL | PASS |
| Note SonarCloud | F | A |

---

## Équipe

| Membre | Rôle |
|---|---|
| Personne A | Code spaghetti + ESLint + SonarCloud |
| Personne B | Pipeline CI/CD + Quality Gate |
| Personne C | Refactoring + Tests Jest |

---

## Liens

- GitHub : https://github.com/Mar-Tini/smart-subscription
- SonarCloud : https://sonarcloud.io/project/overview?id=Mar-Tini_smart-subscription
