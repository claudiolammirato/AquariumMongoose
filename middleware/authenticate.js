const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    //console.log(req.cookies.user.user);
    try{
        const token = req.cookies['token'];
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
       
        next();
    }
    catch(error){
        res.status(403).redirect('/login');
    }
}

module.exports = authenticate;