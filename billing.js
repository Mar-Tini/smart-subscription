function getPlanPrice(plan) {
  if (plan === 'Pro') return 20;
  if (plan === 'Entreprise') return 100;
  return 0;
}

function applyAnnualEngagement(total, engagement) {
  if (engagement !== 'Annuel') return total;
  return (total * 12) * 0.80;
}

function applyExtraUsers(total, nbUsers) {
  if (nbUsers <= 50) return total;
  return total + (nbUsers - 50) * 2;
}

function applyAssociationDiscount(total, isAssociation) {
  if (!isAssociation) return total;
  return total / 2;
}

function applyLatePaymentPenalty(total, isLate) {
  if (!isLate) return total;
  return total + 5;
}

function calculateBilling({ plan, engagement, nbUsers, isAssociation, isLate }) {
  let total = getPlanPrice(plan);
  total = applyAnnualEngagement(total, engagement);
  total = applyExtraUsers(total, nbUsers);
  total = applyAssociationDiscount(total, isAssociation);
  total = applyLatePaymentPenalty(total, isLate);

  const status = isLate ? 'BLOQUÉ' : 'Actif';
  return { total, status };
}

module.exports = {
  calculateBilling,
  getPlanPrice,
  applyAnnualEngagement,
  applyExtraUsers,
  applyAssociationDiscount,
  applyLatePaymentPenalty,
};