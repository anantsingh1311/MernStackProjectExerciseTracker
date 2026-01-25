//The route we are creating 
const router = require('express').Router();
let Excercise = require('../models/excercise-model')

//first end point that handles incoming http requests which is a get request
router.route('/').get((req, res) => {
    Excercise.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Second end point api handles incoming http quests which are post requests 
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newexcersice = new Excercise({
        username,
        description,
        duration,
        date,
    });

    newexcersice.save()
        .then(() => res.json('Excercise added! '))
        .catch(err => res.status(400).json('Error: ' + err))
});
//3rd api endpoint whihc handles get request according, :id is a variable here created by mongodb  to the ids 
router.route('/:id').get((req,res)=>{
    Excercise.findById(req.params.id)
    .then(excercise => res.json(excercise))
    .catch(err=> res.status(400).json('Error: '+err))
});
//4th api for deleting data based on id
//delete
router.route('/:id').delete((req, res) => {
    Excercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Excercise data deleted!'))
    .catch(err=> res.status(400).json('Error: '+err))
});
// 5th api for updating data 
router.route('/update/:id').post((req,res)=>{
    Excercise.findById(req.params.id)
    .then(excercise=>{
        excercise.username = req.body.username;
        excercise.description = req.body.description;
        excercise.duration = Number(req.body.duration);
        excercise.date = Date.parse(req.body.date);

        excercise.save()
        .then(()=>res.json('Excercise updated!'))
        .catch(err=> res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;
