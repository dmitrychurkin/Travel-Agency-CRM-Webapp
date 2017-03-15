const express = require('express'),
    router = express.Router(),
    Services = require('./services.json');

router.get('/air-ticketing-and-reservation/', (req, res) => {
    res.render("services/air_ticketing_and_reservation");
});
router.get('/services/', (req, res)=>{
    res.json(Services);
});
router.post('/order/', (req, res)=>{
    console.log(req.body);
    if (req && req.body && req.body.ACTION == 'REGISTER'){
        return res.json({ info: 'Your data has been sent, our agent will contact you.', reqId: 'f4ydhsg53igfhfgs==' });
    }
});
router.delete('/order/',(req, res)=>{
    console.log(req.body);
    if (req && req.body && req.body.ACTION == 'CANCEL'){
        return res.send('Your request successfully canceled.');
    }
});
module.exports = router;