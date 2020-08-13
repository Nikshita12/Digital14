const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/users
// @description Register user
// @access PUBLIC
router.post('/',
[
//check all the rules of writing syntax in express-validator documentation.

check('name', 'Name is required').not()
.isEmpty(),

check('email', 'Please include a valid email').isEmail(),

check('password', 'Please enter a password with 6 0r more characters').isLength({ min: 6})

], 

async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: error.array() });
    }
     /// when we make req and we send data, we get it by req.body
    const {name,email,password } = req.body;

    try{

        //see if users exists 
    let user = await User.findOne({ email });
    if (user) {
        res.status(400).json({errors: [{msg: 'User already exists'}]});
    }

    //get users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm' 
    })
    //creating a user instance, which not yet saved,to do that we need to first encrypt pwd

    user = new User({
        name,
        email,
        avatar,
        password
    });

    //encrypt pwd
    const salt = await bcrypt.genSalt(10);

       //hashing the pwd
     user.password = await bcrypt.hash(password, salt);  
       // savin the user to db by user.save(), but it will again return a promise so await
     await user.save();  

    //Return jsonwebtoken(asa user enters pwd in ui, webtoken is needed to rightaway login the user, ) 
    const payload = {
        user:{
            id: user.id
        }
    }
    jwt.sign(payload,
        config.get('jwtSecret'),
        {expiresIn: 36000 },
        (err,token) => {
            if(err) throw err;
            res.json({ token});
        });
    //res.send('User registered');

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');


    }

     
}
);

module.exports = router;
    // 400 is a bad request , 200 means all okay. in case of the error, the response we want to show is 400

    // object of the data(name, email, etc for user registration) which has to be sent to this route.
    //console.log(req.body);
    // for the req.body to work, we need to initialize the middleware(the body parser),
    // which is alraedy included in express and initialised in server.js. 

    // we need express validator to post request our data which are email, name etc. as we need to validate
    // the data to our db 



