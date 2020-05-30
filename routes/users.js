const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

// TODO
router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are authenticated!"});
});

// TODO
router.post('/login', function(req, res, next){
    User.findOne({ username: req.body.username})
        .then((user) => {

            if(!user) {
                res.status(401).json({ success: false, msg: "Could not find user" })
            }

            const isValid = utils.validPassword(req.body.password, user.hash, user.salt)
            
            if(isValid) {
                
                const tokenObject = utils.issueJWT(user);
                
                res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires})
            
            } else {
            
                res.status(401).json({ success: false, msg: "you entered the wrong password"})
            
            }
        })
        .catch((err) => {
            next(err);
        });
});

// TODO
router.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        hash: hash,
        salt: salt
    });
    newUser.save()
    .then((user) => {

        const jwt = utils.issueJWT(user);

        res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
    })
});

module.exports = router;