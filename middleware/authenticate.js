const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log(req.headers);
    try{
        const token = req.cookies['token'];
        if(token == undefined){
            const token = req.headers.authorization.split(' ')[1];
            console.log(token)
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
        console.log(req.user)
       
        next();
    }
    catch(error){
        res.status(403).redirect('/login');
    }
}

module.exports = authenticate;