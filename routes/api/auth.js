const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
 
 

router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findbyId(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Auth route');
    }
 });
 
 


// @route GET api/auth
// @desc Authenticate user and get token
// @access PUBLIC
router.post('/',
[
check('email', 'Please include a valid email').isEmail(),

check('password', 'Password is required').exists()

], 

async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
     /// when we make req and we send data, we get it by req.body
    const {email,password } = req.body;

    try{

        //see if users exists 
    let user = await User.findOne({ email });
    if (!user) {
        return res
        .status(400)
        .json({errors: [{msg: 'Invalid Credentials'}]});
    }

    //get users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm' 
    })
 
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res
        .status(400)
        .json({errors: [{msg: 'Invalid Credentials'}]});
   
    }
    
    //Return jsonwebtoken
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
