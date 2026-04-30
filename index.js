const express = require('express');
const app = express();
app.use(express.json());


app.post('/api/saas-billing', function(req, res) {
    const { plan, engagement, nbUsers, isAssociation, isLate } = req.body;

    let total = 0;

    if (plan === 'Pro') {
        total = 20;
        if (engagement === 'Annuel') {
            total = total * 12;
            if (total > 0) {
                total = total - (total * 0.20);
                if (nbUsers > 50) {
                    let extra = nbUsers - 50;
                    total = total + (extra * 2);
                    if (isAssociation === true) {
                        total = total / 2;
                        if (isLate === true) {
                            total = total + 5;
                        }
                    } else {
                        if (isLate === true) {
                            total = total + 5;
                        }
                    }
                } else {
                    if (isAssociation === true) {
                        total = total / 2;
                        if (isLate === true) {
                            total = total + 5;
                        }
                    } else {
                        if (isLate === true) {
                            total = total + 5;
                        }
                    }
                }
            }
        } else {
            if (nbUsers > 50) {
                let extra = nbUsers - 50;
                total = total + (extra * 2);
                if (isAssociation === true) {
                    total = total / 2;
                    if (isLate === true) {
                        total = total + 5;
                    }
                } else {
                    if (isLate === true) {
                        total = total + 5;
                    }
                }
            } else {
                if (isAssociation === true) {
                    total = total / 2;
                    if (isLate === true) {
                        total = total + 5;
                    }
                } else {
                    if (isLate === true) {
                        total = total + 5;
                    }
                }
            }
        }
    } else if (plan === 'Entreprise') {
        total = 100;
        if (engagement === 'Annuel') {
            total = total * 12;
            if (total > 0) {
                total = total - (total * 0.20);
                if (nbUsers > 50) {
                    let extra = nbUsers - 50;
                    total = total + (extra * 2);
                    if (isAssociation === true) {
                        total = total / 2;
                        if (isLate === true) {
                            total = total + 5;
                        }
                    } else {
                        if (isLate === true) {
                            total = total + 5;
                        }
                    }
                } else {
                    if (isAssociation === true) {
                        total = total / 2;
                        if (isLate === true) {
                            total = total + 5;
                        }
                    } else {
                        if (isLate === true) {
                            total = total + 5;
                        }
                    }
                }
            }
        } else {
            if (nbUsers > 50) {
                let extra = nbUsers - 50;
                total = total + (extra * 2);
                if (isAssociation === true) {
                    total = total / 2;
                    if (isLate === true) {
                        total = total + 5;
                    }
                } else {
                    if (isLate === true) {
                        total = total + 5;
                    }
                }
            } else {
                if (isAssociation === true) {
                    total = total / 2;
                    if (isLate === true) {
                        total = total + 5;
                    }
                } else {
                    if (isLate === true) {
                        total = total + 5;
                    }
                }
            }
        }
    }

    let status = 'Actif';
    if (isLate === true) {
        status = 'BLOQUÉ';
    }

    res.json({ total: total, status: status });
});

app.listen(3000);