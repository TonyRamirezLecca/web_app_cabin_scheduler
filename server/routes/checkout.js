const router = require('express').Router();
require('dotenv').config();
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(STRIPE_KEY);
const uuid = require('uuidv4');



router.route('/').post((req, res) => {

    let error, status;

    const indempotency_key = uuid();
    stripe.charges.create(
        {
            amount: 2000,
            currency: "usd",
            source: 'tok_visa',
            customer: req.body.id,
            receipt_email: req.body.email,
            description: "Reserved Cabin"
        },
        function (err, charge) {
            if (err) {
                console.log('ERRORROROR!', err);
                status = "failure";
                res.json({ error, status });
            }
            if (charge) {
                console.log('CHARGE!!! :', charge);
                status = "success";
                res.json({ error, status });
            }
        }
    );
})

module.exports = router; 