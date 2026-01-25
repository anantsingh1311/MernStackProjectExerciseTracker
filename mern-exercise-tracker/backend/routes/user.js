//The route we are creating 
const router = require('express').Router();
let User = require('../models/user-model')

//first end point that handles incoming http requests which is a get request
router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Second end point api handles incoming http quests which are post requests 
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newuser = new User({ username });

    newuser.save()
        .then(() => res.json('User added! '))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;

