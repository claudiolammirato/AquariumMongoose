const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log(req.cookies['token']);
    try{
        const token = req.cookies['token'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
        next();
    }
    catch(error){
        res.json({
            message: 'Authentication Failed!'
        })
    }
}

module.exports = authenticate;