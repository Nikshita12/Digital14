const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, resp, next)
{ // get token from the header
    const token = req.header('x-auth-token');

    // check if no token
    if(!token){
        return resp.status(401).json({ msg: 'No token, authorization denied'});
    }
    // verify token

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
        } catch(err) {
            resp.status(401).json({ msg: 'Token is not valid'});    
        }

}