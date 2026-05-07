const {
  calculateBilling,
  getPlanPrice,
  applyAnnualEngagement,
  applyExtraUsers,
  applyAssociationDiscount,
  applyLatePaymentPenalty,
} = require('./billing');

// ── Tests getPlanPrice ──
describe('getPlanPrice', () => {
  test('Plan Pro = 20€', () => expect(getPlanPrice('Pro')).toBe(20));
  test('Plan Entreprise = 100€', () => expect(getPlanPrice('Entreprise')).toBe(100));
  test('Plan inconnu = 0€', () => expect(getPlanPrice('Inconnu')).toBe(0));
});

// ── Tests engagement annuel ──
describe('applyAnnualEngagement', () => {
  test('Mensuel : pas de changement', () => expect(applyAnnualEngagement(20, 'Mensuel')).toBe(20));
  test('Annuel : x12 puis -20%', () => expect(applyAnnualEngagement(20, 'Annuel')).toBe(192));
  test('Annuel Entreprise : 100 x12 -20%', () => expect(applyAnnualEngagement(100, 'Annuel')).toBe(960));
});

// ── Tests utilisateurs supplémentaires ──
describe('applyExtraUsers', () => {
  test('Moins de 50 users : pas de surcoût', () => expect(applyExtraUsers(20, 30)).toBe(20));
  test('Exactement 50 users : pas de surcoût', () => expect(applyExtraUsers(20, 50)).toBe(20));
  test('55 users : +5 x 2€ = +10€', () => expect(applyExtraUsers(20, 55)).toBe(30));
  test('100 users : +50 x 2€ = +100€', () => expect(applyExtraUsers(20, 100)).toBe(120));
});

// ── Tests association ──
describe('applyAssociationDiscount', () => {
  test('Pas association : pas de remise', () => expect(applyAssociationDiscount(20, false)).toBe(20));
  test('Association : divise par 2', () => expect(applyAssociationDiscount(20, true)).toBe(10));
});

// ── Tests retard de paiement ──
describe('applyLatePaymentPenalty', () => {
  test('Pas de retard : pas de pénalité', () => expect(applyLatePaymentPenalty(20, false)).toBe(20));
  test('Retard : +5€', () => expect(applyLatePaymentPenalty(20, true)).toBe(25));
});

// ── Tests calculateBilling (intégration) ──
describe('calculateBilling', () => {
  test('Pro mensuel, 10 users, normal', () => {
    expect(calculateBilling({ plan: 'Pro', engagement: 'Mensuel', nbUsers: 10, isAssociation: false, isLate: false }))
      .toEqual({ total: 20, status: 'Actif' });
  });

  test('Pro annuel, 10 users, normal', () => {
    expect(calculateBilling({ plan: 'Pro', engagement: 'Annuel', nbUsers: 10, isAssociation: false, isLate: false }))
      .toEqual({ total: 192, status: 'Actif' });
  });

  test('Entreprise mensuel, 60 users', () => {
    expect(calculateBilling({ plan: 'Entreprise', engagement: 'Mensuel', nbUsers: 60, isAssociation: false, isLate: false }))
      .toEqual({ total: 120, status: 'Actif' });
  });

  test('Pro mensuel, association, pas de retard', () => {
    expect(calculateBilling({ plan: 'Pro', engagement: 'Mensuel', nbUsers: 10, isAssociation: true, isLate: false }))
      .toEqual({ total: 10, status: 'Actif' });
  });

  test('Pro mensuel, retard de paiement → BLOQUÉ', () => {
    expect(calculateBilling({ plan: 'Pro', engagement: 'Mensuel', nbUsers: 10, isAssociation: false, isLate: true }))
      .toEqual({ total: 25, status: 'BLOQUÉ' });
  });

  test('Entreprise annuel, 80 users, association, retard', () => {
    // 100 x12 x0.8 = 960 + (30x2=60) = 1020 / 2 = 510 + 5 = 515
    expect(calculateBilling({ plan: 'Entreprise', engagement: 'Annuel', nbUsers: 80, isAssociation: true, isLate: true }))
      .toEqual({ total: 515, status: 'BLOQUÉ' });
  });
});