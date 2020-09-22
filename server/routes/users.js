const router = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post(async (req, res) => {
    console.log('making new user')

    if (req.body.confirm_password === req.body.password && req.body.confirm_email === req.body.email) {
        console.log('everything looks good')
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const name = req.body.name;
        const email = req.body.email;
        const password = hashedPassword;

        console.log(name);
        console.log(email);
        console.log(password);

        const testUser = {
            name, email, password, admin: false
        }
        console.log(testUser);

        const newUser = new User({ name, email, password, admin: false });
        newUser.save()
            .then((newUser) => {
                console.log('made new user!')
                res.json('User Added!');
            })
            .catch(err => {
                console.log('couldnt make new user', err);
                res.status(400).json('Error with adding user: ' + err)
            });
    }
    else {
        res.send({ message: 'Username or Password fields didn\'t match' });
    }
})

router.route('/login').post((req, res, next) => {
    console.log('login route');
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                console.log('That user doesn\'t exist');
                res.send({ message: 'A user with that email doesn\'t exist' });
            }
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    return res.send({ message: 'password is incorrect' });
                }
                if (isMatch) {
                    jwt.sign({ user }, 'secretkey', (err, token) => {
                        let response = {
                            "name": user.name,
                            "id": user._id,
                            "token": token
                        }
                        response = JSON.stringify(response);
                        res.write(JSON.stringify(response));
                        res.end();
                    })
                }
                else {
                    console.log('no match')
                    res.json({ message: 'no match' });
                }
            })
        })
        .catch(err => console.log(err));
})


module.exports = router; 