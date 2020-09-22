const router = require('express').Router();
let { WallsburgCalendar } = require('../models/calendar.model');
let { LavaCalendar } = require('../models/calendar.model');
const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        next();
    }
    else {
        console.log('header not present');
        res.sendStatus(403);
    }
}

//Schedule for Wallsburg
router.route('/wallsburg').post(verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            console.log('error');
            res.sendStatus(403);
        }
        else {
            new WallsburgCalendar({
                name: decoded.user.name,
                bookedTime: req.body.newBookings
            }).save((err, booked) => {
                if (err) {
                    console.log('ERROR!! :', err);
                    status = "failure";
                    res.json({ status });
                }
                if (booked) {
                    console.log('BOOKED!!! :', booked);
                    status = "success";
                    res.json({ status });
                }
            })
        }
    });
});


//Schedule for Lava
router.route('/lava').post(verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            new LavaCalendar({
                name: decoded.user.name,
                bookedTime: req.body.newBookings
            }).save((err, booked) => {
                if (err) {
                    console.log('ERROR!! :', err);
                    status = "failure";
                    res.json({ status });
                }
                if (booked) {
                    console.log('BOOKED!!! :', booked);
                    status = "success";
                    res.json({ status });
                }
            })
        }
    });
});

//Get Wallsburg Calendar
router.route('/wallsburg').get(verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        console.log('AuthData', authData);
        if (err) {
            console.log('error');
            res.sendStatus(403);
        }
        else {
            WallsburgCalendar.find()
                .then(calendar => {
                    console.log(calendar)
                    res.json(calendar);
                })
                .catch(err => res.status(400).json('Error, couldn\'t find :' + err));
        }
    });
})

//Get Lava Calendar
router.route('/lava').get(verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log('error');
            res.sendStatus(403);
        }
        else {
            LavaCalendar.find()
                .then(calendar => {
                    console.log(calendar)
                    res.json(calendar);
                })
                .catch(err => res.status(400).json('Error, couldn\'t find :' + err));
        }
    });
})

//UPDATE

/*DELETE
router.route('/:userID/:locationId').delete(verifyToken, (req, res) => {
    console.log('deleting route')
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        console.log('verifying');
        if (err) {
            console.log('could not verify');
            console.log('error');
            res.sendStatus(403);
        }
        else {
            console.log('verified')
            Users.findOneAndUpdate(
                { _id: req.params.userID },
                { $pull: { locations: { _id: req.params.locationId } } }
            )
                .then(response => {
                    res.send(response);
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400).json('Error, couldn\'t remove :' + err)
                });
        }
    });
})
*/


module.exports = router; 