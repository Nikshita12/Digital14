const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route GET api/profile/me
// @desc Get current user's peofile
// @access Private(as we are getting the profile using token of an authorized user)


router.get('/me',auth, async (req, res) => {

    // async await as we are using mongoose here which return a promise

    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
        ['name', 'avatar']); // req.user.id

        //to check if there is no profile

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route Post api/profile
// @desc create or update a user profile
// @access Private
 
router.post('/', [ auth, [

    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
]], 
async (req, res)=>{
//checking errors in the body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    // pulling everything out of the body
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin
    } = req.body;
//Build profile object

const profileFields = {};
profileFields.user= req.user.id;
// checking if the stuffs are actually coming in
if(company) profileFields.company = company;
if(website) profileFields.website = website;
if(location) profileFields.location = location;
if(bio) profileFields.bio = bio;
if(status) profileFields.status = status;
if(githubusername) profileFields.githubusername = githubusername;

if(skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
}

//build social object
profileFields.social = {}
if(youtube) profileFields.social.youtube = youtube;
if(twitter) profileFields.social.twitter = twitter;
//if(facebook) profileFields.social.facebook = facebook;
if(linkedin) profileFields.social.linkedin = linkedin;
if(instagram) profileFields.social.instagram = instagram;


try{
let profile = await Profile.findOne({ user: req.user.id });


if (profile) {
    // if the profile is found then update
    profile = await Profile.findOneAndUpdate({ user: req.user.id},
        { $set: profileFields }, { new: true}
        );

        return res.json(profile);
}

// otherwise create and save  
profile = new Profile(profileFields);
await profile.save();
res.json(profile);


} catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
}
}); 

// @route Get api/profile
// @desc Get all the profiles
// @access Public

router.get('/', async (req, res) => {
try{

    const profiles= await Profile.find().populate('user', ['name', 'avatar']);
res.json(profiles);
} catch(err){

    console.error(err.message);
    res.status(500).send('Server Error');
}
 
});

// @route Get api/profile/user/user: user_id
// @desc Get profile by user ID   
// @access Public


router.get('/user/:user_id', async (req, res) => {
    try{
    
    const profile= await Profile.findOne({ user: req.params.user_id }).populate('user', 
    ['name', 'avatar']);

    if(!profile) return res.status(400).json({ msg: 'Profile not found'}); 
    res.json(profile);
    } catch(err){
    
        console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found'}); 
         }
        res.status(500).send('Server Error');
    }
     
    });

// @route DELETE api/profile
// @desc Delete profile,user & posts
// @access Private

router.delete('/', auth, async (req, res) => {
    try{
    //we dont need any variable here as we are delete data so no cont var_name= await..., just await... 
         
    //@todo- remove users posts

    //reomoves profile  
    await Profile.findOneAndRemove({user: req.user.id});
    //removes user
    await User.findOneAndRemove({_id: req.user.id}); // in user model, there is no user field, there is _id when you in the atlas collections->users
    //you can see the _id asociated with each user at the backend
    res.json({ msg: 'user removed/deleted'});
    } catch(err){
    
        console.error(err.message);
        res.status(500).send('Server Error');
    }
     
    });
 
    
// @route PUT api/profile/experience
// @desc  Add profile experience
// @access Private

router.put('/experience', [auth, [

    check('title', 'title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    } 
    //destructuring

    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
// this will create an object with the data that user submits
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        
        const profile = await Profile.findOne({ user: req.user.id});
        // unshift is similar to push , the diff is jsut that it pushes in the beginning rather at end
        profile.experience.unshift(newExp);
        await profile.save();

        //this will help us at the front end later on
        res.json(profile); 
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error'); 
        
    }

    }); 

// @route DELETE api/profile/experience/:exp_id
// @desc  delete profile experience
// @access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {
        
        const profile = await Profile.findOne({ user: req.user.id});// geting the profile of a logged in user
        
        // Get remove index

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error'); 
        
    }
}
);


// @route PUT api/profile/education
// @desc  Add profile education
// @access Private

router.put('/education', [auth, [

    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required').not().isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    } 
    //destructuring

    const{
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
// this will create an object with the data that user submits
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        
        const profile = await Profile.findOne({ user: req.user.id});
        // unshift is similar to push , the diff is jsut that it pushes in the beginning rather at end
        profile.education.unshift(newEdu);
        await profile.save();

        //this will help us at the front end later on
        res.json(profile); 
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error'); 
        
    }

    }); 

// @route DELETE api/profile/experience/:edu_id
// @desc  delete education from profile
// @access Private

router.delete('/education/:edu_id', auth, async (req, res) => {

    try {
        
        const profile = await Profile.findOne({ user: req.user.id});// geting the profile of a logged in user
        
        // Get remove index

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error'); 
        
    }
}
);
module.exports = router;