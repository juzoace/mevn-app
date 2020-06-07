const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');
var async = require('async');

// Protected Route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({ user: req.user, success: true, msg: "You are authenticated!"});
});

// Login Route
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
            
                res.status(401).json({ success: false, msg: "You entered the wrong password"})
            
            }
        })
        .catch((err) => {
            next(err);
        });
});

// Register Route
router.post('/register', async(req, res) =>{
    if (req.body.password === req.body.confirm_password) {
        
        // Name database check
        const nameRetrieved = await User.findOne({ name: req.body.name });

        // Username database check
        const usernameRetrieved = await User.findOne({ username: req.body.username })

        // Email database check
        const emailRetrieved = await User.findOne({ email: req.body.email }) 

        if (nameRetrieved) {
           // Send a response to the user to use a different name
           res.status(401).json({
            msg: "Name taken, try a diffferent name"
        })
        if (nameRetrieved) return
        } 
        if (usernameRetrieved) {
             res.status(401).json({
                msg: "Username taken, try a different username "
            })
        } 
        if (usernameRetrieved) return

        if (emailRetrieved) {
             res.status(401).json({
                msg: " Email taken, try a different email"
            })
        } if (emailRetrieved) return 

        if (nameRetrieved && usernameRetrieved) {
            // Tell the user to check the name and username input fields
             res.status(401).json({
                msg: "Change your name and username`"
            })
        }
        if (nameRetrieved && usernameRetrieved) return

        if (nameRetrieved && emailRetrieved) {
            // Tell the user to check the name and email input fields
            res.status(401).json({
                msg: "Change your Name and Email"
            })
        }
        if (nameRetrieved && emailRetrieved) return

        if (usernameRetrieved && emailRetrieved) {
            // Tell the user to check the username and email input fields
            res.status(401).json({
                msg: "Change your Username and Email"
            })
        }
        if (usernameRetrieved && emailRetrieved) return

        if (nameRetrieved && usernameRetrieved && emailRetrieved) {
            // Tell the user to check the name, username and email input fields
            res.status(401).json({
                msg: "Change your Name, Username and Email" 
            })
        } 
        if (nameRetrieved && usernameRetrieved && emailRetrieved) return

        if (!nameRetrieved && !usernameRetrieved && !emailRetrieved) {
            // Everything is unique proceed to create new user

            //   Generate hash and salt from the password
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

        }

    } else {
        // Tell user to check the password
        res.status(401).json({
                        msg: "Passwords don't match",
                        success: false
                    })
    }
});


module.exports = router;

    

    
